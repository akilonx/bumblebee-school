import { APIGatewayEvent } from "aws-lambda";
import { StudentMap } from "src/modules/school/mappers/studentMap";
import { BaseController } from "src/shared/infra/http/BaseController";
import { HttpResponse } from "src/shared/infra/http/HttpResponse";
import { GetAllStudentsResponseDTO } from "./getAllStudentsResponseDTO";
import { GetAllStudentsUseCase } from "./getAllStudentsUseCase";

export class GetAllStudentsController extends BaseController {
  private useCase: GetAllStudentsUseCase;

  constructor(useCase: GetAllStudentsUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(_event: APIGatewayEvent): Promise<HttpResponse> {
    try {
      const result = await this.useCase.execute();

      if (result.isLeft()) {
        return this.fail(result.value.getErrorValue().message);
      } else {
        const students = result.value.getValue();

        return this.ok<GetAllStudentsResponseDTO>({
          students: students.map((student) => StudentMap.toDTO(student)),
        });
      }
    } catch (err) {
      return this.fail(err);
    }
  }
}
