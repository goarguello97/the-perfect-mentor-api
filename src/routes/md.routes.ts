import MdController from "@controllers/MdController";
import { Router } from "express";

const mdRouter = Router();

mdRouter.post("/", MdController.sendMessage);

export default mdRouter;
