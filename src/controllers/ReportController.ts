import ReportService from '@services/ReportService';
import { Request, Response } from 'express';

/**
 * @swagger
 * tags:
 *   name: Reportes
 *   description: Operaciones de gestión de reportes y mensajería
 */
class ReportController {
  /**
   * @swagger
   * /reports/{userId}:
   *   get:
   *     summary: Obtener reportes con paginación y búsqueda
   *     tags: [Reportes]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: string
   *         description: Id del usuario
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           default: 1
   *         description: Número de página para paginación
   *       - in: query
   *         name: search
   *         schema:
   *           type: string
   *         description: Término de búsqueda para filtrar reportes
   *       - in: query
   *         name: isScrolling
   *         schema:
   *           type: boolean
   *         description: Indicador para comportamiento de desplazamiento infinito
   *     responses:
   *       200:
   *         description: Reportes obtenidos exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 reports:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Report'
   *                 pagination:
   *                   type: object
   *                   properties:
   *                     currentPage:
   *                       type: integer
   *                     totalPages:
   *                       type: integer
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
  static async getReports(req: Request, res: Response) {
    const { userId } = req.params;
    const { page = '1', search, isScrolling } = req.query;

    const { error, data } = await ReportService.getReports({
      id: userId,
      page: page.toString(),
      search: search?.toString(),
      isScrolling,
    });

    if (error) return res.status(400).json(data);

    return res.status(200).json(data);
  }

  /**
   * @swagger
   * /reports/report/{id}:
   *   get:
   *     summary: Obtener reporte individual por ID
   *     tags: [Reportes]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del reporte
   *     responses:
   *       200:
   *         description: Reporte obtenido exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Report'
   *       401:
   *         description: No autorizado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorAuth'
   *       400:
   *         description: Reporte no encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  static async getReport(req: Request, res: Response) {
    const { id } = req.params;
    const { error, data } = await ReportService.getReport({ id });
    if (error) return res.status(400).json(data);

    return res.status(200).json(data);
  }

  /**
   * @swagger
   * /reports:
   *   post:
   *     summary: Crear un nuevo reporte
   *     tags: [Reportes]
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
   *               - content
   *               - subject
   *             properties:
   *               senderId:
   *                 type: string
   *                 description: ID del usuario que crea el reporte
   *               receiverId:
   *                 type: string
   *                 description: ID del usuario reportado
   *               content:
   *                 type: string
   *                 description: Contenido/detalles del reporte
   *               subject:
   *                 type: string
   *                 description: Asunto/título del reporte
   *     responses:
   *       200:
   *         description: Reporte creado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Report'
   *       401:
   *         description: No autorizado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorAuth'
   *       400:
   *         description: Solicitud incorrecta o error de validación
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  static async addReport(req: Request, res: Response) {
    const { senderId, receiverId, content, subject } = req.body;

    const { error, data } = await ReportService.addReport({
      senderId,
      receiverId,
      content,
      subject,
    });

    if (error) return res.status(400).json(data);
    return res.status(200).json(data);
  }

  /**
   * @swagger
   * /reports/{reportId}:
   *   put:
   *     summary: Actualizar estado y contenido del reporte
   *     tags: [Reportes]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: reportId
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del reporte a actualizar
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               senderId:
   *                 type: string
   *                 description: ID del remitente del reporte
   *               receiverId:
   *                 type: string
   *                 description: ID del usuario reportado
   *               content:
   *                 type: string
   *                 description: Contenido actualizado del reporte
   *               status:
   *                 type: string
   *                 enum: [pending, resolved, rejected]
   *                 description: Estado del reporte
   *     responses:
   *       200:
   *         description: Reporte actualizado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Report'
   *       401:
   *         description: No autorizado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorAuth'
   *       400:
   *         description: Solicitud incorrecta o reporte no encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  static async putReport(req: Request, res: Response) {
    const { reportId } = req.params;
    const { senderId, receiverId, content, status } = req.body;

    const { error, data } = await ReportService.putReport({
      _id: reportId,
      senderId,
      receiverId,
      content,
      status,
    });

    if (error) return res.status(400).json(data);

    return res.status(200).json(data);
  }

  /**
   * @swagger
   * /reports/{reportId}:
   *   patch:
   *     summary: Responder/cerrar un reporte
   *     tags: [Reportes]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: reportId
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del reporte a responder
   *     responses:
   *       200:
   *         description: Reporte respondido exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Report'
   *       401:
   *         description: No autorizado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorAuth'
   *       400:
   *         description: Solicitud incorrecta o reporte no encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  static async answerReport(req: Request, res: Response) {
    const { reportId } = req.params;
    const { error, data } = await ReportService.answerReport({ _id: reportId });

    if (error) return res.status(400).json(data);

    return res.status(200).json(data);
  }

  /**
   * @swagger
   * /reports/message:
   *   post:
   *     summary: Agregar mensaje a un reporte
   *     tags: [Reportes]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - reportId
   *               - authorId
   *               - content
   *             properties:
   *               reportId:
   *                 type: string
   *                 description: ID del reporte al que agregar mensaje
   *               authorId:
   *                 type: string
   *                 description: ID del autor del mensaje
   *               content:
   *                 type: string
   *                 description: Contenido del mensaje
   *     responses:
   *       200:
   *         description: Mensaje agregado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ReportMessage'
   *       401:
   *         description: No autorizado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorAuth'
   *       400:
   *         description: Solicitud incorrecta o error de validación
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  static async addReportMessage(req: Request, res: Response) {
    const { reportId, authorId, content } = req.body;

    const { error, data } = await ReportService.addReportMessage({
      reportId,
      authorId,
      content,
    });

    if (error) return res.status(400).json(data);

    return res.status(200).json(data);
  }
}

export default ReportController;
