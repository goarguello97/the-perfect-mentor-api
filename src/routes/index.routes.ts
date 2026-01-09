import { Router } from "express";
import matchRouter from "./match.routes";
import roleRouter from "./role.routes";
import userRouter from "./user.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/match", matchRouter);
router.use("/roles", roleRouter);

export default router;
