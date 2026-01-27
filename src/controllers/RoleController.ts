import RoleService from '@services/RoleService';
import { Request, Response } from 'express';

class RoleController {
  static async getRoles(req: Request, res: Response) {
    const { error, data } = await RoleService.getRoles();

    if (error) return res.status(400).json(error);

    res.status(200).json(data);
  }
}

export default RoleController;
