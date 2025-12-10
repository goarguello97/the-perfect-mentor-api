import MatchController from "@controllers/MatchController";
import { Router } from "express";

const matchRouter = Router();

matchRouter.post("/send", MatchController.match);
matchRouter.post("/response", MatchController.responseMatch);

export default matchRouter;
