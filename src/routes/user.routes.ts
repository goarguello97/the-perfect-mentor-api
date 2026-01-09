import UserController from "@controllers/UserController";
import { Router } from "express";
import multer from "multer";
import { isAuth } from "src/middlewares/isAuth";
const userRouter = Router();

userRouter.get("/", UserController.getUsers);
userRouter.get("/stats/info", UserController.getUserPerMonth);
userRouter.post("/", UserController.addUser);
userRouter.post("/login", UserController.loginUser);
userRouter.get("/:id", UserController.getUserById);
userRouter.put("/:id", UserController.putUser);
userRouter.delete("/:id", UserController.deleteUser);
userRouter.get("/auth/activate", UserController.activateUser);
userRouter.patch(
  "/add/avatar",
  multer({ storage: multer.memoryStorage() }).single("image"),
  UserController.addAvatar
);
userRouter.get("/auth/validate", UserController.validationUser);
userRouter.post("/recover-password", UserController.recoverPassword);
userRouter.put("/update/password", isAuth, UserController.updatePassword);

export default userRouter;
