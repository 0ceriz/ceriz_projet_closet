import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // 1 - Check if the error is an instance of AppError (Log error details and send public message)
  if (err instanceof AppError) {
    console.error(`[AppError ${err.statusCode}] ${err.internalMessage}`);
    return res.status(err.statusCode).json({
      message: err.publicMessage,
    });
  }

  // 2 - For any other unhandled errors, log the details and return a generic 500 response
  console.error(`[UnhandledError 500] ${err.message} \nStack: ${err.stack}`);
  return res.status(500).json({
    message: 'An unexpected error occurred.',
  });
};

export default errorHandler;
