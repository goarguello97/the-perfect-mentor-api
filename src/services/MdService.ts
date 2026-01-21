import Md from "@models/Md";
import User from "@models/User";
import mongoose from "mongoose";
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

  static async getUserMessages(data: {userId: string}) {
    const { userId } = data
    const userObjectId = new mongoose.Types.ObjectId(userId);
    try {
      if (!userId) throw new Error("Id usuario inexistente")
      
      const user = await User.findById(userId)

      if (!user) throw new Error("Usuario inexistente")
      
      const messages = await Md.aggregate([
        {
          $match: {
            $or: [
              { receiverId: userObjectId },
              { senderId: userObjectId }
            ]
          }
        },          
        { $sort: { createdAt: -1 } },
        {
          $addFields: {
            chatPartner: {
            $cond: [
              { $eq: ["$senderId", userObjectId] },
              "$receiverId",
              "$senderId"
            ]
          }
          }
        },
        {
          $group: {
            _id: "$chatPartner",
            lastMessage: { $first: "$$ROOT" },
            unreadCount: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $eq: ["$receiverId", userObjectId] },
                      { $eq: ["$read", false] }
                    ]
                  },
                  1,
                  0
                ]
              }
            }
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "contactInfo"
          }
        },
        {
          $unwind: "$contactInfo"
        },
        {
          $sort: {"lastMessage.createdAt": -1}
        },
        {
          $project: {
            _id: 0,
            contact: {
              _id: "$contactInfo._id",
              fullname: "$contactInfo.fullname",
              avatar: "$contactInfo.avatar"
            },
            lastMessage: 1,
            unreadCount: 1
          }
        }
      ])
      
      return {error:false, data:messages}   
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

      await Md.updateMany(
      { receiverId: senderId, senderId: receiverId, read: false },
      { $set: { read: true } }
      );

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
