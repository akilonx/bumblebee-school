import { UserRecord } from "src/types/dynamo";
import Dynamo from "./Dynamo";

import { v4 as uuid } from "uuid";

test("Dynamo.get", async () => {
  expect(typeof Dynamo.get).toBe("function");
});

test("Dynamo has get and write", () => {
  expect(typeof Dynamo.get).toBe("function");
  expect(typeof Dynamo.write).toBe("function");
});

const validTableName = "dev-bumblebee-serverless-single-table";
const data: UserRecord = {
  id: uuid(),
  pk: `user#abc123`, // user#${residenceId}
  sk: "homeaddress#jalanpipit", // homeaddress#${streetName}#${houseNo}
  email: "akilonx@gmail.com",
  name: "Akilon",
  houseNo: "",
  streetName: "",
  mobile: "",
  mobileExtra: "",
  phone: "",
  createdAt: "",
  avatar: "",
  residenceId: "",
  active: "",
  updatedAt: new Date().toISOString(),
};

test("Dynamo write works", async () => {
  expect.assertions(1);
  try {
    const res: UserRecord = await Dynamo.write<UserRecord>({
      data,
      tableName: validTableName,
    });

    expect(res).toStrictEqual(data);
  } catch (error) {
    console.log("error in dynamo write test", error);
  }
});

test("Dynamo get works", async () => {
  expect.assertions(1);
  try {
    const res = await Dynamo.get({
      pkKey: "id",
      pkValue: data.id,
      tableName: validTableName,
    });
    expect(res).toEqual(data);
  } catch (error) {
    console.log("error in dynamo get", error);
  }
});
