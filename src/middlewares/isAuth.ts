import Role from "@models/Role";
import User from "@models/User";
import { NextFunction, Request, Response } from "express";
import * as admin from "firebase-admin";

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: true,
      message: "Acceso denegado: Token no proporcionado o incorrecto.",
    });
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    const id = decodedToken.uid;

    const user = await User.findById(id).populate("role", { role: 1 });

    if (!user)
      return res.status(401).json({
        error: true,
        message: "Acceso denegado: Token no proporcionado o incorrecto.",
      });

    const role = await Role.findById(user.role);

    if (!role)
      return res.status(401).json({
        error: true,
        message: "Acceso denegado.",
      });

    req.user = {
      id: decodedToken.uid,
      role: role.role,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      error: true,
      message: "Token inválido o expirado.",
    });
  }
};
