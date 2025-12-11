import MatchController from "@controllers/MatchController";
import { isAuth } from "@middlewares/isAuth";
import { Router } from "express";

const matchRouter = Router();

matchRouter.post("/send", isAuth, MatchController.match);
matchRouter.post("/response", isAuth, MatchController.responseMatch);

export default matchRouter;
