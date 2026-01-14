import MatchService from "@services/MatchService";
import { Request, Response } from "express";

class MatchController {
  static async match(req: Request, res: Response) {
    const { senderId, receiverId } = req.body;
    const { error, data } = await MatchService.match({
      senderId,
      receiverId,
    });

    if (error) return res.status(404).json(data);

    return res.status(200).json(data);
  }

  static async responseMatch(req: Request, res: Response) {
    const { receiverId } = req.params;
    const { senderId, response } = req.body;

    const { error, data } = await MatchService.responseMatch({
      receiverId,
      senderId,
      response,
    });

    if (error) return res.status(404).json(data);

    return res.status(200).json(data);
  }

  static async getMatches(req: Request, res: Response) {
    const { token } = req.params;
    const { error, data } = await MatchService.getMatches({ token });

    if (error) return res.status(404).json(data);

    return res.status(200).json(data);
  }

  static async getMatchesRequest(req: Request, res: Response) {
    const { token } = req.params;
    const { error, data } = await MatchService.getMatchesRequest({ token });

    if (error) return res.status(404).json(data);

    return res.status(200).json(data);
  }
}
export default MatchController;
