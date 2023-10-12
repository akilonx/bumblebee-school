import { Student } from "src/modules/school/domain/student";
import { IStudentRepo } from "src/modules/school/repos/studentRepo";
import { AppError } from "../../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { UseCase } from "../../../../../shared/core/UseCase";
import { GetAllStudentsErrors } from "./getAllStudentsErrors";

type Response = Either<
  GetAllStudentsErrors.StudentNotFoundError | AppError.UnexpectedError,
  Result<Student[]>
>;

export class GetAllStudentsUseCase
  implements UseCase<string, Promise<Response>>
{
  private studentRepo: IStudentRepo;

  constructor(memberRepo: IStudentRepo) {
    this.studentRepo = memberRepo;
  }

  public async execute(): Promise<Response> {
    let students: Student[];

    try {
      try {
        students = await this.studentRepo.getStudents();
      } catch (err) {
        return left(new GetAllStudentsErrors.StudentNotFoundError());
      }

      return right(Result.ok<Student[]>(students));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
