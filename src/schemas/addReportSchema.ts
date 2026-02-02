import { Schema } from 'express-validator';

const addReportSchema: Schema = {
  senderId: {
    notEmpty: { errorMessage: 'El id del remitente es requerido' },
    isMongoId: { errorMessage: 'El id del remitente no es válido' },
  },
  receiverId: {
    notEmpty: { errorMessage: 'El id del receptor es requerido' },
    isMongoId: { errorMessage: 'El id del receptor no es válido' },
  },
  content: {
    notEmpty: { errorMessage: 'El contenido es requerido' },
    isString: { errorMessage: 'El contenido no es válido' },
    isLength: {
      errorMessage: 'Mínimo 10 caracteres y máximo 1000 caracteres',
      options: { min: 10, max: 1000 },
    },
  },
  subject: {
    notEmpty: { errorMessage: 'El asunto es requerido' },
    isString: { errorMessage: 'El asunto no es válido' },
    isLength: {
      errorMessage: 'Mínimo 10 caracteres y máximo 1000 caracteres',
      options: { min: 10, max: 1000 },
    },
  },
};

export default addReportSchema;
