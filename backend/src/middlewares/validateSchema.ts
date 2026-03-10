import {z} from 'zod';
import {Request, Response, NextFunction} from 'express';

export const validateBody = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction ) => {
        const result = schema.safeParse(req.body);
        console.log(result);
        if(!result.success){
            return res.status(400).json ({message: 'Validation failed'});
        }
        return next();
    };
};