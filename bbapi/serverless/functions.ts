import type { AWS } from "@serverless/typescript";

const corsSettings = {
  headers: [
    // Specify allowed headers
    "Content-Type",
    "X-Amz-Date",
    "Authorization",
    "X-Api-Key",
    "X-Amz-Security-Token",
    "X-Amz-User-Agent",
  ],
  allowCredentials: true,
};

interface Authorizer {
  name: string;
  type: string;
  arn: {
    "Fn::GetAtt": string[];
  };
}
const authorizer: Authorizer = {
  name: "authorizer",
  type: "COGNITO_USER_POOLS",
  arn: { "Fn::GetAtt": ["CognitoUserPool", "Arn"] },
};

const functions: AWS["functions"] = {
  getAllStudents: {
    handler: "src/modules/school/infra/lambda-handler/handler.getAllStudents",
    events: [
      {
        http: {
          path: "/students",
          method: "get",
          cors: corsSettings,
          authorizer,
        },
      },
    ],
  },
  getStudent: {
    handler: "src/modules/school/infra/lambda-handler/handler.getStudentById",
    events: [
      {
        http: {
          path: "/getStudent/{id}",
          method: "get",
          cors: corsSettings,
          authorizer,
        },
      },
    ],
  },
  createStudent: {
    handler: "src/modules/school/infra/lambda-handler/handler.createStudent",
    events: [
      {
        http: {
          path: "/createStudent",
          method: "post",
          cors: corsSettings,
          // authorizer,
        },
      },
    ],
  },
};

export default functions;
