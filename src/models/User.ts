import { model, Schema, Types } from "mongoose";

interface IUser {
  id: string;
  username: string;
  name: string;
  lastname: string;
  fullname: string;
  country: string;
  date: string;
  email: string;
  password: string;
  mentor: Types.ObjectId[];
  role: Types.ObjectId;
  md: Types.ObjectId[];
  matchReq: Types.ObjectId[];
  matchSend: Types.ObjectId[];
  match: Types.ObjectId[];
  verify: boolean;
  isComplete: boolean;
  skills: string[];
  avatar: Types.ObjectId;
  recoveryToken: string;
}

const UserSchema = new Schema<IUser>(
  {
    id: { type: String, require: true, unique: true },
    username: { type: String, require: true, unique: true },
    name: { type: String },
    lastname: { type: String },
    fullname: { type: String },
    country: String,
    date: String,
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    mentor: [{ type: Schema.Types.ObjectId, ref: "User" }],
    role: { type: Schema.Types.ObjectId, ref: "Role" },
    md: [{ type: Schema.Types.ObjectId, ref: "MD" }],
    matchReq: [{ type: Schema.Types.ObjectId, ref: "User" }],
    matchSend: [{ type: Schema.Types.ObjectId, ref: "User" }],
    match: [{ type: Schema.Types.ObjectId, ref: "User" }],
    verify: { type: Boolean, default: false },
    isComplete: { type: Boolean, default: false },
    skills: [String],
    avatar: {
      type: Schema.Types.ObjectId,
      ref: "Photo",
    },
    recoveryToken: { type: String, default: "" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("User", UserSchema);
