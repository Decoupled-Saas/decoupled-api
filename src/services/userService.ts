import db from '@/common/utils/db';
import { encryptPassword, isPasswordMatch } from '@/common/utils/encryption';
import { email } from 'envalid';

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

  async loginUserWithEmailAndPassword(email: string, password: string, ip: string) {
    const user = await db('Users').where({ email: email }).first();
    if (!user) {
      return null;
    }
    const isPasswordValid = await isPasswordMatch(password, user.password);
    if (!isPasswordValid) {
      return null;
    }
    await db('Users').update({ last_ip_address: ip, last_login_at: 'now()' }).where({ email: email });
    const { password: userPassword, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

export const userService = new UserService();
