import UserController from "@controllers/UserController";
import { Router } from "express";
import multer from "multer";
const userRouter = Router();

userRouter.get("/", UserController.getUsers);
userRouter.post("/", UserController.addUser);
userRouter.post("/login", UserController.loginUser);
userRouter.get("/:id", UserController.getUserById);
userRouter.put("/:id", UserController.putUser);
userRouter.delete("/:id", UserController.deleteUser);
userRouter.get("/activate/:id", UserController.activateUser);
userRouter.patch(
  "/add/avatar",
  multer({ storage: multer.memoryStorage() }).single("image"),
  UserController.addAvatar
);

export default userRouter;
