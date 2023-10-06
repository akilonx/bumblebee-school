import { StudentRecord } from "../database/dynamodb/dynamo";
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
const data: StudentRecord = {
  id: uuid(),
  pk: `student`,
  sk: "email#akilonx@gmail.com",
  email: "akilonx@gmail.com",
  fullName: "akilon",
  mobile: "",
  guardianName: "",
  guardianMobile: "",
  createdAt: "",
  createdBy: "",
  updatedAt: "",
  updatedBy: "",
};

test("Dynamo write works", async () => {
  expect.assertions(1);
  try {
    const res: StudentRecord = await Dynamo.write<StudentRecord>({
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
