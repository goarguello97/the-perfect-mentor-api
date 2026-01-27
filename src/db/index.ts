import mongoose from 'mongoose';

const DB_URI = process.env.DB_URI as string;

mongoose.set('strictQuery', true);

const connectDb = async () => {
  try {
    if (!DB_URI)
      throw new Error('La variable de entorno DB_URI no está definida.');
    await mongoose.connect(DB_URI);
    console.log('Base de datos conectada');
  } catch (error) {
    console.error('Error: ', error);
  }
};

export default connectDb;
