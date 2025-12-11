import { model, Schema, Types } from "mongoose";

interface IMatch {
  user: Types.ObjectId;
  userMatch: Types.ObjectId;
  accepted: boolean;
}

const MatchSchema = new Schema<IMatch>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userMatch: { type: Schema.Types.ObjectId, ref: "User", requided: true },
    accepted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

export default model("Match", MatchSchema);
