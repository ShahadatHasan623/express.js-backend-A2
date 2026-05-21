
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const decoded = jwt.verify(
      token,
      config.JWT_TOKEN as string
    );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default auth;