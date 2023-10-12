import Dynamo from "@libs/Dynamo";
import { Student } from "../../domain/student";
import { StudentRecord } from "../../infra/database/dynamodb/dynamo";
import { StudentMap } from "../../mappers/studentMap";
import { IStudentRepo } from "../studentRepo";
export class StudentRepo implements IStudentRepo {
  private tableName: string = process.env.singleTable;

  constructor() {}

  public async getStudents(): Promise<Student[]> {
    const students = await Dynamo.query<StudentRecord>({
      index: "index1",
      tableName: this.tableName,
      pkValue: `student`,
      pkKey: "pk",
    });
    const studentsArray = students.map((student) =>
      StudentMap.toDomain(student)
    );
    return studentsArray;
  }

  public async getStudentByStudentId(studentId: string): Promise<Student> {
    const student = await Dynamo.get<StudentRecord>({
      tableName: this.tableName,
      pkValue: `${studentId}`,
      pkKey: "id",
    });
    const found = !!student === true;
    if (!found) throw new Error("Student id not found");
    return StudentMap.toDomain(student);
  }

  public async exists(studentId: string): Promise<boolean> {
    const student = await Dynamo.get<StudentRecord>({
      tableName: this.tableName,
      pkValue: `${studentId}`,
      pkKey: "id",
    });
    const found = !!student === true;
    return found;
  }

  public async save(student: Student): Promise<void> {
    const exists = await this.exists(student.id.toString());
    if (!exists) {
      const rawDynamoStudent = await StudentMap.toPersistence(student);
      await Dynamo.write({ data: rawDynamoStudent, tableName: this.tableName });
    }
    return;
  }
}
