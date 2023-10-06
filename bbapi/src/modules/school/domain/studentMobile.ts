import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

export interface StudentMobileProps {
  value: string;
}

export class StudentMobile extends ValueObject<StudentMobileProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: StudentMobileProps) {
    super(props);
  }

  private static isValidMobile(email: string) {
    var re = /^\d{11}$/;
    return re.test(email);
  }

  private static format(email: string): string {
    return email.trim().toLowerCase();
  }

  public static create(mobile: string): Result<StudentMobile> {
    if (!this.isValidMobile(mobile)) {
      return Result.fail<StudentMobile>("Mobile number not valid");
    } else {
      return Result.ok<StudentMobile>(
        new StudentMobile({ value: this.format(mobile) })
      );
    }
  }
}
