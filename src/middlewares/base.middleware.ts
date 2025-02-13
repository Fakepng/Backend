import type { Request, Response, NextFunction } from "express";

async function baseMiddleware(req: Request, res: Response, next: NextFunction) {
  if (process.env.NODE_ENV !== "production") {
    console.log("Development mode");

    return next();
  }

  next();
}

export default baseMiddleware;
