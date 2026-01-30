import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage, Options } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

interface CloudinaryOptions extends Options {
  params: {
    folder: string;
    allowed_formats?: string[];
    public_id?: (req: any, file: any) => string;
  };
}

// Configuramos Cloudinary con nuestras credenciales
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Definimos dónde y cómo se guardarán las fotos
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'avatars', // Nombre de la carpeta en Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // Formatos permitidos
    public_id: (req: Express.Request, file: Express.Multer.File) =>
      `img-${Date.now()}`, // Nombre único para la imagen
  },
} as CloudinaryOptions);

const uploadCloud = multer({ storage });

export default uploadCloud;
