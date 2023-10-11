import { studentRepo } from "src/modules/school/repos";
import { GetAllStudentsController } from "./getAllStudentsController";
import { GetAllStudentsUseCase } from "./getAllStudentsUseCase";

const getAllStudentsUseCase = new GetAllStudentsUseCase(studentRepo);
const getAllStudentsController = new GetAllStudentsController(
  getAllStudentsUseCase
);

export { getAllStudentsController };
