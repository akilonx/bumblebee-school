import { Result } from "../../../../../shared/core/Result";
import { UseCaseError } from "../../../../../shared/core/UseCaseError";

export namespace GetAllStudentsErrors {
  export class StudentNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Something went wrong with getting all students`,
      } as UseCaseError);
    }
  }
}
