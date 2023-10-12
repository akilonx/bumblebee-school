import { AppError } from "src/shared/core/AppError";
import { Either, Result } from "src/shared/core/Result";
import { CreateStudentErrors } from "./CreateStudentErrors";

export type CreateStudentResponse = Either<
  | CreateStudentErrors.StudentAlreadyExistError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;
