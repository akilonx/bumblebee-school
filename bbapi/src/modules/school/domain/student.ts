import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { StudentCreated } from "./events/studentCreated";
import { StudentEmail } from "./studentEmail";
import { StudentId } from "./studentId";
import { StudentMobile } from "./studentMobile";

interface StudentProps {
  fullName: string;
  mobile: StudentMobile;
  email: StudentEmail;
  guardianName: string;
  guardianMobile: StudentMobile;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Student extends AggregateRoot<StudentProps> {
  get studentId(): StudentId {
    return StudentId.create(this._id).getValue();
  }

  get fullName(): string {
    return this.props.fullName;
  }

  get mobile(): StudentMobile {
    return this.props.mobile;
  }

  get email(): StudentEmail {
    return this.props.email;
  }

  get guardianName(): string {
    return this.props.guardianName;
  }

  get guardianMobile(): StudentMobile {
    return this.props.guardianMobile;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  private constructor(props: StudentProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: StudentProps,
    id?: UniqueEntityID
  ): Result<Student> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.fullName, argumentName: "fullName" },
      { argument: props.email, argumentName: "email" },
      { argument: props.guardianName, argumentName: "guardianName" },
      { argument: props.guardianMobile, argumentName: "guardianMobile" },
      { argument: props.mobile, argumentName: "mobile" },
    ]);

    if (guardResult.isFailure) {
      return Result.fail<Student>(guardResult.getErrorValue());
    }

    const defaultValues: StudentProps = {
      ...props,
    };

    const student = new Student(defaultValues, id);
    const isNewStudent = !!id === false;

    if (isNewStudent) {
      student.addDomainEvent(new StudentCreated(student));
    }

    return Result.ok<Student>(student);
  }
}
