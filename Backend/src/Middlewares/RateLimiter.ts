import { NextFunction, Request, Response } from "express";
import rateLimit from "../Config/Upstash";

const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const identifier =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress || "anonymous";
    const { success } = await rateLimit.limit(identifier as string);

    if (!success)
      return res
        .status(429)
        .json({ message: "Too many requests Please try again later." });

    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;
