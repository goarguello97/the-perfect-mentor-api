import { NextFunction, Request, Response } from 'express';

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user)
    return res.status(401).json({
      error: true,
      message: 'No autenticado.',
    });

  if (req.user.role !== 'ADMIN')
    return res.status(403).json({
      error: true,
      message: 'Acceso denegado: Se requiere rol de administrador.',
    });

  next();
};
