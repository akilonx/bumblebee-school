import Dynamo from "@libs/Dynamo";
import { formatJSONResponse } from "@libs/apiGateway";
import { APIGatewayProxyEvent } from "aws-lambda";
import { UserRecord } from "src/types/dynamo";
const AWS = require("aws-sdk");

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const tableName = process.env.singleTable;

    const body = JSON.parse(event.body);

    if (!body.houseNo || !body.streetName || !body.name || !body.mobile) {
      return formatJSONResponse({
        statusCode: 400,
        data: { error: "Invalid data" },
      });
    }

    // get user id from request context, because we are using API Gateway with Cognito authorizer
    // so we have the authorized user who is making the request
    const sub = event.requestContext?.authorizer?.claims?.sub;

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

    const params = {
      GroupName: "owner" /* required */,
      UserPoolId: "us-east-1_aRBw78DqX" /* required */,
      Username: sub /* required */,
    };

    const cognitoidentityserviceprovider =
      new AWS.CognitoIdentityServiceProvider();

    await cognitoidentityserviceprovider.adminAddUserToGroup(
      params,
      function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
      }
    );

    // start updating the user record
    // delete the old record
    await Dynamo.delete({ pkKey: "id", pkValue: user.id, tableName });

    const houseNo = houseNoToId(body.houseNo);
    const streetName = streetNameToId(body.streetName);

    const data: UserRecord = {
      id: user.id,
      pk: `user#`, // user#${residenceId} // user# for first time user
      sk: `homeaddress#${streetName}#${houseNo}`, // homeaddress#${streetName}#${houseNo}
      email: user.email || "",
      name: body.name || "",
      houseNo: body.houseNo || "",
      streetName: body.streetName || "",
      mobile: body.mobile || "",
      mobileExtra: body.mobileExtra || "",
      phone: body.phone || "",
      createdAt: user.createdAt || "",
      avatar: user.avatar || "",
      residenceId: user.residenceId || "",
      active: user.active || "",
      updatedAt: new Date().toISOString(),
    };

    await Dynamo.write({ data, tableName });

    return formatJSONResponse({
      statusCode: 200,
      data: { success: "Successfully updated your profile details" },
    });
  } catch (error) {
    console.error(error);
    return formatJSONResponse({
      statusCode: 500,
      data: { error: error.message },
    });
  }
};

const streetNameToId = (streetName: string) => {
  const streetNameId = streetName
    .toUpperCase()
    .replace(/\s/g, "")
    .replace(/[^a-zA-Z0-9]/g, "");
  return streetNameId;
};
const houseNoToId = (houseNo: string) => {
  const houseNoId = houseNo
    .toUpperCase()
    .replace(/\s/g, "")
    .replace(/[^a-zA-Z0-9]/g, "");
  return houseNoId;
};
