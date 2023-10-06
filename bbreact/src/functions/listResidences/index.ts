import { removePkSk } from "@libs/APIResponses";
import Dynamo from "@libs/Dynamo";
import { formatJSONResponse } from "@libs/apiGateway";
import { APIGatewayProxyEvent } from "aws-lambda";
import { UserApprovalRecord, UserRecord } from "src/types/dynamo";

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const tableName = process.env.singleTable;

    const { claims } = event.requestContext.authorizer;

    if (!claims) {
      return formatJSONResponse({
        statusCode: 404,
        data: { message: "No data " },
      });
    }

    const { sub } = claims;
    const group = claims["cognito:groups"];

    if (group !== "admin") {
      return formatJSONResponse({
        statusCode: 400,
        data: {
          message: "Invalid request",
        },
      });
    }

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

    // const [approved] = await Dynamo.query<UserApprovalRecord>({
    //   tableName: tableName,
    //   index: "index1",
    //   pkKey: "pk",
    //   pkValue: `approval#verified#${user.residenceId}`,
    //   skValue: `userId#${sub}`,
    // });

    // console.log("approved", approved);

    // if (approved) {
    //   return formatJSONResponse({
    //     statusCode: 400,
    //     data: {
    //       message: "Invalid request",
    //     },
    //   });
    // }

    const residences = await Dynamo.query<UserApprovalRecord>({
      tableName: tableName,
      index: "index1",
      pkKey: "pk",
      pkValue: `approval#verified#${user.residenceId}`,
    });

    const residenceUsers = [];

    const users = await Dynamo.query<UserRecord>({
      tableName: tableName,
      index: "index1",
      pkKey: "pk",
      pkValue: `user#${user.residenceId}`,
    });

    residences.map((residence) => {
      const user = users.find((user) => user.id === residence.userId);
      residenceUsers.push({ ...user });
    });

    return formatJSONResponse({
      statusCode: 200,
      data: {
        residenceUsers: removePkSk(residenceUsers),
        message: "Success",
      },
    });
  } catch (error) {
    console.log("error", error);
    return;
  }
};
