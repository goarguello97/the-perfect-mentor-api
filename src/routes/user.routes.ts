import UserController from "@controllers/UserController";
import { Router } from "express";
const userRouter = Router();

userRouter.get("/", UserController.getUsers);
userRouter.post("/", UserController.addUser);
userRouter.get("/:id", UserController.getUserById);
userRouter.put("/:id", UserController.putUser);
userRouter.delete("/:id", UserController.deleteUser);
userRouter.get("/activate/:id", UserController.activateUser);

export default userRouter;
