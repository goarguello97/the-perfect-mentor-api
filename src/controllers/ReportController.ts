import ReportService from "@services/ReportService";
import { Request, Response } from "express";

class ReportController{

    static async getReports(req: Request, res: Response) {        
        const { token } = req.params;
        const { error, data } = await ReportService.getReports({token})
        
        if (error) return res.status(400).json(data)
        
        return res.status(200).json(data)
    }

    static async addReport(req: Request, res: Response) {
        const { senderId, receiverId, content, issue } = req.body

        const { error, data } = await ReportService.addReport({senderId, receiverId, content, issue})
        
        if (error) return res.status(400).json(data)
        return res.status(200).json(data)
    }

    static async putReport(req: Request, res: Response) {
        const { reportId } = req.params
        const { senderId, receiverId, content , answered} = req.body

        const { error, data } = await ReportService.putReport({_id: reportId, senderId, receiverId, content , answered})
        
        if (error) return res.status(400).json(data)
        
        return res.status(200).json(data)
    }

    static async answerReport(req: Request, res: Response) {
        const { reportId } = req.params
        const { error, data } = await ReportService.answerReport({ _id: reportId })
        
        if (error) return res.status(400).json(data)
        
        return res.status(200).json(data)
    }


}

export default ReportController