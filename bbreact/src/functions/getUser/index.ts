import { removePkSk } from "@libs/APIResponses";
import Dynamo from "@libs/Dynamo";
import { formatJSONResponse } from "@libs/apiGateway";
import { APIGatewayProxyEvent } from "aws-lambda";
import { UserApprovalRecord, UserRecord } from "src/types/dynamo";

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const tableName = process.env.singleTable;

    console.log(event.requestContext);
    const { claims } = event.requestContext.authorizer;

    if (!claims) {
      return formatJSONResponse({
        statusCode: 404,
        data: { message: "No data " },
      });
    }

    const { sub } = claims;

    const user = await Dynamo.get<UserRecord>({
      tableName: tableName,
      pkKey: "id",
      pkValue: `${sub}`,
    });

    if (!user) {
      return formatJSONResponse({
        statusCode: 404,
        data: { message: "No data " },
      });
    }

    const [approved] = await Dynamo.query<UserApprovalRecord>({
      tableName: tableName,
      index: "index1",
      pkKey: "pk",
      pkValue: `approval#verified#${user.residenceId}`,
      skKey: "sk",
      skValue: `userId#${sub}`,
    });

    if (approved && user.residenceId !== approved.residenceId) {
      return formatJSONResponse({
        statusCode: 400,
        data: {
          message: "User does not belong to this residence",
        },
      });
    }

    const [approvedNew] = await Dynamo.query<UserApprovalRecord>({
      tableName: tableName,
      index: "index1",
      pkKey: "pk",
      pkValue: `approval#new#${user.residenceId}`,
      skKey: "sk",
      skValue: `userId#${sub}`,
    });

    if (approvedNew && user.residenceId !== approvedNew.residenceId) {
      return formatJSONResponse({
        statusCode: 400,
        data: {
          message: "User does not belong to this residence",
        },
      });
    }

    return formatJSONResponse({
      statusCode: 200,
      data: {
        user: removePkSk(user),
        approval: approved ? removePkSk(approved) : removePkSk(approvedNew),
        message: "Success",
      },
    });
  } catch (error) {
    console.log("error", error);
    return;
  }
};
