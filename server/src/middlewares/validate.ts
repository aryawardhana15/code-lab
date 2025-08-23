import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodArray, ZodSchema } from 'zod';

export const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    if (schema instanceof ZodArray) {
      schema.parse(req.body);
    } else if (schema instanceof ZodObject) {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
    } else {
      // Fallback for other Zod schema types if needed, or throw an error
      schema.parse(req.body); // Assuming other schemas might parse the body directly
    }
    next();
  } catch (e: any) {
    return res.status(400).send(e.errors);
  }
};
