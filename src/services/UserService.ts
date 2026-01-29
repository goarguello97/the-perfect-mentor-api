import Avatar from '@models/Avatar';
import Role from '@models/Role';
import User from '@models/User';
import dotenv from 'dotenv';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import path from 'path';
import {
  generateTokenRecoverPassword,
  generateTokenRegister,
  validateToken,
} from 'src/config/token';
import admin from 'src/firebase/firebase-admin';
import {
  getTemplate,
  getTemplateRecoverPassword,
  transporter,
} from 'src/utils/email';

dotenv.config();
const EMAIL = process.env.EMAIL as string;
class UserService {
  static _formatYearlyReport(monthlyData: any, cumulative: any) {
    const monthNames = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    return monthNames.map((name, index) => {
      const monthNumber = index + 1;

      const mentorsThisMonth =
        monthlyData.find(
          (d: any) => d._id.month === monthNumber && d._id.role === 'MENTOR',
        )?.count || 0;
      const menteesThisMonth =
        monthlyData.find(
          (d: any) => d._id.month === monthNumber && d._id.role === 'MENTEE',
        )?.count || 0;

      cumulative.mentor += mentorsThisMonth;
      cumulative.mentee += menteesThisMonth;

      return {
        month: name,
        newUsers: {
          mentor: mentorsThisMonth,
          mentee: menteesThisMonth,
          total: mentorsThisMonth + menteesThisMonth,
        },
        totalCumulative: {
          mentor: cumulative.mentor,
          mentee: cumulative.mentee,
          grandTotal: cumulative.mentor + cumulative.mentee,
        },
      };
    });
  }

