import RoleController from '@controllers/RoleController';
import { Router } from 'express';

const roleRouter = Router();

roleRouter.get('/', RoleController.getRoles);

export default roleRouter;
