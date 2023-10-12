import { APIGatewayEvent } from "aws-lambda";
import { BaseController } from "src/shared/infra/http/BaseController";
// import { TextUtils } from "src/shared/utils/TextUtils";
import { HttpResponse } from "src/shared/infra/http/HttpResponse";
import { CreateStudentDTO } from "./CreateStudentDTO";
import { CreateStudentErrors } from "./CreateStudentErrors";
import { CreateStudentUseCase } from "./CreateStudentUseCase";

export class CreateStudentController extends BaseController {
  private useCase: CreateStudentUseCase;

  constructor(useCase: CreateStudentUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(event: APIGatewayEvent): Promise<HttpResponse> {
    let dto: CreateStudentDTO = JSON.parse(event.body) as CreateStudentDTO;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case CreateStudentErrors.StudentAlreadyExistError:
            return this.conflict(error.getErrorValue().message);
          default:
            return this.fail(error.getErrorValue().message);
        }
      } else {
        return this.created();
      }
    } catch (err) {
      return this.fail(err);
    }
  }
}
