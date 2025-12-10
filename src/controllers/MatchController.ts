import MatchService from "@services/MatchService";
import { Request, Response } from "express";

class MatchController {
  static async match(req: Request, res: Response) {
    const { idUser, idUserToMatch } = req.body;

    const { error, data } = await MatchService.match(idUser, idUserToMatch);

    if (error) return res.status(404).json(data);

    return res.status(200).json(data);
  }

  static async responseMatch(req: Request, res: Response) {
    const { idReceivingUser, response } = req.body;

    const { error, data } = await MatchService.responseMatch(
      idReceivingUser,
      response
    );
    if (error) return res.status(404).json(data);

    return res.status(200).json(data);
  }
}
export default MatchController;
