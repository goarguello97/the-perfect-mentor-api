import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const SECRET = process.env.SECRET as string;

export function generateTokenRegister(payload: { email: string }) {
  const token = jwt.sign({ user: payload }, SECRET, { expiresIn: "1h" });
  return token;
}

export function validateToken(token: string) {
  return jwt.verify(token, SECRET);
}
