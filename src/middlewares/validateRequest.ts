import { Request, Response, NextFunction } from "express";
import { z } from "zod";

// Gunakan z.ZodSchema<any> untuk menghindari error <unknown>
export const validateData = (schema: z.ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction): void => {

    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Validasi data gagal!",
        // Gunakan .issues alih-alih .errors
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
      return;
    }

    req.body = result.data;

    next();
  };
};

