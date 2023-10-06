import { Mapper } from "src/shared/Mapper";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Student } from "../domain/student";
import { StudentDTO } from "../dtos/student";
import { StudentRecord } from "../infra/database/dynamodb/dynamo";

export class StudentMap implements Mapper<Student> {
  public static toPersistence(student: Student): StudentRecord {
    return {
      id: student.studentId.getStringValue(),
      pk: `student`,
      sk: `email#${student.email.value}`,
      fullName: student.fullName,
      mobile: student.mobile.value,
      email: student.email.value,
      guardianName: student.guardianName,
      guardianMobile: student.guardianMobile.value,
      createdAt: `${new Date().getTime()}`,
      createdBy: "",
      updatedAt: ``,
      updatedBy: "",
    };
  }

  public static toDomain(raw: any): Student {
    const studentOrError = Student.create(
      {
        fullName: raw.fullName,
        mobile: raw.mobile,
        email: raw.email,
        guardianName: raw.guardianName,
        guardianMobile: raw.guardianMobile,
      },
      new UniqueEntityID(raw.id)
    );

    studentOrError.isFailure ? console.log(studentOrError.getErrorValue()) : "";

    return studentOrError.isSuccess ? studentOrError.getValue() : null;
  }
  public static toDTO(student: Student): StudentDTO {
    return {
      id: student.studentId.getStringValue(),
      fullName: student.fullName,
      mobile: student.mobile.value,
      email: student.email.value,
      guardianName: student.guardianName,
      guardianMobile: student.guardianMobile.value,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    };
  }
}
