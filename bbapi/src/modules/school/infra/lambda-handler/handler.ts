import { APIGatewayEvent } from "aws-lambda";
import { createStudentController } from "../../useCases/students/createStudent";
import { getStudentByIdController } from "../../useCases/students/getStudentById";

export const createStudent = async (event: APIGatewayEvent) =>
  await createStudentController.execute(event);

export const getStudentById = async (event: APIGatewayEvent) =>
  await getStudentByIdController.execute(event);
