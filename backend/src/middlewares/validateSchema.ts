import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ValidationError } from '../errors/AppError';

export const validateBody = (schema: z.ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(
        new ValidationError(
          `Body validation failed: ${result.error.message.toString()}`
        )
      );
    }
    req.body = result.data;
    return next();
  };
};

export const validateParams = (schema: z.ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      return next(
        new ValidationError(
          `Params validation failed: ${result.error.message.toString()}`
        )
      );
    }
    req.params = result.data as Request['params'];
    return next();
  };
};
