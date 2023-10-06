import Dynamo from "@libs/Dynamo";
import { formatJSONResponse } from "@libs/apiGateway";
import { APIGatewayProxyEvent } from "aws-lambda";
import { PaymentRecord, UserRecord } from "src/types/dynamo";

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const tableName = process.env.singleTable;

    const body = JSON.parse(event.body);

    if (
      !body.paymentDate ||
      !body.userId ||
      !body.totalMonth ||
      !body.totalPayment
    ) {
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

    const data: PaymentRecord = {
      id: user.id,
      pk: `payment#${user.residenceId}`,
      sk: `userId#${body.userId}`,
      userId: body.userId || "",
      paymentDate: body.paymentDate || "",
      totalMonth: body.totalMonth || "",
      totalPayment: body.totalPayment || "",
      remarks: body.remarks || "",
      paymentType: body.paymentType || "",
      createdBy: user.id,
      createdAt: new Date().toISOString(),
      updatedBy: "",
      updatedAt: "",
      residenceId: user.residenceId,
    };

    await Dynamo.write({ data, tableName });

    return formatJSONResponse({
      statusCode: 200,
      data: { success: "Successfully added payment" },
    });
  } catch (error) {
    console.error(error);
    return formatJSONResponse({
      statusCode: 500,
      data: { error: error.message },
    });
  }
};
