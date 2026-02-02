import { Schema } from 'express-validator';

const sendMatchSchema: Schema = {
  senderId: {
    notEmpty: { errorMessage: 'El id del remitente es requerido' },
    isMongoId: { errorMessage: 'El id del remitente no es válido' },
  },
  receiverId: {
    notEmpty: { errorMessage: 'El id del receptor es requerido' },
    isMongoId: { errorMessage: 'El id del receptor no es válido' },
  },
};

export default sendMatchSchema;
