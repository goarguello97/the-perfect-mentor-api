import { model, Schema, Types } from 'mongoose';

interface IReport {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  subject: string;
  status: boolean;
  lastMessageAt: Date;
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
    lastMessageAt: { type: Date, default: Date.now },
    subject: { type: String, required: true, trim: true },
    status: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

ReportSchema.index({ senderId: 1, receiverId: 1, createdAt: 1 });

export default model('Report', ReportSchema);
