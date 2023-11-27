import { Schema, model } from 'mongoose';
import { IUser } from '../types/modelTypes';

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
});

const User = model<IUser>('User', userSchema);

export default User;
