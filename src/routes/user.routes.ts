import UserController from '@controllers/UserController';
import { Router } from 'express';
import uploadCloud from '../config/cloudinaryConfig';
import isAuthUpdatePassword from '../middlewares/isAuthUpdatePassword';
import isAuth from '../middlewares/isAuth';
import { checkSchema } from 'express-validator';
import addUserSchema from '../schemas/addUserSchema';
import completeUserSchema from '../schemas/completeUserSchema';

const userRouter = Router();

userRouter.get('/', isAuth, UserController.getUsers);
userRouter.get('/stats/info', isAuth, UserController.getUserPerMonth);
userRouter.post('/', checkSchema(addUserSchema), UserController.addUser);
userRouter.post('/login', UserController.loginUser);
userRouter.get('/:id', isAuth, UserController.getUserById);
userRouter.put(
  '/:id',
  isAuth,
  checkSchema(completeUserSchema),
  UserController.putUser,
);
userRouter.delete('/:id', isAuth, UserController.deleteUser);
userRouter.get('/auth/activate', UserController.activateUser);
userRouter.patch(
  '/add/avatar',
  isAuth,
  uploadCloud.single('image'),
  UserController.addAvatar,
);
userRouter.get('/auth/validate', isAuth, UserController.validationUser);
userRouter.post('/recover-password', UserController.recoverPassword);
userRouter.put(
  '/update/password',
  isAuthUpdatePassword,
  UserController.updatePassword,
);

export default userRouter;
