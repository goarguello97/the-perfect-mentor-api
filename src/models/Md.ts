import { model, Schema, Types } from "mongoose";

interface IMd {
  from: Types.ObjectId;
  to: Types.ObjectId;
  message: string;
  date: Date;
}

const MdSchema = new Schema<IMd>(
  {
    from: { type: Types.ObjectId, ref: "User", required: true },
    to: { type: Types.ObjectId, ref: "User", required: true },
    message: { type: String, require: true },
    date: { type: Date, require: true },
  },
  { timestamps: true, versionKey: false }
);

export default model("MD", MdSchema);