  static async getUsers(query: any) {
    const { verify, age, search, page = '1', isScrolling } = query;

    const LIMIT = 7;
    const currentPage = Math.max(Number(page), 1);
    const filters: any = {};
    const sort: any = {};
    if (verify === 'true') {
      filters.verify = true;
    }
    if (search) filters.name = { $regex: search, $options: 'i' };
    if (age === 'true') {
      sort.date = -1;
    }
    try {
      const users = await User.find(filters)
        .sort(sort)
        .skip((currentPage - 1) * LIMIT)
        .limit(LIMIT)
        .populate('role', {
          role: 1,
          _id: 0,
        });

      const total = await User.countDocuments(filters);

      return {
        error: false,
        data: {
          users,
          page: currentPage,
          perPage: LIMIT,
          total,
          totalPages: Math.ceil(total / LIMIT),
          isScrolling: isScrolling === 'true' || isScrolling === true,
        },
      };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async getUserPerMonth() {
    try {
      const currentYear = new Date().getFullYear();
      const startOfYear = new Date(`${currentYear}-01-01T00:00:00.000Z`);
      const endOfYear = new Date(`${currentYear}-12-31T23:59:59.999Z`);

      const baseStats = await User.aggregate([
        { $match: { createdAt: { $lt: startOfYear } } },
        {
          $lookup: {
            from: 'roles',
            localField: 'role',
            foreignField: '_id',
            as: 'roleData',
          },
        },
        { $unwind: '$roleData' },
        { $group: { _id: '$roleData.role', count: { $sum: 1 } } },
      ]);

      const cumulative = { mentor: 0, mentee: 0 } as any;
      baseStats.forEach((stat) => {
        if (stat._id && cumulative.hasOwnProperty(stat._id)) {
          cumulative[stat._id] = stat.count;
        }
      });

      const monthlyData = await User.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfYear, $lte: endOfYear },
          },
        },
        {
          $lookup: {
            from: 'roles',
            localField: 'role',
            foreignField: '_id',
            as: 'roleData',
          },
        },
        { $unwind: '$roleData' },
        {
          $group: {
            _id: {
              month: { $month: '$createdAt' },
              role: '$roleData.role',
            },
            count: { $sum: 1 },
          },
        },
      ]);

      const formattedData = this._formatYearlyReport(monthlyData, cumulative);
      const lastMonth = formattedData[11].totalCumulative;
      const totalNewThisYear = formattedData.reduce(
        (acc, month) => acc + month.newUsers.total,
        0,
      );

      return {
        error: false,
        data: {
          months: formattedData,
          summary: {
            totalUsersAllTime: lastMonth.grandTotal, // Todos los usuarios en la DB
            totalNewUsersThisYear: totalNewThisYear, // Solo los registrados en 2026
            breakdownAllTime: {
              mentors: lastMonth.mentor,
              mentees: lastMonth.mentee,
            },
          },
        },
      };
    } catch (error: any) {
      return { error: true, data: error.message };
    }
  }

  static async getUserById(data: { id: string }) {
    try {
      const { id } = data;

      if (!id) throw new Error('Id del usuario inválido');

      const response = await User.findById(id).populate('role');

      return { error: false, data: response };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async addUser(user: { email: string; username: string; id: string }) {
    try {
      const { email, username, id } = user;

      const userByEmail = await User.find({ email });

      if (userByEmail.length > 0)
        throw new Error(`El email ${email} ya se encuentra en uso.`);

      const role = await Role.findOne({ role: 'MENTEE' });

      const newUser = new User({ email, username, id, role });

      const token = generateTokenRegister({ email: newUser.email });
      const template = getTemplate(token);

      await transporter.sendMail({
        from: `The Perfect Mentor <${EMAIL}>`,
        to: email,
        subject: 'Verificar cuenta',
        text: '...',
        html: template,
      });

      await newUser.save();

      return { error: false, data: newUser };
    } catch (error: any) {
      return { error: true, data: error.message };
    }
  }

  static async putUser(user: any) {
    try {
      let userToUpdate = await User.findById(user._id).populate('role', {
        role: 1,
        _id: 1,
      });
      let customToken = '';

      if (!userToUpdate) throw new Error('Usuario no disponible.');

      if (user.email) {
        if (user.email !== userToUpdate.email) {
          await admin.auth().updateUser(userToUpdate.id, {
            email: user.email,
          });
          customToken = await admin.auth().createCustomToken(userToUpdate.id);
        }
      }

      const updatedUser = await User.findByIdAndUpdate(
        userToUpdate._id,
        {
          ...user,
          fullname: `${user.name} ${user.lastname}`,
          isComplete: true,
        },
        { new: true },
      ).populate('role', {
        role: 1,
        _id: 1,
      });

      return { error: false, data: { ...updatedUser, customToken } };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async deleteUser(id: string) {
    try {
      const response = await User.findByIdAndDelete(id);

      return { error: false, data: response };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async activateUser(token: string | undefined) {
    try {
      if (!token) throw new Error('Token no definido');

      const payload = validateToken(token);

      const user = await User.findOne({ email: payload.user.email });

      if (!user) throw new Error('Usuario no disponible.');

      user.verify = true;

      await user.save();
      return {
        error: false,
        data: user,
      };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async addAvatar(file: Express.Multer.File, id: string) {
    try {
      if (!file) throw new Error('Archivo inexistente.');

      const user = await User.findById(id).populate('avatar', { imageUrl: 1 });

      if (!user) throw new Error('Usuario inexistente.');

      if (user.avatar) {
        const oldAvatar = await Avatar.findById(user.avatar._id);

        if (!oldAvatar) throw new Error('Avatar inexistente.');

        if (oldAvatar.title !== 'default') {
          const fileToRemove = ref(getStorage(), `avatars/${oldAvatar.title}`);
          await Promise.all([
            deleteObject(fileToRemove),
            oldAvatar.deleteOne(),
          ]);
        }
      }

      const fileName = id + path.extname(file.originalname);

      const storageRef = ref(getStorage(), `avatars/${fileName}`);

      const metadata = {
        contentType: file.mimetype,
      };

      const snapshot = await uploadBytesResumable(
        storageRef,
        file.buffer!,
        metadata,
      );

      const downloadUrl = await getDownloadURL(snapshot.ref);

      const newAvatar = {
        title: fileName,
        imageUrl: downloadUrl,
      };

      const avatar = new Avatar(newAvatar);
      await avatar.save();

      user.avatar = avatar._id;
      await user.save();

      return { error: false, data: user };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async loginUser(user: { email: string; password: string }) {
    try {
      const { email, password } = user;

      return { error: false };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async validationUser(token: string | undefined) {
    try {
      if (!token) throw new Error('Token no definido');

      const decodedToken = await admin.auth().verifyIdToken(token);
      const { uid } = decodedToken;

      const user = await User.findOne({ id: uid }).populate('role', {
        role: 1,
        _id: 1,
      });

      if (!user) throw new Error('Usuario no registrado.');
      if (!user.verify) throw new Error('Debes activar tu usuario.');

      return { error: false, data: user };
    } catch (error: any) {
      return { error: true, data: error.message };
    }
  }

  static async recoverPassword(email: string) {
    try {
      const user = await User.findOne({ email });

      if (!user) throw new Error('Usuario no válido.');

      const token = generateTokenRecoverPassword({ email: user.email });
      const template = getTemplateRecoverPassword(user.username, token);

      await transporter.sendMail({
        from: `The Perfect Mentor <${EMAIL}>`,
        to: email,
        subject: 'Recuperar contraseña',
        text: '...',
        html: template,
      });

      user.recoveryToken = token;
      await user.save();

      return {
        error: false,
        data: {
          message:
            'Se ha enviado un email de recuperación, revise su bandeja de entrada por favor.',
        },
      };
    } catch (error: any) {
      return { error: true, data: error.message };
    }
  }

  static async updatePassword(email: string, password: string) {
    try {
      const user = await User.findOne({ email });

      if (!user) throw new Error('Usuario no válido.');

      user.recoveryToken = '';
      await user.save();
      await admin.auth().updateUser(user.id, { password });

      return {
        error: false,
        data: { message: 'Contraseña modificada exitosamente.' },
      };
    } catch (error: any) {
      return { error: true, data: error.message };
    }
  }
}

export default UserService;
