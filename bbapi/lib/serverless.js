"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cognitoResources_1 = __importDefault(require("./serverless/cognitoResources"));
const dynamodb_1 = __importDefault(require("./serverless/dynamodb"));
const functions_1 = __importDefault(require("./serverless/functions"));
const serverlessConfiguration = {
    service: "bumblebeeapi-serverless",
    frameworkVersion: "3",
    plugins: [
        "serverless-esbuild",
        "serverless-offline",
        "serverless-dynamodb-local",
        "serverless-domain-manager",
    ],
    provider: {
        name: "aws",
        runtime: "nodejs18.x",
        region: "us-east-1",
        stage: "dev",
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            DYNAMODB_ENDPOINT: "http://dynamodb:8000",
            singleTable: "${self:custom.tables.singleTable}",
            region: "${self:provider.region}",
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
            NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
        },
        iam: {
            role: {
                statements: [
                    {
                        Effect: "Allow",
                        Action: "dynamodb:*",
                        Resource: [
                            "arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.tables.singleTable}",
                            "arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.tables.singleTable}/index/index1",
                            "arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.tables.singleTable}/index/index2",
                        ],
                    },
                ],
            },
        },
    },
    functions: functions_1.default,
    package: { individually: true },
    custom: {
        customDomain: {
            domainName: "bumblebeeapi.blackforestsoftware.com",
            basePath: "",
            stage: "${self:provider.stage}",
            createRoute53Record: true,
        },
        tables: {
            singleTable: "${sls:stage}-${self:service}-single-table",
        },
        dynamodb: {
            inMemory: true,
            port: 8000,
            migrate: true,
            onStart: true,
            docker: true,
        },
        serverlessOffline: {
            httpPort: 3001,
            useDocker: true,
        },
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ["aws-sdk"],
            target: "node18",
            define: { "require.resolve": undefined },
            platform: "node",
            concurrency: 10,
        },
    },
    resources: {
        Resources: {
            ...dynamodb_1.default,
            ...cognitoResources_1.default,
        },
        Outputs: {
            DynamoTableName: {
                Value: "${self:custom.tables.singleTable}",
                Export: {
                    Name: "BumblebeeWebApiDynamoTableName",
                },
            },
        },
    },
};
module.exports = serverlessConfiguration;
//# sourceMappingURL=serverless.js.map