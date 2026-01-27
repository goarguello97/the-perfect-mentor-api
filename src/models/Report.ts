import { model, Schema, Types } from 'mongoose';

interface IReport {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  content: string;
  issue: string;
  answered: boolean;
  createdAt: Date;
}

const ReportSchema = new Schema<IReport>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    content: { type: String, required: true, trim: true },
    issue: { type: String, required: true, trim: true },
    answered: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

ReportSchema.index({ senderId: 1, receiverId: 1, createdAt: 1 });

export default model('Report', ReportSchema);
