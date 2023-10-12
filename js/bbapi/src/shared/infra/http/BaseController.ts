import { APIGatewayProxyEvent } from "aws-lambda";
import { HttpResponse } from "./HttpResponse";

export abstract class BaseController {
  protected abstract executeImpl(
    event: APIGatewayProxyEvent
  ): Promise<HttpResponse>;

  public async execute(event: APIGatewayProxyEvent): Promise<HttpResponse> {
    try {
      return await this.executeImpl(event);
    } catch (err) {
      console.log(`[BaseController]: Uncaught controller error`);
      console.log(err);
      this.fail("unexpected error occurred");
    }
  }

  public static jsonResponse(code: number, message: string) {
    return HttpResponse.defineResponse(code, message);
  }

  public ok<T>(dto?: T) {
    if (!!dto) {
      return HttpResponse._200(dto);
    } else {
      return HttpResponse._200();
    }
  }

  public created() {
    return HttpResponse._201();
  }

  public noContent() {
    return HttpResponse._204();
  }

  public clientError(message?: string) {
    return HttpResponse._400(message);
  }

  public unauthorized(message?: string) {
    return HttpResponse._401(message);
  }

  public paymentRequired(message?: string) {
    return HttpResponse._402(message);
  }

  public forbidden(message?: string) {
    return HttpResponse._403(message);
  }

  public notFound(message?: string) {
    return HttpResponse._404(message);
  }

  public conflict(message?: string) {
    return HttpResponse._409(message);
  }

  public tooMany(message?: string) {
    return HttpResponse._429(message);
  }

  public todo() {
    return HttpResponse._400("TODO");
  }

  public fail(error: Error | string) {
    console.log(error);
    return HttpResponse._500(error.toString());
  }
}
