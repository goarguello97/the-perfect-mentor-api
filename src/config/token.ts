import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const SECRET = process.env.SECRET as string;

interface TokenPayload {
  user: { email: string };
}

export function generateTokenRegister(payload: { email: string }) {
  const token = jwt.sign({ user: payload }, SECRET, { expiresIn: '1h' });
  return token;
}

export function generateTokenRecoverPassword(payload: { email: string }) {
  const token = jwt.sign({ user: payload }, SECRET, { expiresIn: '10h' });
  return token;
}

export function validateToken(token: string): TokenPayload {
  return jwt.verify(token, SECRET) as TokenPayload;
}
