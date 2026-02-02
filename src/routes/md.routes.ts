import MdController from '@controllers/MdController';
import { Router } from 'express';
import isAuth from '../middlewares/isAuth';
import { checkSchema } from 'express-validator';
import sendMessageSchema from '../schemas/sendMessageSchema';

const mdRouter = Router();

mdRouter.post(
  '/',
  isAuth,
  checkSchema(sendMessageSchema),
  MdController.sendMessage,
);
mdRouter.get('/', isAuth, MdController.getMessages);
mdRouter.get('/:userId', isAuth, MdController.getUserMessages);

export default mdRouter;
