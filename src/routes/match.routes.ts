import { Router } from "express";
import MatchController from "src/controllers/MatchController";

const matchRouter = Router();

matchRouter.post("/send", MatchController.match);
matchRouter.post("/response", MatchController.responseMatch);

export default matchRouter;
