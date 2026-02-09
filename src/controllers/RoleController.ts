import RoleService from '@services/RoleService';
import { Request, Response } from 'express';

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Operaciones de gestión de roles
 */
class RoleController {
  /**
   * @swagger
   * /roles:
   *   get:
   *     summary: Obtener todos los roles
   *     tags: [Roles]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de roles obtenida exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Role'
   *       401:
   *         description: No autorizado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorAuth'
   *       400:
   *         description: Solicitud incorrecta
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  static async getRoles(req: Request, res: Response) {
    const { error, data } = await RoleService.getRoles();

    if (error) return res.status(400).json(error);

    res.status(200).json(data);
  }
}

export default RoleController;
