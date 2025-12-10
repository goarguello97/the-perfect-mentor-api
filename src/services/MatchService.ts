import Match from "@models/Match";
import User from "@models/User";

class MatchService {
  static async match(idUser: string, idUserToMatch: string) {
    try {
      if (!idUser || !idUserToMatch) throw new Error("Id faltantes.");

      const [user, userToMatch] = await Promise.all([
        User.findById(idUser),
        User.findById(idUserToMatch),
      ]);

      if (!user || !userToMatch) throw new Error("Usuario inexistente.");

      const newMatch = new Match({ user: idUser, userMatch: idUserToMatch });

      await newMatch.save();

      user.matchSend = user.matchSend.concat(userToMatch.id);
      userToMatch.matchReq = userToMatch.matchReq.concat(user.id);

      await user.save();
      await userToMatch.save();

      return { error: false, message: "Solicitud enviada." };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async responseMatch(idReceivingUser: string, response: boolean) {
    try {
      if (!idReceivingUser || !response || typeof response !== "boolean")
        throw new Error("Argumentos inválidos.");

      const match = await Match.find({ userMatch: idReceivingUser })
        .populate<{
          user: any;
        }>({
          path: "user",
          select: "_id",
        })
        .populate<{ userMatch: any }>({
          path: "userMatch",
          select: "_id",
        });

      if (match.length < 0) throw new Error("Solicitud inexistente.");

      if (response) {
        await Promise.all([
          User.findByIdAndUpdate(
            { _id: match[0].user._id },
            { $push: { match: match[0].userMatch._id } },
            { new: true }
          ),
          User.findByIdAndUpdate(
            { _id: match[0].userMatch._id },
            { $push: { match: match[0].user._id } },
            { new: true }
          ),
          Match.findByIdAndDelete(match[0]._id),

          User.findByIdAndUpdate(
            { _id: match[0].user._id },
            { $pull: { matchSend: match[0].userMatch._id } },
            { new: true }
          ),
          User.findByIdAndUpdate(
            { _id: match[0].userMatch._id },
            { $pull: { matchReq: match[0].user._id } },
            { new: true }
          ),
        ]);

        return {
          error: false,
          data: { message: "Match aceptado correctamente." },
        };
      }

      await Promise.all([
        User.findByIdAndUpdate(
          { _id: match[0].user._id },
          { $pull: { matchSend: match[0].userMatch._id } },
          { new: true }
        ),
        User.findByIdAndUpdate(
          { _id: match[0].userMatch._id },
          { $pull: { matchReq: match[0].user._id } },
          { new: true }
        ),
        Match.findByIdAndDelete(match[0]._id),
      ]);

      return {
        error: false,
        data: { message: "Match rechazado correctamente." },
      };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

export default MatchService;
