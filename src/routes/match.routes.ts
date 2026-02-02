import MatchController from '@controllers/MatchController';
import { Router } from 'express';
import isAuth from '../middlewares/isAuth';
import sendMatchSchema from '../schemas/sendMatchSchema';
import { checkSchema } from 'express-validator';
import responseMatchSchema from '../schemas/responseMatchSchema';

const matchRouter = Router();

matchRouter.post(
  '/',
  isAuth,
  checkSchema(sendMatchSchema),
  MatchController.match,
);
matchRouter.patch(
  '/:receiverId',
  isAuth,
  checkSchema(responseMatchSchema),
  MatchController.responseMatch,
);
matchRouter.get('/:token', isAuth, MatchController.getMatches);
matchRouter.get('/req/:token', isAuth, MatchController.getMatchesRequest);

export default matchRouter;
