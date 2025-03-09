import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';


export const validate = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const validation = schema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({ message: "Dados inválidos", errors: validation.error.errors });
      return;
    }

    next(); 
  };
};
