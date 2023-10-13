import { left, right } from "@core/Either";
import { Result } from "@core/Result";
import type { APIResponse } from "@infra/services/APIResponse";
import { BaseAPI } from "@infra/services/BaseAPI";

import type { StudentDTO } from "../dtos/StudentDTO";
import { StudentMap } from "../mappers/studentMap";
import type { Student } from "../models/Student";

export type IStudentService = {
	fetchStudents: () => Promise<APIResponse<Student[]>>;
};

export class StudentService extends BaseAPI implements IStudentService {
	public async fetchStudents(): Promise<APIResponse<Student[]>> {
		try {
			const accessToken = this.authService.getToken("access-token");
			const isAuthenticated = !!accessToken;
			const auth = {
				authorization: accessToken,
			};

			const response = await this.get("/students", {}, isAuthenticated ? auth : null);

			return right(
				Result.ok<Student[]>(
					response.data.message.students.map((student: StudentDTO) =>
						StudentMap.toViewModel(student)
					)
				)
			);
		} catch (err: any) {
			return left(err.response ? err.response.data.message : "Connection failed");
		}
	}
}
