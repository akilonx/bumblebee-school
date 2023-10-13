import { AuthService } from "@infra/services/AuthService";

import { StudentService } from "./studentService";

const authService = new AuthService();
const studentService = new StudentService(authService);

export { studentService };
