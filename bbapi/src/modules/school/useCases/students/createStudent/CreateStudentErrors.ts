import { Result } from "src/shared/core/Result";
import { UseCaseError } from "src/shared/core/UseCaseError";

export namespace CreateStudentErrors {
  export class StudentAlreadyExistError extends Result<UseCaseError> {
    constructor(studentName: string) {
      super(false, {
        message: `This student ${studentName} already exists`,
      } as UseCaseError);
    }
  }
}
