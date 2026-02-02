import { Schema } from 'express-validator';

const responseMatchSchema: Schema = {
  receiverId: {
    notEmpty: { errorMessage: 'El id del receptor es requerido' },
    isMongoId: { errorMessage: 'El id del receptor no es válido' },
  },
  senderId: {
    notEmpty: { errorMessage: 'El id del remitente es requerido' },
    isMongoId: { errorMessage: 'El id del remitente no es válido' },
  },
  response: {
    notEmpty: { errorMessage: 'La respuesta es requerida' },
    isBoolean: { errorMessage: 'La respuesta no es válida' },
  },
};

export default responseMatchSchema;
