import User from '@models/User';

const checkEmailExists = async (email: string) => {
  if (!email) throw new Error('El email es necesario');
  const searchEmail = await User.findOne({ email });
  if (searchEmail) {
    throw new Error(`El email ${email} ya se encuentra en uso.`);
  }
};

export default checkEmailExists;
