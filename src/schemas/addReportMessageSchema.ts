import { Schema } from 'express-validator';

const addReportMessageSchema: Schema = {
  authorId: {
    notEmpty: { errorMessage: 'El id del autor es requerido' },
    isMongoId: { errorMessage: 'El id del autor no es válido' },
  },
  reportId: {
    notEmpty: { errorMessage: 'El id del reporte es requerido' },
    isMongoId: { errorMessage: 'El id del reporte no es válido' },
  },
  content: {
    notEmpty: { errorMessage: 'El contenido es requerido' },
    isString: { errorMessage: 'El contenido no es válido' },
  },
};

export default addReportMessageSchema;
