import type { AWS } from "@serverless/typescript";

import CognitoResources from "./serverless/cognitoResources";
import S3Resources from "./serverless/s3";

const serverlessConfiguration: AWS = {
  service: "bumblebeemusic-serverless",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-s3-sync",
    // "serverless-domain-manager",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs18.x",
    profile: "serverlessUser",
    region: "us-east-1",
    stage: "dev",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      region: "${self:provider.region}",
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      bucketName: "${self:custom.bucketName}",
      // uploadBucketName: "bbeeweb-webapp-uploads",
    },
    // iam: { role: {
    //     statements: [],
    //   },
    // },
  },
  // import the function via paths 6c04b0f2-6230-4e6e-bd48-0f0852cce76c
  package: { individually: true },
  custom: {
    // customDomain: {
    //   domainName: "bbeeweb.blackforestsoftware.com",
    //   basePath: "",
    //   stage: "${self:provider.stage}",
    //   createRoute53Record: true,
    // },
    bucketName: "bumblebeemusic.blackforestsoftware.com",
    s3Sync: [
      {
        bucketName: "${self:custom.bucketName}",
        localDir: "public/app/build/",
      },
    ],
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
      ...S3Resources,
      ...CognitoResources,
    },
    // Outputs: {
    //   DynamoTableName: {
    //     Value: "${self:custom.tables.singleTable}",
    //     Export: {
    //       Name: "JiranDynamoTableName",
    //     },
    //   },
    // },
  },
};

module.exports = serverlessConfiguration;
