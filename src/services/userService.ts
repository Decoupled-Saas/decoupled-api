import db from '@/common/utils/db';
import { encryptPassword } from '@/common/utils/encryption';

class UserService {
  async getUserByEmail(email: string) {
    const result = await db('Users').where({ email: email }).first();
    if (result) {
      const { ['password']: password, ...userWithoutPassword } = result;
      return userWithoutPassword;
    }
    return;
  }

  async createUser(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    default_organisation: string
  ) {
    const exists = await this.getUserByEmail(email);
    if (exists) {
      return exists;
    }

    const passHash = await encryptPassword(password);
    await db('Users').insert({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: passHash,
      default_organisation: default_organisation
    });

    return this.getUserByEmail(email);
  }
}

export const userService = new UserService();
