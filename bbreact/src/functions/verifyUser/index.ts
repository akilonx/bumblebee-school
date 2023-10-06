import Dynamo from "@libs/Dynamo";
import { formatJSONResponse } from "@libs/apiGateway";
import { APIGatewayProxyEvent } from "aws-lambda";
import { UserApprovalRecord, UserRecord } from "src/types/dynamo";

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const tableName = process.env.singleTable;

    const body = JSON.parse(event.body);

    const { approvalId, verify } = body;

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
        data: {
          message: "Invalid request",
        },
      });
    }

    const approval = await Dynamo.get<UserApprovalRecord>({
      tableName: tableName,
      pkKey: "id",
      pkValue: `${approvalId}`,
    });

    if (!approval) {
      return formatJSONResponse({
        statusCode: 404,
        data: {
          error: "No data",
        },
      });
    }

    const status = verify === "1" ? "verified" : "rejected";

    UpdateApprovalRecord: {
      await Dynamo.delete({ pkKey: "id", pkValue: approval.id, tableName });

      const data: UserApprovalRecord = {
        id: approval.id,
        pk: `approval#${status}#${user.residenceId}`,
        sk: approval.sk,
        updatedAt: new Date().toISOString(),
        residenceId: approval.residenceId,
        userId: approval.userId,
        rejectedAt: verify === "0" ? new Date().toISOString() : "",
        rejectedBy: verify === "0" ? user.id : "",
        verifiedAt: verify === "1" ? new Date().toISOString() : "",
        verrifiedBy: verify === "1" ? user.id : "",
        createdAt: approval.createdAt,
      };

      await Dynamo.write({ data, tableName });
    }

    return formatJSONResponse({
      statusCode: 200,
      data: {
        success: `Successfully ${status} user`,
      },
    });
  } catch (error) {
    console.error(error);
    return formatJSONResponse({
      statusCode: 500,
      data: { error: error.message },
    });
  }
};
