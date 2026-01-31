import MatchController from '@controllers/MatchController';
import { Router } from 'express';
import isAuth from '../middlewares/isAuth';

const matchRouter = Router();

matchRouter.post('/', isAuth, MatchController.match);
matchRouter.patch('/:receiverId', isAuth, MatchController.responseMatch);
matchRouter.get('/:token', isAuth, MatchController.getMatches);
matchRouter.get('/req/:token', isAuth, MatchController.getMatchesRequest);

export default matchRouter;
