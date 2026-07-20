import jwt from "jsonwebtoken";

const generateToken = (payload: object) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });

  return token;
};

const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};

export { generateToken, verifyToken };
