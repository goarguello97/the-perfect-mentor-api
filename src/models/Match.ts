import { model, Schema, Types } from 'mongoose';

export enum MatchStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}
interface IMatch {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  status: MatchStatus;
}

const MatchSchema = new Schema<IMatch>(
  {
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: 'User', requided: true },
    status: {
      type: String,
      enum: Object.values(MatchStatus),
      default: MatchStatus.PENDING,
    },
  },
  { timestamps: true, versionKey: false },
);

MatchSchema.index({ senderId: 1, receiverId: 1 }, { unique: true });

export default model('Match', MatchSchema);
