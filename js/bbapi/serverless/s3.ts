import type { AWS } from "@serverless/typescript";

const S3Resources: AWS["resources"]["Resources"] = {
  BumblebeeWebReactAppBucket: {
    Type: "AWS::S3::Bucket",
    Properties: {
      BucketName: "${self:custom.bucketName}",
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: false,
      },
      OwnershipControls: {
        Rules: [
          {
            ObjectOwnership: "ObjectWriter",
          },
        ],
      },
      WebsiteConfiguration: {
        IndexDocument: "index.html",
        ErrorDocument: "index.html",
      },
    },
  },
  BumblebeeS3AccessPolicy: {
    Type: "AWS::S3::BucketPolicy",
    Properties: {
      Bucket: "${self:custom.bucketName}",
      PolicyDocument: {
        Statement: [
          {
            Sid: "PublicReadGetObject",
            Effect: "Allow",
            Principal: "*",
            Action: ["s3:GetObject", "s3:PutObject"],
            Resource: "arn:aws:s3:::${self:custom.bucketName}/*",
          },
        ],
      },
    },
  },
};

export default S3Resources;
