import Avatar from "@models/Avatar";
import Role from "@models/Role";
import User from "@models/User";
import dotenv from "dotenv";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import path from "path";
import {
  generateTokenRecoverPassword,
  generateTokenRegister,
  validateToken,
} from "src/config/token";
import admin from "src/firebase/firebase-admin";
import {
  getTemplate,
  getTemplateRecoverPassword,
  transporter,
} from "src/utils/email";

dotenv.config();
const EMAIL = process.env.EMAIL as string;
class UserService {
  static async getUsers() {
    try {
      const response = await User.find({});

      return { error: false, data: response };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async getUserById(id: string) {
    try {
      const response = await User.findOne({ where: { id } });

      return { error: false, data: response };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async addUser(user: { email: string; username: string; id: string }) {
    try {
      const { email, username, id } = user;

      const userByEmail = await User.find({ where: { email } });

      if (userByEmail.length > 0)
        throw new Error(`El email ${email} ya se encuentra en uso.`);

      const role = await Role.findOne({ role: "MENTEE" });

      const newUser = new User({ email, username, id, role });

      const token = generateTokenRegister({ email: newUser.email });
      const template = getTemplate(token);

      await transporter.sendMail({
        from: `The Perfect Mentor <${EMAIL}>`,
        to: email,
        subject: "Verificar cuenta",
        text: "...",
        html: template,
      });

      await newUser.save();

      return { error: false, data: newUser };
    } catch (error: any) {
      return { error: true, data: error.message };
    }
  }

  static async putUser(id: string, user: any) {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
      if (!updatedUser) throw new Error("Usuario no disponible.");
      return { error: false, data: updatedUser };
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
      if (!token) throw new Error("Token no definido");

      const payload = validateToken(token);

      const user = await User.findOne({ payload });

      if (!user) throw new Error("Usuario no disponible.");

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
      if (!file) throw new Error("Archivo inexistente.");

      const user = await User.findById(id).populate("avatar", { imageUrl: 1 });

      if (!user) throw new Error("Usuario inexistente.");

      if (user.avatar) {
        const oldAvatar = await Avatar.findById(user.avatar._id);

        if (!oldAvatar) throw new Error("Avatar inexistente.");

        if (oldAvatar.title !== "default") {
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
        metadata
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
      if (!token) throw new Error("Token no definido");

      const decodedToken = await admin.auth().verifyIdToken(token);
      const { uid } = decodedToken;

      const user = await User.findOne({ id: uid }).populate("role", {
        role: 1,
        _id: 0,
      });

      if (!user) throw new Error("Usuario no registrado.");
      if (!user.verify) throw new Error("Debes activar tu usuario.");

      return { error: false, data: user };
    } catch (error: any) {
      return { error: true, data: error.message };
    }
  }

  static async recoverPassword(email: string) {
    try {
      const user = await User.findOne({ email });

      if (!user) throw new Error("Usuario no válido.");

      const token = generateTokenRecoverPassword({ email: user.email });
      const template = getTemplateRecoverPassword(user.username, token);

      await transporter.sendMail({
        from: `The Perfect Mentor <${EMAIL}>`,
        to: email,
        subject: "Recuperar contraseña",
        text: "...",
        html: template,
      });

      user.recoveryToken = token;
      await user.save();

      return {
        error: false,
        data: { message: "Se ha enviado un email de recuperación, revise su bandeja de entrada por favor." },
      };
    } catch (error: any) {
      return { error: true, data: error.message };
    }
  }

  static async updatePassword(email: string, password: string) {
    try {
      const user = await User.findOne({ email });

      if (!user) throw new Error("Usuario no válido.");

      user.recoveryToken = "";
      await user.save();
      await admin.auth().updateUser(user.id, { password });

      return {
        error: false,
        data: { message: "Contraseña modificada exitosamente." },
      };
    } catch (error: any) {
      return { error: true, data: error.message };
    }
  }
}

export default UserService;
