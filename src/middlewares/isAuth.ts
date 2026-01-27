import User from '@models/User';
import { NextFunction, Request, Response } from 'express';
import { validateToken } from '../config/token';

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: true,
      message: 'Acceso denegado: Token no proporcionado o incorrecto.',
    });
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = validateToken(token);

    const { email } = decodedToken.user;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({
        error: true,
        message: 'Acceso denegado: Token no proporcionado o incorrecto.',
      });

    req.user = { email };

    next();
  } catch (error) {
    return res.status(401).json({
      error: true,
      message: 'Token inválido o expirado.',
    });
  }
};
