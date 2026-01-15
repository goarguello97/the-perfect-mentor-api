import Md from "@models/Md";
import User from "@models/User";
import { socketService } from "./SocketService";

class MdService {
  static async sendMessage(data: {
    receiverId: string;
    senderId: string;
    content: string;
  }) {
    try {
      const { receiverId, senderId, content } = data;

      const senderUser = await User.findById(senderId);

      if (!senderUser) throw new Error("Usuario emisor inexistente");

      const newMessage = new Md({ receiverId, senderId, content });

      await newMessage.save();

      socketService.io.to(receiverId.toString()).emit("PRIVATE_MESSAGE", {
        _id: newMessage._id,
        senderId,
        receiverId,
        from: senderUser.fullname,
        content,
        createdAt: newMessage.createdAt,
      });

      return { error: false, data: newMessage };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async getMessages(data: { receiverId: string; senderId: string }) {
    try {
      const { receiverId, senderId } = data;
      const senderUser = await User.findById(senderId);

      if (!senderUser) throw new Error("Usuario emisor inexistente");

      const receiverUser = await User.findById(receiverId);

      if (!receiverUser) throw new Error("Usuario receptor inexistente");

      const messages = await Md.find({
        $or: [
          { receiverId, senderId },
          { receiverId: senderId, senderId: receiverId },
        ],
      }).sort({ createdAt: 1 });

      return { error: false, data: messages };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

export default MdService;
