/// <reference types="../types/express" />
import UserService from '@services/UserService';
import { Request, Response } from 'express';

class UserController {
  static async getUsers(req: Request, res: Response) {
    const { query } = req;
    const { error, data } = await UserService.getUsers(query);

    if (error) return res.status(400).json(error);

    res.status(200).json(data);
  }

  static async getUserPerMonth(_: Request, res: Response) {
    const { error, data } = await UserService.getUserPerMonth();

    if (error) return res.status(400).json(error);

    res.status(200).json(data);
  }

  static async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const { error, data } = await UserService.getUserById({ id });
    if (error) return res.status(404).json(data);

    res.status(200).json(data);
  }

  static async addUser(req: Request, res: Response) {
    const user = req.body;
    const { error, data } = await UserService.addUser(user);
    if (error) return res.status(409).json(data);
    res.status(201).json(data);
  }

  static async putUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = req.body;
    const { error, data } = await UserService.putUser({ ...user, id });
    if (error) return res.status(404).json(data);

    return res.status(200).json(data);
  }

  static async deleteUser(req: Request, res: Response) {
    const { id } = req.body;

    const { error, data } = await UserService.deleteUser(id);
    if (error) return res.status(404).json(data);

    return res.status(200).json(data);
  }

  static async activateUser(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1];

    const { error, data } = await UserService.activateUser(token);
    if (error) {
      return res.status(404).json(data);
    }

    return res.status(200).json(data);
  }

  static async addAvatar(req: Request, res: Response) {
    const file = req.file;
    const { id } = req.body;
    if (!file)
      return res.status(404).json({ message: 'No ingreso una imagen' });

    const { error, data } = await UserService.addAvatar(file, id);

    if (error) {
      return res.status(404).json(data);
    }

    return res.status(200).json(data);
  }

  static async loginUser(req: Request, res: Response) {
    const user = req.body;

    const { error, data } = await UserService.loginUser(user);
    if (error) {
      return res.status(404).json(data);
    }

    return res.status(200).json(data);
  }

  static async validationUser(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1];

    const { error, data } = await UserService.validationUser(token);

    if (error) {
      return res.status(404).json(data);
    }

    return res.status(200).json(data);
  }

  static async recoverPassword(req: Request, res: Response) {
    const { email } = req.body;

    const { error, data } = await UserService.recoverPassword(email);

    if (error) {
      return res.status(404).json(data);
    }

    return res.status(200).json(data);
  }

  static async updatePassword(req: Request, res: Response) {
    const { password } = req.body;

    if (!req.user) {
      return res.status(401).json({
        error: true,
        message: 'Usuario no autenticado.',
      });
    }

    const email = req.user.email;

    const { error, data } = await UserService.updatePassword(email, password);

    if (error) {
      return res.status(404).json(data);
    }

    return res.status(200).json(data);
  }
}

export default UserController;
