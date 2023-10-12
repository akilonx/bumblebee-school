import { Mapper } from "@utils/Mapper";
import { StudentDTO } from "../dtos/StudentDTO";
import { Student } from "../models/Student";

export class StudentMap implements Mapper<Student> {
	public static toViewModel(student: StudentDTO): Student {
		return {
			id: student.id,
			fullName: student.fullName,
			mobile: student.mobile,
			email: student.email,
			guardianName: student.guardianName,
			guardianMobile: student.guardianMobile,
			createdAt: new Date(student.createdAt),
			updatedAt: new Date(student.updatedAt),
		};
	}
}
