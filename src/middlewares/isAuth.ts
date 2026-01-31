import { NextFunction, Response, Request } from 'express';
import admin from '../firebase/firebase-admin';

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ error: 'No autorizado. Formato de token inválido' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken, true);

    if (!decodedToken.email)
      return res.status(401).json({ error: 'Email inválido' });

    req.user = {
      email: decodedToken.email,
    };

    next();
  } catch (error: any) {
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ error: 'El token ha expirado.' });
    }

    return res.status(403).json({ error: 'Token inválido o no autorizado.' });
  }
};

export default isAuth;
