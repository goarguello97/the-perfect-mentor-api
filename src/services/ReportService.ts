import Report from '@models/Report';
import User from '@models/User';
import admin from '../firebase/firebase-admin';
import ReportMessage from '@models/ReportMessage';

class ReportService {
  static async getReports(data: {
    id: string;
    page: string;
    search: string | undefined;
    isScrolling: any;
  }) {
    const { id, page, search, isScrolling } = data;
    const LIMIT = 7;

    const currentPage = Math.max(Number(page), 1);
    const filters: any = {};
    if (search) filters.name = { $regex: search, $options: 'i' };
    try {
      if (!id) throw new Error('Id del usuario inválido');

      const user = await User.findById(id);

      if (!user) throw new Error('Usuario inválido');

      let matchIds: any[] = [];

      if (search) {
        const matchedUsers = await User.find({
          fullname: { $regex: search, $options: 'i' },
        }).select('_id');

        matchIds = matchedUsers.map((u) => u._id);
      }

      const query: any = {
        $and: [{ $or: [{ senderId: user._id }, { receiverId: user._id }] }],
      };

      if (search) {
        query.$and.push({
          $or: [
            { senderId: { $in: matchIds } },
            { receiverId: { $in: matchIds } },
          ],
        });
      }

      const reports = await Report.find(query)
        .skip((currentPage - 1) * LIMIT)
        .limit(LIMIT)
        .populate({
          path: 'senderId',
          populate: {
            path: 'role',
          },
        })
        .populate({
          path: 'receiverId',
          populate: {
            path: 'role',
          },
        });

      const total = await Report.countDocuments(query);

      return {
        error: false,
        data: {
          reports,
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

  static async getReport(data: { id: string }) {
    try {
      const { id } = data;

      if (!id) throw new Error('Id del reporte inválido');

      const report = await Report.findById(id)
        .populate({
          path: 'senderId',
          populate: {
            path: 'role',
          },
        })
        .populate({
          path: 'receiverId',
          populate: {
            path: 'role',
          },
        });

      if (!report) throw new Error('Reporte inexistente');

      const reportData = report.toObject();

      const reportMessages = await ReportMessage.find({ reportId: report._id });

      return {
        error: false,
        data: { ...reportData, messages: reportMessages },
      };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async addReport(data: {
    senderId: string;
    receiverId: string;
    content: string;
    subject: string;
  }) {
    try {
      const { senderId, receiverId, content, subject } = data;

      if (!senderId) throw new Error('Id del emisor requerido');

      if (!receiverId) throw new Error('Id del receptor requerido');

      if (!content) throw new Error('Descripción del mensaje requerido');

      const [senderUser, receiverUser] = await Promise.all([
        User.findOne({ id: senderId }),
        User.findById(receiverId),
      ]);

      if (!senderUser) throw new Error('Usuario emisor inexistente');

      if (!receiverUser) throw new Error('Usuario receptor inexistente');

      const report = new Report({
        senderId: senderUser._id,
        receiverId: receiverUser._id,
        subject,
      });

      const reportMessage = new ReportMessage({
        authorId: senderUser._id,
        reportId: report._id,
        content,
      });

      await report.save();
      await reportMessage.save();

      return { error: false, data: { report, reportMessage } };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async putReport(data: {
    _id: string;
    senderId: string;
    receiverId: string;
    content: string;
    status: boolean;
  }) {
    try {
      let report = await Report.findById(data._id);

      if (!report) throw new Error('Reporte inexistente');

      if (data.status) {
        report.status = data.status;
      }

      await report.save();

      return { error: false, data: report };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async answerReport(data: { _id: string }) {
    try {
      let report = await Report.findById(data._id);

      if (!report) throw new Error('Reporte inexistente');

      report.status = !report.status;

      await report.save();

      return { error: false, data: report };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async addReportMessage(data: {
    authorId: string;
    reportId: string;
    content: string;
  }) {
    try {
      const { authorId, reportId, content } = data;
      const reportMessage = new ReportMessage({ authorId, reportId, content });
      await reportMessage.save();

      return { error: false, data: reportMessage };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

export default ReportService;
