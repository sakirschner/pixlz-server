import bcrypt from 'bcrypt';
import User from '../models/User';
import { SALT_ROUNDS } from '../configs/app.config';

interface CreateUser {
  password: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: number;
}

export const createUser = async ({ password, email, username, firstName, lastName, phone, role }: CreateUser) => {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = new User({
    username,
    email,
    firstName,
    lastName,
    phone,
    role,
    password: hash,
  });
  await user.save();
  return user;
};
