import { Request, Response } from "express";

const registerUser = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Register route is working",
  });
};

export const AuthController = {
  registerUser,
};