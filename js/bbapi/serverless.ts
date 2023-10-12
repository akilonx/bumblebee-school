import type { AWS } from "@serverless/typescript";

import CognitoResources from "./serverless/cognitoResources";
import DynamoResources from "./serverless/dynamodb";
import functions from "./serverless/functions";

const serverlessConfiguration: AWS = {
  service: "bumblebeeapi-serverless",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    // "serverless-s3-sync",
    "serverless-dynamodb-local",
    "serverless-domain-manager",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs18.x",
    // profile: "serverlessUser",
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
  // import the function via paths 6c04b0f2-6230-4e6e-bd48-0f0852cce76c
  functions,
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

    // bucketName: "bumblebeeweb-app-bucket",
    // s3Sync: [
    //   {
    //     bucketName: "bumblebeeweb-app-bucket",
    //     localDir: "admin-app/build/",
    //   },
    // ],
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
      ...DynamoResources,
      // ...S3Resources,
      ...CognitoResources,
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
