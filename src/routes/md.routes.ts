import MdController from '@controllers/MdController';
import { Router } from 'express';

const mdRouter = Router();

mdRouter.post('/', MdController.sendMessage);
mdRouter.get('/', MdController.getMessages);
mdRouter.get('/:userId', MdController.getUserMessages);

export default mdRouter;
