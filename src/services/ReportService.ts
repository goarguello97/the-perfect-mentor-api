import Report from "@models/Report";
import User from "@models/User";
import admin from "../firebase/firebase-admin";

class ReportService {
    static async getReports(data:{token:string}) {
    const {token} = data

        try {

            if (!token) throw new Error("Token no definido");

            const decodedToken = await admin.auth().verifyIdToken(token);
            const { uid } = decodedToken;

            const user = await User.findOne({ id: uid });

            if (!user) throw new Error("Usuario inválido");

            const id = user._id;

            if (!id) throw new Error("Id del usuario inválido");

            const reports = await Report.find({
                $or: [{ senderId: id }, { receiverId: id }],
            }).populate({
    path: 'senderId',
    populate: {
        path: 'role' 
    }
})
.populate({
    path: 'receiverId',
    populate: {
        path: 'role'
    }
});

            return {error:false, data:reports}
        } catch (error) {
            return {error:true, data:error}
        }
    }

    static async addReport(data: {senderId:string, receiverId:string, content:string, issue:string}) {
        try {
            const {senderId, receiverId, content, issue} = data;

            if (!senderId) throw new Error("Id del emisor requerido")

            if (!receiverId) throw new Error("Id del receptor requerido")
            
            if (!content) throw new Error("Descripción del mensaje requerido")
            
            const [senderUser, receiverUser] = await Promise.all([
                User.findOne({ id: senderId }),
                User.findById(receiverId)
            ])
            
            if (!senderUser) throw new Error("Usuario emisor inexistente")
            
            if(!receiverUser) throw new Error("Usuario receptor inexistente")

            const report = new Report({senderId:senderUser._id, receiverId:receiverUser._id, content, issue})

            await report.save();

            return { error: false, data:report}

        } catch (error) {
            return {error: true, data:error}
        }
    }

    static async putReport(data:{_id: string, senderId: string, receiverId:string, content:string, answered:boolean}) {
        try {

            let report = await Report.findById(data._id)

            if (!report) throw new Error("Reporte inexistente")

            if (report.content) {
                report.content = data.content;
            }

            if (data.answered) {
                report.answered = data.answered;
            }

            await report.save();

            return {error: false, data: report}
        } catch (error) {
            return {error: true, data:error}
        }
    }

    static async answerReport(data:{_id: string}) {
        try {

            let report = await Report.findById(data._id)

            if (!report) throw new Error("Reporte inexistente")

            report.answered = true;

            await report.save();

            return {error: false, data: report}
        } catch (error) {
            return {error: true, data:error}
        }
    }
}

export default ReportService;
