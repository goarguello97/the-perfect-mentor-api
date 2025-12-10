import User from "@models/User";
import dotenv from "dotenv";
import { generateTokenRegister, validateToken } from "src/config/token";
import { getTemplate, transporter } from "src/utils/email";

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
      const response = await User.findById(id);

      return { error: false, data: response };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async addUser(user: { email: string }) {
    try {
      const { email } = user;

      const userByEmail = await User.find({ where: { email } });

      if (userByEmail.length > 0)
        throw new Error(`El email ${email} ya se encuentra en uso.`);

      const newUser = new User({ email });

      const token = generateTokenRegister(newUser);
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
    } catch (error) {
      return { error: true, data: error };
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

  static async activateUser(token: string) {
    try {
      const payload = validateToken(token);
      const email = payload;
      const user = await User.findOne({ email });
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
}

export default UserService;
