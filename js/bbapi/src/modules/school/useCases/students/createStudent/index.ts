import { studentRepo } from "src/modules/school/repos";
import { CreateStudentController } from "./CreateStudentController";
import { CreateStudentUseCase } from "./CreateStudentUseCase";

const createStudentUseCase = new CreateStudentUseCase(studentRepo);
const createStudentController = new CreateStudentController(
  createStudentUseCase
);

export { createStudentController, createStudentUseCase };
