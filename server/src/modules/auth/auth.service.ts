import bcrypt from "bcrypt";
import { prisma } from "../../config/db";

interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
}

const registerUser = async (payload: RegisterUserPayload) => {
  const { name, email, password } = payload;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

export const AuthService = {
  registerUser,
};
