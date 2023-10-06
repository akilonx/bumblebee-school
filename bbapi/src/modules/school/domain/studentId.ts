import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { ValueObject } from "../../../shared/domain/ValueObject";

export class StudentId extends ValueObject<{ value: UniqueEntityID }> {
  getStringValue(): string {
    return this.props.value.toString();
  }

  getValue(): UniqueEntityID {
    return this.props.value;
  }

  private constructor(value: UniqueEntityID) {
    super({ value });
  }

  public static create(value: UniqueEntityID): Result<StudentId> {
    let guardResult = Guard.againstNullOrUndefined(value, "value");
    if (guardResult.isFailure) {
      return Result.fail<StudentId>(guardResult.getErrorValue());
    }
    return Result.ok<StudentId>(new StudentId(value));
  }
}
