import { User } from '../models';
import { UserView } from '../types/schemaTypes';

export const userView = async (id: string): Promise<UserView | undefined> => {
  const user = await User.findById(id);
  if (user) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    } as UserView;
  }
  return undefined;
};
