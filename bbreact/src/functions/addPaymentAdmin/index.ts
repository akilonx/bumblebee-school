import Dynamo from "@libs/Dynamo";
import { formatJSONResponse } from "@libs/apiGateway";
import { APIGatewayProxyEvent } from "aws-lambda";
import { UploadBody, uploadToS3 } from "src/common/s3Uploads";
import { S3UploadRecord, UserRecord } from "src/types/dynamo";
import { v4 as uuid } from "uuid";

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const tableName = process.env.singleTable;

    const body = JSON.parse(event.body);

    // get user id from request context, because we are using API Gateway with Cognito authorizer
    // so we have the authorized user who is making the request
    const { claims } = event.requestContext.authorizer;
    const { sub } = claims;

    const user = await Dynamo.get<UserRecord>({
      tableName: tableName,
      pkKey: "id",
      pkValue: sub,
    });

    if (!user) {
      return formatJSONResponse({
        statusCode: 404,
        data: { error: "No data" },
      });
    }

    const group = claims["cognito:groups"];

    if (group !== "admin") {
      return formatJSONResponse({
        statusCode: 400,
        data: { error: "Invalid request" },
      });
    }

    const id = uuid();
    const uploadBody: UploadBody = {
      fileData: body.fileData,
      mime: body.mime,
      name: body.name,
    };

    const s3File = await uploadToS3(uploadBody);

    SaveS3UploadToDynamo: {
      const data: S3UploadRecord = {
        id: id,
        pk: `upload#${user.residenceId}`,
        sk: `paymentslip#${user.id}`,
        uploadType: "paymentslip",
        uploadName: body.name,
        uploadKey: s3File.key,
        uploadUrl: s3File.uploadUrl,
        createdAt: new Date().toISOString(),
        createdBy: user.id,
        updatedAt: "",
        updatedBy: "",
        residenceId: user.residenceId,
      };

      await Dynamo.write({ data, tableName });
    }

    return formatJSONResponse({
      statusCode: 200,
      data: {
        uploadUrl: s3File.uploadUrl,
        id: id,
        message: "Success",
      },
    });
  } catch (error) {
    console.error(error);
    return formatJSONResponse({
      statusCode: 500,
      error: error.message,
    });
  }
};
