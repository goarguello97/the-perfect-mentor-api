import { model, Schema, Types } from "mongoose";

interface IMd {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  content: string;
  read: boolean;
  createdAt: Date;
}

const MdSchema = new Schema<IMd>(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, require: true },
    read: { type: Boolean, require: false },
  },
  { timestamps: true, versionKey: false }
);

MdSchema.index({ senderId: 1, receiverId: 1, createdAt: 1 });

export default model("MD", MdSchema);
