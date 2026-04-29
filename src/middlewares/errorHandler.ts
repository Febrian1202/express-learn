import { Request, Response, NextFunction } from "express";

export const globalErrorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[Global Error]:", err.stack);

  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada internal server",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
};
