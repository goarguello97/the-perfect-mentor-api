import ReportService from '@services/ReportService';
import { Request, Response } from 'express';

class ReportController {
  static async getReports(req: Request, res: Response) {
    const { token } = req.params;
    const { page = '1', search, isScrolling } = req.query;

    const { error, data } = await ReportService.getReports({
      token,
      page: page.toString(),
      search: search?.toString(),
      isScrolling,
    });

    if (error) return res.status(400).json(data);

    return res.status(200).json(data);
  }

  static async getReport(req: Request, res: Response) {
    const { id } = req.params;
    const { error, data } = await ReportService.getReport({ id });
    if (error) return res.status(400).json(data);

    return res.status(200).json(data);
  }

  static async addReport(req: Request, res: Response) {
    const { senderId, receiverId, content, subject } = req.body;

    const { error, data } = await ReportService.addReport({
      senderId,
      receiverId,
      content,
      subject,
    });

    if (error) return res.status(400).json(data);
    return res.status(200).json(data);
  }

  static async putReport(req: Request, res: Response) {
    const { reportId } = req.params;
    const { senderId, receiverId, content, status } = req.body;

    const { error, data } = await ReportService.putReport({
      _id: reportId,
      senderId,
      receiverId,
      content,
      status,
    });

    if (error) return res.status(400).json(data);

    return res.status(200).json(data);
  }

  static async answerReport(req: Request, res: Response) {
    const { reportId } = req.params;
    const { error, data } = await ReportService.answerReport({ _id: reportId });

    if (error) return res.status(400).json(data);

    return res.status(200).json(data);
  }

  static async addReportMessage(req: Request, res: Response) {
    const { reportId, authorId, content } = req.body;

    const { error, data } = await ReportService.addReportMessage({
      reportId,
      authorId,
      content,
    });

    if (error) return res.status(400).json(data);

    return res.status(200).json(data);
  }
}

export default ReportController;
