/// <reference types="../types/express" />
import UserService from '@services/UserService';
import { Request, Response } from 'express';

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Operaciones de gestión de usuarios
 */
class UserController {
  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Obtener todos los usuarios
   *     tags: [Usuarios]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *         description: Número de página para paginación
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *         description: Número de usuarios por página
   *     responses:
   *       200:
   *         description: Lista de usuarios obtenida exitosamente
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/UserList'
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
  static async getUsers(req: Request, res: Response) {
    const { query } = req;
    const { error, data } = await UserService.getUsers(query);

    if (error) return res.status(400).json(error);

    res.status(200).json(data);
  }

  /**
   * @swagger
   * /users/stats/info:
   *   get:
   *     summary: Obtener estadísticas de usuarios por mes
   *     tags: [Usuarios]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Estadísticas de usuarios obtenidas exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 monthlyUsers:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       month:
   *                         type: string
   *                       count:
   *                         type: integer
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
  static async getUserPerMonth(_: Request, res: Response) {
    const { error, data } = await UserService.getUserPerMonth();

    if (error) return res.status(400).json(error);

    res.status(200).json(data);
  }

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Obtener usuario por ID
   *     tags: [Usuarios]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del usuario
   *     responses:
   *       200:
   *         description: Usuario obtenido exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: Usuario no encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       401:
   *         description: No autorizado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorAuth'
   */
  static async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const { error, data } = await UserService.getUserById({ id });
    if (error) return res.status(404).json(data);

    res.status(200).json(data);
  }

  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Crear un nuevo usuario
   *     tags: [Usuarios]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - username
   *               - email
   *               - password
   *             properties:
   *               username:
   *                 type: string
   *                 description: Nombre de usuario
   *               email:
   *                 type: string
   *                 format: email
   *                 description: Correo electrónico del usuario
   *               password:
   *                 type: string
   *                 description: Contraseña del usuario
   *     responses:
   *       201:
   *         description: Usuario creado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CreatedUser'
   *       409:
   *         description: Conflicto - El usuario ya existe
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       400:
   *         description: Error de validación
   */
  static async addUser(req: Request, res: Response) {
    const user = req.body;
    const { error, data } = await UserService.addUser(user);

    if (error) return res.status(409).json(data);
    res.status(201).json(data);
  }

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     summary: Actualizar información del usuario
   *     tags: [Usuarios]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del usuario
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: Nombre completo del usuario
   *               lastname:
   *                 type: string
   *                 description: Apellido del usuario
   *               email:
   *                 type: string
   *                 format: email
   *                 description: Correo electrónico del usuario
   *               date:
   *                 type: string
   *                 format: date
   *                 description: Fecha de nacimiento del usuario
   *               country:
   *                 type: string
   *                 description: País del usuario
   *               role:
   *                 type: string
   *                 description: Rol del usuario
   *     responses:
   *       200:
   *         description: Usuario actualizado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: Usuario no encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       401:
   *         description: No autorizado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorAuth'
   */
  static async putUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = req.body;
    const { error, data } = await UserService.putUser({ ...user, id });

    if (error) return res.status(404).json(data);

    return res.status(200).json(data);
  }

  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Eliminar usuario
   *     tags: [Usuarios]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - id
   *             properties:
   *               id:
   *                 type: string
   *                 description: ID del usuario a eliminar
   *     responses:
   *       200:
   *         description: Usuario eliminado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Mensaje de éxito
   *       404:
   *         description: Usuario no encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       401:
   *         description: No autorizado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorAuth'
   */
  static async deleteUser(req: Request, res: Response) {
    const { id } = req.body;

    const { error, data } = await UserService.deleteUser(id);
    if (error) return res.status(404).json(data);

    return res.status(200).json(data);
  }

  /**
   * @swagger
   * /users/auth/activate:
   *   get:
   *     summary: Activar cuenta de usuario
   *     tags: [Usuarios]
   *     responses:
   *       200:
   *         description: Usuario activado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: Token inválido o usuario no encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       401:
   *         description: No autorizado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorAuth'
   */
  static async activateUser(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1];

    const { error, data } = await UserService.activateUser(token);
    if (error) {
      return res.status(404).json(data);
    }

    return res.status(200).json(data);
  }

  /**
   * @swagger
   * /users/add/avatar:
   *   patch:
   *     summary: Subir avatar del usuario
   *     tags: [Usuarios]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             required:
   *               - image
   *               - id
   *             properties:
   *               image:
   *                 type: string
   *                 format: binary
   *                 description: Archivo de imagen
   *               id:
   *                 type: string
   *                 description: ID del usuario
   *     responses:
   *       200:
   *         description: Avatar subido exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: No se proporcionó imagen o usuario no encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       401:
   *         description: No autorizado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorAuth'
   */
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

  // /**
  //  * @swagger
  //  * /users/login:
  //  *   post:
  //  *     summary: Inicio de sesión de usuario
  //  *     tags: [Usuarios]
  //  *     requestBody:
  //  *       required: true
  //  *       content:
  //  *         application/json:
  //  *           schema:
  //  *             type: object
  //  *             required:
  //  *               - email
  //  *               - password
  //  *             properties:
  //  *               email:
  //  *                 type: string
  //  *                 format: email
  //  *                 description: Correo electrónico del usuario
  //  *               password:
  //  *                 type: string
  //  *                 description: Contraseña del usuario
  //  *     responses:
  //  *       200:
  //  *         description: Inicio de sesión exitoso
  //  *         content:
  //  *           application/json:
  //  *             schema:
  //  *               $ref: '#/components/schemas/AuthResponse'
  //  *       404:
  //  *         description: Credenciales inválidas
  //  *         content:
  //  *           application/json:
  //  *             schema:
  //  *               $ref: '#/components/schemas/Error'
  //  */
  // static async loginUser(req: Request, res: Response) {
  //   const user = req.body;

  //   const { error, data } = await UserService.loginUser(user);
  //   if (error) {
  //     return res.status(404).json(data);
  //   }

  //   return res.status(200).json(data);
  // }

  /**
   * @swagger
   * /users/auth/validate:
   *   get:
   *     summary: Validar token de usuario
   *     tags: [Usuarios]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Token válido
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: Token inválido
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       401:
   *         description: No autorizado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorAuth'
   */
  static async validationUser(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1];

    const { error, data } = await UserService.validationUser(token);

    if (error) {
      return res.status(404).json(data);
    }

    return res.status(200).json(data);
  }

  /**
   * @swagger
   * /users/recover-password:
   *   post:
   *     summary: Recuperar contraseña del usuario
   *     tags: [Usuarios]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *                 description: Correo electrónico del usuario para recuperación de contraseña
   *     responses:
   *       200:
   *         description: Correo de recuperación de contraseña enviado
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Mensaje de éxito
   *       404:
   *         description: Correo electrónico no encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  static async recoverPassword(req: Request, res: Response) {
    const { email } = req.body;

    const { error, data } = await UserService.recoverPassword(email);

    if (error) {
      return res.status(404).json(data);
    }

    return res.status(200).json(data);
  }

  /**
   * @swagger
   * /users/update/password:
   *   put:
   *     summary: Actualizar contraseña del usuario
   *     tags: [Usuarios]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - password
   *             properties:
   *               password:
   *                 type: string
   *                 description: Nueva contraseña
   *     responses:
   *       200:
   *         description: Contraseña actualizada exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Mensaje de éxito
   *       401:
   *         description: No autorizado - Usuario no autenticado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorAuth'
   *       404:
   *         description: Usuario no encontrado o actualización fallida
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
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
