import ReportController from "@controllers/ReportController";
import { Router } from "express";

const reportRouter = Router();

reportRouter.get("/:token", ReportController.getReports)
reportRouter.get("/report/:id", ReportController.getReport)
reportRouter.post("/", ReportController.addReport)
reportRouter.put("/:reportId", ReportController.putReport)
reportRouter.patch("/:reportId", ReportController.answerReport)

export default reportRouter;