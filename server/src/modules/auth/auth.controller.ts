import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const registerUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.registerUser(req.body);

    res.status(200).json({
      success: true,
      message: "User registered successfully.",
      data: result,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    res.status(400).json({
      success: false,
      message,
    });
  }
};

export const AuthController = {
  registerUser,
};
