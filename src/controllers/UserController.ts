import UserService from "@services/UserService";
import { Request, Response } from "express";

class UserController {
  static async getUsers(_: Request, res: Response) {
    const { error, data } = await UserService.getUsers();

    if (error) return res.status(400).json(error);

    res.status(200).json(data);
  }

  static async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const { error, data } = await UserService.getUserById(id);
    if (error) return res.status(404).json(data);

    res.status(200).json(data);
  }

  static async addUser(req: Request, res: Response) {
    const user = req.body;
    const { error, data } = await UserService.addUser(user);
    if (error) return res.status(409).json(data);
    console.log(error);
    console.log(data);
    res.status(201).json(data);
  }

  static async putUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = req.body;
    const { error, data } = await UserService.putUser(id, user);
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
    const { token } = req.params;

    const { error, data } = await UserService.activateUser(token);

    if (error) {
      return res.status(404).json(data);
    }

    return res.status(200).json(data);
  }

  static async addAvatar(req: Request, res: Response) {
    const file = req.file;
    const { id } = req.body;

    if (!file) throw new Error("No ingreso una foto.");

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
    const token = req.headers.authorization?.split(" ")[1];

    const { error, data } = await UserService.validationUser(token);

    if (error) {
      return res.status(404).json(data);
    }

    return res.status(200).json(data);
  }
}

export default UserController;
