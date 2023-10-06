import { studentRepo } from "src/modules/school/repos";
import { GetStudentByIdController } from "./GetStudentByIdController";
import { GetStudentByIdUseCase } from "./GetStudentByIdUseCase";

const getStudentByIdUseCase = new GetStudentByIdUseCase(studentRepo);
const getStudentByIdController = new GetStudentByIdController(
  getStudentByIdUseCase
);

export { getStudentByIdController };
