import { Student } from "src/modules/school/domain/student";
import { StudentEmail } from "src/modules/school/domain/studentEmail";
import { StudentMobile } from "src/modules/school/domain/studentMobile";
import { IStudentRepo } from "src/modules/school/repos/studentRepo";
import { AppError } from "src/shared/core/AppError";
import { Either, Result, left, right } from "src/shared/core/Result";
import { UseCase } from "src/shared/core/UseCase";
import { CreateStudentDTO } from "./CreateStudentDTO";
import { CreateStudentErrors } from "./CreateStudentErrors";

type Response = Either<
  | CreateStudentErrors.StudentAlreadyExistError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;

export class CreateStudentUseCase
  implements UseCase<CreateStudentDTO, Promise<Response>>
{
  private userRepo: IStudentRepo;

  constructor(userRepo: IStudentRepo) {
    this.userRepo = userRepo;
  }

  async execute(request: CreateStudentDTO): Promise<Response> {
    const studentEmailOrError = StudentEmail.create(request.email);
    const studentMobileOrError = StudentMobile.create(request.mobile);
    const guardianMobileOrError = StudentMobile.create(request.guardianMobile);

    const dtoResult = Result.combine([
      studentEmailOrError,
      studentMobileOrError,
      guardianMobileOrError,
    ]);

    if (dtoResult.isFailure) {
      return left(Result.fail<void>(dtoResult.getErrorValue())) as Response;
    }

    const studentEmail: StudentEmail = studentEmailOrError.getValue();
    const studentMobile: StudentMobile = studentMobileOrError.getValue();
    const guardianMobile: StudentMobile = guardianMobileOrError.getValue();

    try {
      const userOrError: Result<Student> = Student.create({
        fullName: request.fullName,
        email: studentEmail,
        mobile: studentMobile,
        guardianName: request.guardianName,
        guardianMobile: guardianMobile,
      });

      if (userOrError.isFailure) {
        return left(
          Result.fail<Student>(userOrError.getErrorValue().toString())
        ) as Response;
      }

      const student: Student = userOrError.getValue();

      await this.userRepo.save(student);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as Response;
    }
  }
}
