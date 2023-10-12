import { StudentRecord } from "src/modules/school/infra/database/dynamodb/dynamo";
import { v4 as uuid } from "uuid";
import Dynamo from "./Dynamo";

test("Dynamo.get", async () => {
  expect(typeof Dynamo.get).toBe("function");
});

test("Dynamo has get and write", () => {
  expect(typeof Dynamo.get).toBe("function");
  expect(typeof Dynamo.write).toBe("function");
});

const validTableName = "dev-bumblebee-serverless-single-table";
const data: StudentRecord = {
  id: uuid(),
  pk: `user#abc123`,
  sk: "homeaddress#jalanpipit",
  email: "akilonx@gmail.com",
  fullName: "Akilon",
  mobile: "",
  guardianName: "",
  guardianMobile: "",
  createdAt: new Date().toISOString(),
  createdBy: "",
  updatedBy: "",
  updatedAt: new Date().toISOString(),
};

test("Dynamo write works", async () => {
  expect.assertions(1);
  try {
    const res = await Dynamo.write<StudentRecord>({
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
