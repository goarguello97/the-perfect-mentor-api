import MatchController from "@controllers/MatchController";
import { Router } from "express";

const matchRouter = Router();

matchRouter.post("/", MatchController.match);
matchRouter.patch("/:receiverId", MatchController.responseMatch);
matchRouter.get("/:token", MatchController.getMatches);
matchRouter.get("/req/:token", MatchController.getMatchesRequest);

export default matchRouter;
