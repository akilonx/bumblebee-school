import { APIGatewayEvent } from "aws-lambda";
import { StudentMap } from "src/modules/school/mappers/studentMap";
import { BaseController } from "src/shared/infra/http/BaseController";
import { HttpResponse } from "src/shared/infra/http/HttpResponse";
import { GetStudentByIdResponseDTO } from "./GetStudentByIdResponseDTO";
import { GetStudentByIdUseCase } from "./GetStudentByIdUseCase";

export class GetStudentByIdController extends BaseController {
  private useCase: GetStudentByIdUseCase;

  constructor(useCase: GetStudentByIdUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(event: APIGatewayEvent): Promise<HttpResponse> {
    try {
      const { id } = event.pathParameters;

      const result = await this.useCase.execute(id);

      if (result.isLeft()) {
        return this.fail(result.value.getErrorValue().message);
      } else {
        const studentDetails = result.value.getValue();

        return this.ok<GetStudentByIdResponseDTO>({
          student: StudentMap.toDTO(studentDetails),
        });
      }
    } catch (err) {
      return this.fail(err);
    }
  }
}
