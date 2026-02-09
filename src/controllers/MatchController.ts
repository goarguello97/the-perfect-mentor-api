import MatchService from '@services/MatchService';
import { Request, Response } from 'express';

/**
 * @swagger
 * tags:
 *   name: Matches
 *   description: Operaciones de matching y conexión entre usuarios
 */
class MatchController {
  /**
   * @swagger
   * /matches:
   *   post:
   *     summary: Crear una solicitud de match
   *     tags: [Matches]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - senderId
   *               - receiverId
   *             properties:
   *               senderId:
   *                 type: string
   *                 description: ID del usuario que envía la solicitud de match
   *               receiverId:
   *                 type: string
   *                 description: ID del usuario que recibe la solicitud de match
   *     responses:
   *       200:
   *         description: Solicitud de match creada exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Match'
   *       401:
   *         description: No autorizado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorAuth'
   *       404:
   *         description: Usuario no encontrado o match fallido
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  static async match(req: Request, res: Response) {
    const { senderId, receiverId } = req.body;
    const { error, data } = await MatchService.match({
      senderId,
      receiverId,
    });

    if (error) return res.status(404).json(data);

    return res.status(200).json(data);
  }

  /**
   * @swagger
   * /matches/{receiverId}:
   *   patch:
   *     summary: Responder a una solicitud de match
   *     tags: [Matches]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: receiverId
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del usuario que responde al match
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - senderId
   *               - response
   *             properties:
   *               senderId:
   *                 type: string
   *                 description: ID del usuario que envió la solicitud de match
   *               response:
   *                 type: boolean
   *                 description: Respuesta a la solicitud de match (true para aceptar, false para rechazar)
   *     responses:
   *       200:
   *         description: Respuesta de match procesada exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Match'
   *       401:
   *         description: No autorizado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorAuth'
   *       404:
   *         description: Match no encontrado o respuesta fallida
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
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

  /**
   * @swagger
   * /matches/{id}:
   *   get:
   *     summary: Obtener todos los matches de un usuario
   *     tags: [Matches]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Id del usuario
   *     responses:
   *       200:
   *         description: Matches obtenidos exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Match'
   *       401:
   *         description: No autorizado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorAuth'
   *       404:
   *         description: No se encontraron matches o token inválido
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  static async getMatches(req: Request, res: Response) {
    const { id } = req.params;
    const { error, data } = await MatchService.getMatches({ id });

    if (error) return res.status(404).json(data);

    return res.status(200).json(data);
  }

  /**
   * @swagger
   * /matches/req/{id}:
   *   get:
   *     summary: Obtener solicitudes de match pendientes de un usuario
   *     tags: [Matches]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Id del usuario
   *     responses:
   *       200:
   *         description: Solicitudes de match obtenidas exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/MatchesResponse'
   *       401:
   *         description: No autorizado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorAuth'
   *       404:
   *         description: No se encontraron solicitudes de match o token inválido
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  static async getMatchesRequest(req: Request, res: Response) {
    const { id } = req.params;
    const { error, data } = await MatchService.getMatchesRequest({ id });

    if (error) return res.status(404).json(data);

    return res.status(200).json(data);
  }
}
export default MatchController;
