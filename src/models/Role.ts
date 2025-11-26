import { model, Schema } from "mongoose";

interface IRole {
  role: string;
}

const RoleSchema = new Schema<IRole>(
  {
    role: String,
  },
  { timestamps: true, versionKey: false }
);

export default model("Role", RoleSchema);
