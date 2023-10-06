import { removePkSk } from "@libs/APIResponses";
import Dynamo from "@libs/Dynamo";
import { formatJSONResponse } from "@libs/apiGateway";
import { APIGatewayProxyEvent } from "aws-lambda";
import {
  UserApprovalRecord,
  UserRecord,
  UserRolesRecord,
} from "src/types/dynamo";

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

    console.log("claims", claims);

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

    const roles = await Dynamo.query<UserRolesRecord>({
      tableName: tableName,
      index: "index1",
      pkKey: "pk",
      pkValue: `roles#${user.residenceId}#${user.id}`,
    });

    const isAdmin = roles.find((role) => role.role === "admin");

    if (!isAdmin) {
      return formatJSONResponse({
        statusCode: 400,
        data: {
          message: "Invalid request",
        },
      });
    }

    const approvals = await Dynamo.query<UserApprovalRecord>({
      tableName: tableName,
      index: "index1",
      pkKey: "pk",
      pkValue: `approval#new#${user.residenceId}`,
    });

    type UserApprovalRecordWithUser = UserApprovalRecord & {
      user: UserRecord;
    };

    const approvalsUsers: UserApprovalRecordWithUser[] = [];

    AttachUsersToApprovals: {
      const promiseAll = approvals.map(async (approval) => {
        const user = await Dynamo.get<UserRecord>({
          tableName: tableName,
          pkKey: "id",
          pkValue: approval.userId,
        });

        if (user) {
          approvalsUsers.push({ ...approval, user });
        }
      });

      await Promise.all(promiseAll);
    }

    return formatJSONResponse({
      statusCode: 200,
      data: {
        approvals: removePkSk(approvalsUsers),
        message: "Success",
      },
    });
  } catch (error) {
    console.log("error", error);
    return;
  }
};
