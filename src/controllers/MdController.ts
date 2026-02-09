import MdService from '@services/MdService';
import { Request, Response } from 'express';

/**
 * @swagger
 * tags:
 *   name: Mensajes
 *   description: Operaciones de mensajería directa entre usuarios
 */
class MdController {
  /**
   * @swagger
   * /md:
   *   post:
   *     summary: Enviar un mensaje directo
   *     tags: [Mensajes]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - receiverId
   *               - senderId
   *               - content
   *             properties:
   *               receiverId:
   *                 type: string
   *                 description: ID del destinatario del mensaje
   *               senderId:
   *                 type: string
   *                 description: ID del remitente del mensaje
   *               content:
   *                 type: string
   *                 description: Contenido del mensaje
   *     responses:
   *       201:
   *         description: Mensaje enviado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Message'
   *       401:
   *         description: No autorizado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorAuth'
   *       404:
   *         description: Usuario no encontrado o mensaje fallido
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
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

  /**
   * @swagger
   * /md/{userId}:
   *   get:
   *     summary: Obtener todos los mensajes de un usuario
   *     tags: [Mensajes]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del usuario para obtener mensajes
   *     responses:
   *       200:
   *         description: Mensajes de usuario obtenidos exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/ChatItem'
   *       401:
   *         description: No autorizado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorAuth'
   *       404:
   *         description: Usuario no encontrado o sin mensajes
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  static async getUserMessages(req: Request, res: Response) {
    const { userId } = req.params;

    const { error, data } = await MdService.getUserMessages({
      userId: userId as string,
    });

    if (error) return res.status(404).json(data);

    return res.status(200).json(data);
  }

  /**
   * @swagger
   * /md:
   *   get:
   *     summary: Obtener conversación entre dos usuarios
   *     tags: [Mensajes]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: query
   *         name: receiverId
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del destinatario del mensaje
   *       - in: query
   *         name: senderId
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del remitente del mensaje
   *     responses:
   *       200:
   *         description: Conversación obtenida exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/MessageList'
   *       401:
   *         description: No autorizado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorAuth'
   *       404:
   *         description: Conversación no encontrada o usuarios no encontrados
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
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
