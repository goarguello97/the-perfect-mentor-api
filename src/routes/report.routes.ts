import ReportController from '@controllers/ReportController';
import { Router } from 'express';
import isAuth from '../middlewares/isAuth';
import { checkSchema } from 'express-validator';
import addReportSchema from '../schemas/addReportSchema';
import addReportMessageSchema from '../schemas/addReportMessageSchema';

const reportRouter = Router();

reportRouter.get('/:token', isAuth, ReportController.getReports);
reportRouter.get('/report/:id', isAuth, ReportController.getReport);
reportRouter.post(
  '/',
  isAuth,
  checkSchema(addReportSchema),
  ReportController.addReport,
);
reportRouter.post(
  '/message',
  isAuth,
  checkSchema(addReportMessageSchema),
  ReportController.addReportMessage,
);
reportRouter.put('/:reportId', isAuth, ReportController.putReport);
reportRouter.patch('/:reportId', isAuth, ReportController.answerReport);

export default reportRouter;
