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
}

export default MdController;
