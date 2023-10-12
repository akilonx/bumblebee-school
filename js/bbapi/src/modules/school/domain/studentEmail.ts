import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

export interface StudentEmailProps {
  value: string;
}

export class StudentEmail extends ValueObject<StudentEmailProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: StudentEmailProps) {
    super(props);
  }

  private static isValidEmail(email: string) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  private static format(email: string): string {
    return email.trim().toLowerCase();
  }

  public static create(email: string): Result<StudentEmail> {
    if (!this.isValidEmail(email)) {
      return Result.fail<StudentEmail>("Email address not valid");
    } else {
      return Result.ok<StudentEmail>(
        new StudentEmail({ value: this.format(email) })
      );
    }
  }
}
