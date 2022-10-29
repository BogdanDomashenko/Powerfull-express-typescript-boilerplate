import { StatusCodes } from "http-status-codes";

export class Exception extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }

  static badRequest(message: string) {
    return new Exception(StatusCodes.BAD_REQUEST, message);
  }

  static unauthorized(message: string) {
    return new Exception(StatusCodes.UNAUTHORIZED, message);
  }

  static forbidden(message: string) {
    return new Exception(StatusCodes.FORBIDDEN, message);
  }

  static notFound(message: string) {
    return new Exception(StatusCodes.NOT_FOUND, message);
  }

  static conflict(message: string) {
    return new Exception(StatusCodes.CONFLICT, message);
  }

  static gone(message: string) {
    return new Exception(StatusCodes.GONE, message);
  }

  static internal(message: string) {
    return new Exception(StatusCodes.INTERNAL_SERVER_ERROR, message);
  }
}
