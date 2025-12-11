import { Schema } from "express-validator";

const UserSchema: Schema = {
  username: {
    optional: { options: { checkFalsy: true } },
    isLength: {
      errorMessage: "Minimo 5 caracteres y máximo 30 caracteres.",
      options: { min: 5, max: 30 },
    },
  },
  name: {
    optional: { options: { checkFalsy: true } },
    isLength: {
      errorMessage: "Minimo 3 caracteres y máximo 30 caracteres.",
      options: { min: 3, max: 30 },
    },
  },
  lastname: {
    optional: { options: { checkFalsy: true } },
    isLength: {
      errorMessage: "Minimo 3 caracteres y máximo 30 caracteres.",
      options: { min: 3, max: 30 },
    },
  },
  country: {
    optional: { options: { checkFalsy: true } },
    isLength: {
      errorMessage: "Minimo 3 caracteres y máximo 30 caracteres.",
      options: { min: 3, max: 30 },
    },
  },
  date: {
    optional: { options: { checkFalsy: true } },
    isDate: { errorMessage: "Ingrese una fecha válida." },
  },
  email: {
    notEmpty: { errorMessage: "El correo electrónico es obligatorio." },
    isEmail: { errorMessage: "Ingrese un correo electrónico válido." },
  },
  skills: {
    optional: { options: { checkFalsy: true } },
    isArray: { errorMessage: "Introduzca los datos correctamente." },
  },
};

export default UserSchema;
