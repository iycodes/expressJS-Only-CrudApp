import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    const { statusCode, errors, shouldLog } = err;
    if (shouldLog) {
      console.error(
        JSON.stringify(
          {
            code: statusCode,
            errors,
            stack: err.stack,
          },
          null,
          2
        )
      );
    }
    return res.status(statusCode).send({ errors });
  }
  //Unhandled Errors
  console.error(JSON.stringify(err, null, 2));
  return res.status(500).send({ errors: [{ message: err.message }] });
};

export type CustomErrorType = {
  message: string;
  context?: {
    [key: string]: any;
  };
};

abstract class CustomError extends Error {
  abstract readonly statusCode: number;
  abstract readonly errors: CustomErrorType[];
  abstract readonly shouldLog: boolean;
  constructor(messsage: string) {
    super(messsage);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export class BadRequestError extends CustomError {
  private static readonly _statusCode = 400;
  private readonly _code: number;
  private readonly _shouldLog: boolean;
  private readonly _context: { [key: string]: any };

  constructor(params: myCustomErrorParams) {
    // adding the constructor params just incase i want to m whenever i call the instance of the class; in summary more flexibility
    super(params.message || "Bad request");
    this._code = params.code || BadRequestError._statusCode;
    this._context = params.context || {};
    this._shouldLog = params.shouldLog || false;

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  get errors() {
    return [{ message: this.message, context: this._context }];
  }

  get statusCode() {
    return this._code;
  }

  get shouldLog() {
    return this._shouldLog;
  }
}

export class NotFoundError extends CustomError {
  private static readonly _statusCode = 404;
  private readonly _code: number;
  private readonly _shouldLog: boolean;
  private readonly _context: { [key: string]: any };

  constructor(params: myCustomErrorParams) {
    // adding the constructor params just incase i want to m whenever i call the instance of the class; in summary more flexibility
    super(params.message || "Resource not Found");
    this._code = params.code || NotFoundError._statusCode;
    this._context = params.context || {};
    this._shouldLog = params.shouldLog || false;

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  get errors() {
    return [{ message: this.message, context: this._context }];
  }

  get statusCode() {
    return this._code;
  }

  get shouldLog() {
    return this._shouldLog;
  }
}

export class MyCustomError extends CustomError {
  // private static readonly _statusCode = 409;
  private readonly _code: number;
  private readonly _shouldLog: boolean;
  private readonly _context: { [key: string]: any };

  constructor(params: myCustomErrorParams2) {
    // adding the constructor params just incase i want to m whenever i call the instance of the class; in summary more flexibility
    super(params.message);
    this._code = params.code;
    this._context = params.context || {};
    this._shouldLog = params.shouldLog || false;

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, MyCustomError.prototype);
  }

  get errors() {
    return [{ message: this.message, context: this._context }];
  }

  get statusCode() {
    return this._code;
  }

  get shouldLog() {
    return this._shouldLog;
  }
}

interface myCustomErrorParams {
  code?: number;
  message?: string;
  shouldLog?: boolean;
  context?: { [key: string]: any };
}
interface myCustomErrorParams2 {
  code: number;
  message: string;
  shouldLog?: boolean;
  context?: { [key: string]: any };
}
