import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const EMAIL = process.env.EMAIL as string;
const PASS = process.env.PASS as string;
const URL = process.env.URL as string;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: EMAIL,
    pass: PASS,
  },
});

const getTemplate = (token: string) => {
  return `
    <div id="email___content">
      <h2>¡Hola!</h2>
      <p>Gracias por registrarte. Debes activar tu cuenta ingresando al siguiente enlace.</p>
      <a
          href="${URL}/activate/${token}"
          target="_blank"
      >Confirmar cuenta</a>
    </div>`;
};

const getTemplateRecoverPassword = (username: string, token: string) => {
  return `
  <div id="email___content">
  <h2>¡Hola ${username}!</h2>
  <p>Entra al siguiente enlace para recuperar tu contraseña.</p>
  <a
      href="${URL}/change-password/${token}"
      target="_blank"
  >Cambiar contraseña</a>
</div>`;
};

export { getTemplate, getTemplateRecoverPassword, transporter };
