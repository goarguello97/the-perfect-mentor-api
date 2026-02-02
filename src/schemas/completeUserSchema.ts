import { Schema } from 'express-validator';
import checkEmailExists from '../helpers/checkEmailExists';

const completeUserSchema: Schema = {
  name: {
    notEmpty: { errorMessage: 'El nombre es requerido' },
    isLength: {
      errorMessage: 'Mínimo 3 caracteres y maximo 30 caracteres',
      options: { min: 3, max: 30 },
    },
  },
  lastname: {
    notEmpty: { errorMessage: 'El apellido es requerido' },
    isLength: {
      errorMessage: 'Mínimo 3 caracteres y maximo 30 caracteres',
      options: { min: 3, max: 30 },
    },
  },
  date: {
    notEmpty: { errorMessage: 'La fecha de nacimiento es requerida' },
    isLength: {
      errorMessage: 'Mínimo 3 caracteres y maximo 30 caracteres',
      options: { min: 3, max: 30 },
    },
  },
  email: {
    notEmpty: { errorMessage: 'El email es requerido' },
    isEmail: { errorMessage: 'Ingrese un email válido' },
    isLength: {
      errorMessage: 'Mínimo 3 caracteres y maximo 30 caracteres',
      options: { min: 3, max: 30 },
    },
    optional: true,
    custom: { options: checkEmailExists },
  },
  role: {
    notEmpty: { errorMessage: 'El rol es requerido' },
  },
};

export default completeUserSchema;
