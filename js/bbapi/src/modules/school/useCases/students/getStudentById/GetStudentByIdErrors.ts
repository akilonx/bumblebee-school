import { Result } from "../../../../../shared/core/Result";
import { UseCaseError } from "../../../../../shared/core/UseCaseError";

export namespace GetStudentByIdErrors {
  export class StudentNotFoundError extends Result<UseCaseError> {
    constructor(email: string) {
      super(false, {
        message: `Couldn't find a student ${email}`,
      } as UseCaseError);
    }
  }
}
