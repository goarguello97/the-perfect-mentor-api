import { model, Schema } from 'mongoose';

interface IAvatar {
  title: string;
  imageUrl: string;
  publicId: string;
}

const AvatarSchema = new Schema<IAvatar>(
  {
    title: String,
    imageUrl: String,
    publicId: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model('Avatar', AvatarSchema);
