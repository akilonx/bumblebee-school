import Dynamo from "@libs/Dynamo";
import { formatJSONResponse } from "@libs/apiGateway";
import { APIGatewayProxyEvent } from "aws-lambda";
import {
  ResidenceRecord,
  UserApprovalRecord,
  UserRecord,
} from "src/types/dynamo";
import { v4 as uuid } from "uuid";
export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const tableName = process.env.singleTable;

    // const body = JSON.parse(event.body);

    // get user id from request context, because we are using API Gateway with Cognito authorizer
    // so we have the authorized user who is making the request
    const sub = event.requestContext?.authorizer?.claims?.sub;

    const user = await Dynamo.get<UserRecord>({
      tableName: tableName,
      pkKey: "id",
      pkValue: sub,
    });

    if (!user || user.residenceId) {
      return formatJSONResponse({
        statusCode: 404,
        data: { error: "No data" },
      });
    }

    // currently it defaults the residenceId to the user's residenceId
    const [residence] = await Dynamo.query<ResidenceRecord>({
      tableName: tableName,
      index: "index1",
      pkKey: "pk",
      pkValue: `residence`,
    });

    if (!residence) {
      return formatJSONResponse({
        statusCode: 404,
        data: { error: "No data" },
      });
    }

    const [hasApprovalBefore] = await Dynamo.query<UserApprovalRecord>({
      tableName: tableName,
      index: "index1",
      pkKey: "pk",
      pkValue: `approval#new#${residence.id}`,
      skValue: `userId#${user.id}`,
    });

    if (hasApprovalBefore) {
      return formatJSONResponse({
        statusCode: 400,
        data: { error: "Unknown Error" },
      });
    }

    UpdateUserRecord: {
      await Dynamo.delete({ pkKey: "id", pkValue: user.id, tableName });

      const data: UserRecord = {
        id: user.id,
        pk: `user#${residence.id}`, // user#${residenceId}
        sk: user.sk, // homeaddress#${streetName}#${houseNo}
        email: user.email || "",
        name: user.name || "",
        houseNo: user.houseNo || "",
        streetName: user.streetName || "",
        mobile: user.mobile || "",
        mobileExtra: user.mobileExtra || "",
        phone: user.phone || "",
        createdAt: user.createdAt || "",
        avatar: user.avatar || "",
        residenceId: residence.id || "",
        active: user.active || "",
        updatedAt: new Date().toISOString(),
      };

      await Dynamo.write({ data, tableName });
    }

    CreateApprovalRecord: {
      const data: UserApprovalRecord = {
        id: uuid(),
        pk: `approval#new#${residence.id}`, // approval#(new|rejected|verified)#${residenceId}
        sk: `userId#${user.id}`, //userId#${userId}
        residenceId: residence.id,
        userId: user.id,
        rejectedAt: "",
        rejectedBy: "",
        verifiedAt: "",
        verrifiedBy: "",
        createdAt: new Date().toISOString(),
        updatedAt: "",
      };

      await Dynamo.write({ data, tableName });
    }

    return formatJSONResponse({
      statusCode: 200,
      data: {
        success:
          "Sent request to join as Residence of " + residence.residenceName,
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
