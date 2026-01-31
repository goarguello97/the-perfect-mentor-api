import RoleController from '@controllers/RoleController';
import { Router } from 'express';
import isAuth from '../middlewares/isAuth';

const roleRouter = Router();

roleRouter.get('/', isAuth, RoleController.getRoles);

export default roleRouter;
