import UserController from "@controllers/UserController";
import validateFields from "@helpers/validateFields";
import { isAdmin } from "@middlewares/isAdmin";
import { isAuth } from "@middlewares/isAuth";
import UserSchema from "@schemas/UserSchema";
import { Router } from "express";
import { checkSchema } from "express-validator";
import multer from "multer";
const userRouter = Router();

userRouter.get("/", isAuth, UserController.getUsers);
userRouter.post(
  "/",
  checkSchema(UserSchema),
  validateFields,
  UserController.addUser
);
userRouter.get("/:id", isAuth, UserController.getUserById);
userRouter.put("/:id", isAuth, UserController.putUser);
userRouter.delete("/:id", isAdmin, UserController.deleteUser);
userRouter.get("/activate/:id", UserController.activateUser);
userRouter.patch(
  "/add/avatar",
  isAuth,
  multer({ storage: multer.memoryStorage() }).single("image"),
  UserController.addAvatar
);

export default userRouter;
