import ReportController from '@controllers/ReportController';
import { Router } from 'express';
import isAuth from '../middlewares/isAuth';

const reportRouter = Router();

reportRouter.get('/:token', isAuth, ReportController.getReports);
reportRouter.get('/report/:id', isAuth, ReportController.getReport);
reportRouter.post('/', isAuth, ReportController.addReport);
reportRouter.post('/message', isAuth, ReportController.addReportMessage);
reportRouter.put('/:reportId', isAuth, ReportController.putReport);
reportRouter.patch('/:reportId', isAuth, ReportController.answerReport);

export default reportRouter;
