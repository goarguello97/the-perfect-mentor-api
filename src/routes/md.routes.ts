import MdController from '@controllers/MdController';
import { Router } from 'express';
import isAuth from '../middlewares/isAuth';

const mdRouter = Router();

mdRouter.post('/', isAuth, MdController.sendMessage);
mdRouter.get('/', isAuth, MdController.getMessages);
mdRouter.get('/:userId', isAuth, MdController.getUserMessages);

export default mdRouter;
