import { Mapper } from '@utils/Mapper';

import type { StudentDTO } from '../dtos/StudentDTO';
import type { Student } from '../models/Student';

export class StudentDTOMapper extends Mapper<StudentDTO, Student> {
	from(input: StudentDTO): Student {
		return {
			id: input.id,
			fullName: input.fullName,
			mobile: input.mobile,
			email: input.email,
			guardianName: input.guardianName,
			guardianMobile: input.guardianMobile,
			createdAt: new Date(input.createdAt),
			updatedAt: new Date(input.updatedAt),
		};
	}

	into(input: Student): StudentDTO {
		return {
			id: input.id,
			fullName: input.fullName,
			mobile: input.mobile,
			email: input.email,
			guardianName: input.guardianName,
			guardianMobile: input.guardianMobile,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
	}
}
