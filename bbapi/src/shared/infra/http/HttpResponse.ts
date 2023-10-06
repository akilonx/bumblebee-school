export class HttpResponse {
  static defineResponse(statusCode = 502, code, message = {}, details?) {
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      statusCode,
      body: JSON.stringify({ code, message, details }),
      isBase64Encoded: false,
    };
  }

  static _200(message?: any) {
    return this.defineResponse(200, "OK", message);
  }

  static _201() {
    return this.defineResponse(201, "CREATED");
  }

  static _202(message: any) {
    return this.defineResponse(202, "ACCEPTED", message);
  }

  static _204() {
    return this.defineResponse(204, "NO_CONTENT");
  }

  static _400(message: any, details = []) {
    return this.defineResponse(400, "BAD_REQUEST", message, details);
  }

  static _401(message: any, details = []) {
    return this.defineResponse(401, "UNAUTHORIZED", message, details);
  }

  static _402(message: any, details = []) {
    return this.defineResponse(402, "PAYMENT_REQUIRED", message, details);
  }

  static _403(message: any, details = []) {
    return this.defineResponse(403, "FORBIDDEN", message, details);
  }

  static _412(message: any, details = []) {
    return this.defineResponse(412, "PRECONDITION_FAILED", message, details);
  }

  static _429(message: any, details = []) {
    return this.defineResponse(429, "TOO_MANY", message, details);
  }

  static _409(message: any, details = []) {
    return this.defineResponse(409, "CONFLICT", message, details);
  }

  static _404(message: any, details = []) {
    return this.defineResponse(404, "NOT_FOUND", message, details);
  }
  static _500(message: any, details = []) {
    return this.defineResponse(500, "INTERNAL_SERVER_ERROR", message, details);
  }
  static _custom(statusCode = 400, code, message = {}) {
    return this.defineResponse(statusCode, code, message);
  }
}
