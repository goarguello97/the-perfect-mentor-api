import { Types, Schema, model } from 'mongoose';

interface IReportMessage {
  reportId: Types.ObjectId;
  authorId: Types.ObjectId;
  content: string;
  isRead: boolean;
  createdAt: Date;
}

const ReportMessageSchema = new Schema<IReportMessage>(
  {
    reportId: {
      type: Schema.Types.ObjectId,
      ref: 'Report',
      required: true,
      index: true,
    },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true, trim: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true },
);

ReportMessageSchema.index({ reportId: 1, createdAt: 1 });

export default model('ReportMessage', ReportMessageSchema);
