import { Router } from "express";
import matchRouter from "./match.routes";
import mdRouter from "./md.routes";
import reportRouter from "./report.routes";
import roleRouter from "./role.routes";
import userRouter from "./user.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/matches", matchRouter);
router.use("/roles", roleRouter);
router.use("/md", mdRouter);
router.use("/reports", reportRouter)

export default router;
