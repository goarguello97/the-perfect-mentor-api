import MdService from "@services/MdService";
import { Request, Response } from "express";

class MdController {
  static async sendMessage(req: Request, res: Response) {
    const { receiverId, senderId, content } = req.body;

    const { error, data } = await MdService.sendMessage({
      receiverId,
      senderId,
      content,
    });

    if (error) return res.status(404).json(data);

    return res.status(201).json(data);
  }

  static async getUserMessages(req: Request, res: Response) {
    const { userId } = req.params;

    const { error, data } = await MdService.getUserMessages({ userId: userId as string })
         
    if (error) return res.status(404).json(data);

    return res.status(200).json(data);
  }

  static async getMessages(req: Request, res: Response) {
    const { receiverId, senderId } = req.query;

    const { error, data } = await MdService.getMessages({
      receiverId: receiverId as string,
      senderId: senderId as string,
    });

    if (error) return res.status(404).json(data);

    return res.status(200).json(data);
  }
}

export default MdController;
