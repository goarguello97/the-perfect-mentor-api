import Match, { MatchStatus } from "@models/Match";
import User from "@models/User";
import admin from "../firebase/firebase-admin";

class MatchService {
  static async match(data: { senderId: string; receiverId: string }) {
    const { senderId, receiverId } = data;
    try {
      if (!senderId || !receiverId) throw new Error("Id faltantes.");

      const [senderUser, receiverUser] = await Promise.all([
        User.findById(senderId),
        User.findById(receiverId),
      ]);

      const match = await Match.findOne({ senderId, receiverId });

      if (match) throw new Error("Solicitud ya enviada");

      if (!senderUser && !receiverUser)
        throw new Error("Usuarios inexistentes");
      if (!senderUser) throw new Error("Usuario emisor inexistente");
      if (!receiverUser) throw new Error("Usuario receptor inexistente");

      const newMatch = new Match({ senderId, receiverId });

      await newMatch.save();

      return { error: false, message: "Solicitud enviada." };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async responseMatch(data: {
    receiverId: string;
    senderId: string;
    response: boolean;
  }) {
    const { receiverId, senderId, response } = data;
    try {
      if (
        !receiverId ||
        !senderId ||
        response === undefined ||
        typeof response !== "boolean"
      )
        throw new Error("Argumentos inválidos");

      const receiverUser = await User.findById(receiverId);

      if (!receiverUser) throw new User("Usuario receptor inexistente");

      const senderUser = await User.findById(senderId);

      if (!senderUser) throw new Error("Usuario emisor inexistente");

      const match = await Match.findOne({ receiverId, senderId });

      if (!match) throw new Error("Solicitud inexistente");

      if (response) {
        match.status = MatchStatus.ACCEPTED;
        await match.save();
      } else {
        await Match.deleteOne({ _id: match._id });
        return {
          error: false,
          data: { message: "Solicitud rechazada" },
        };
      }

      return {
        error: false,
        data: { message: "Solicitud aceptada" },
      };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async getMatches(data: { token: string }) {
    const { token } = data;
    try {
      if (!token) throw new Error("Token no definido");

      const decodedToken = await admin.auth().verifyIdToken(token);
      const { uid } = decodedToken;

      const user = await User.findOne({ id: uid });

      if (!user) throw new Error("Usuario inválido");

      const id = user._id;

      if (!id) throw new Error("Id del usuario inválido");

      const friendsList = await Match.find({
        status: "accepted",
        $or: [{ senderId: id }, { receiverId: id }],
      })
        .populate("senderId", "fullname")
        .populate("receiverId", "fullname");

      const friends = friendsList.map((match) => {
        return match.senderId._id.toString() === id.toString()
          ? match.receiverId
          : match.senderId;
      });

      return { error: false, data: friends };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async getMatchesRequest(data: { token: string }) {
    const { token } = data;
    try {
      if (!token) throw new Error("Token no definido");

      const decodedToken = await admin.auth().verifyIdToken(token);
      const { uid } = decodedToken;

      const user = await User.findOne({ id: uid });

      if (!user) throw new Error("Usuario inválido");

      const id = user._id;

      if (!id) throw new Error("Id del usuario inválido");

      const friendsList = await Match.find({
        status: "pending",
        $or: [{ senderId: id }, { receiverId: id }],
      })
        .populate("senderId", "fullname")
        .populate("receiverId", "fullname");

      const result = {
        sentByMe: friendsList.filter(
          (m) => m.senderId._id.toString() === id.toString()
        ),
        receivedByMe: friendsList.filter(
          (m) => m.receiverId._id.toString() === id.toString()
        ),
      };

      return { error: false, data: result };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async getMatchesSend(data: { token: string }) {
    const { token } = data;
    try {
      if (!token) throw new Error("Token no definido");

      const decodedToken = await admin.auth().verifyIdToken(token);
      const { uid } = decodedToken;

      const user = await User.findOne({ id: uid });

      if (!user) throw new Error("Usuario inválido");

      const id = user._id;

      if (!id) throw new Error("Id del usuario inválido");

      const friendsList = await Match.find({
        status: "pending",
        $or: [{ senderId: id }, { receiverId: id }],
      })
        .populate("senderId", "fullname")
        .populate("receiverId", "fullname");

      const friends = friendsList.map((match) => {
        return match.senderId._id.toString() === id.toString()
          ? match.receiverId
          : match.senderId;
      });

      return { error: false, data: friends };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

export default MatchService;
