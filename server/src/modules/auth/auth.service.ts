import bcrypt from "bcrypt";
import { prisma } from "../../config/db";
import { generateToken } from "../../utils/jwt";

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

const loginUser = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error("Invalid credentials");
  }

  // Generate token
  const token = generateToken({
    id: user.id,
    email: user.email,
  });

  const { password: _, ...userWithoutPassword } = user;

  return {
    token,
    user: userWithoutPassword,
  };
};

export const AuthService = {
  registerUser,
  loginUser,
};
