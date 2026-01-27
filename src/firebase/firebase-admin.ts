import dotenv from 'dotenv';
import * as admin from 'firebase-admin';
dotenv.config();

import serviceAccount from '../../config/serviceAccountKey.json';

const databaseURL = process.env.FIREBASE_DATABASE_URL;

if (!databaseURL)
  throw new Error(
    'La variable de entorno FIREBASE_DATABASE_URL no está definida.',
  );

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL,
});

export default admin;
