import { Schema } from 'express-validator';

const addUserSchema: Schema = {
  username: {
    notEmpty: { errorMessage: 'El nombre de usuario es requerido' },
    isLength: {
      errorMessage: 'Mínimo 3 caracteres y maximo 30 caracteres',
      options: { min: 3, max: 30 },
    },
  },
  email: {
    notEmpty: { errorMessage: 'El email es requerido' },
    isEmail: { errorMessage: 'Ingrese un email válido' },
  },
};

export default addUserSchema;
