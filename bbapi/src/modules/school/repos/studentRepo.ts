import { Student } from "../domain/student";

export interface IStudentRepo {
  exists(studentId: string): Promise<boolean>;
  getStudentByStudentId(studentId: string): Promise<Student>;
  getStudents(): Promise<Student[]>;
  save(student: Student): Promise<void>;
}
