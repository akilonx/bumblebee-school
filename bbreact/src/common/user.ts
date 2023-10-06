import Dynamo from "@libs/Dynamo";
import { formatJSONResponse } from "@libs/apiGateway";
import { UserRecord } from "src/types/dynamo";

export const checkUser = async ({ sub }: { sub: string }) => {
  const tableName = process.env.singleTable;

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

  return user;
};
