import { Student } from "src/modules/school/domain/student";
import { IStudentRepo } from "src/modules/school/repos/studentRepo";
import { AppError } from "../../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { UseCase } from "../../../../../shared/core/UseCase";
import { GetStudentByIdErrors } from "./GetStudentByIdErrors";

type Response = Either<
  GetStudentByIdErrors.StudentNotFoundError | AppError.UnexpectedError,
  Result<Student>
>;

export class GetStudentByIdUseCase
  implements UseCase<string, Promise<Response>>
{
  private studentRepo: IStudentRepo;

  constructor(memberRepo: IStudentRepo) {
    this.studentRepo = memberRepo;
  }

  public async execute(id: string): Promise<Response> {
    let studentDetails: Student;

    try {
      try {
        studentDetails = await this.studentRepo.getStudentByStudentId(id);
      } catch (err) {
        return left(new GetStudentByIdErrors.StudentNotFoundError(id));
      }

      return right(Result.ok<Student>(studentDetails));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
