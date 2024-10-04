import db from '@/common/utils/db';
import moment from 'moment';
import { JWK, JWS } from 'node-jose';

class TokenService {
  getTokens() {
    return db('JWT').orderBy('created_at', 'DESC');
  }

  async generateToken(user_id: string, organisation_id: string, role_id: string, expires: moment.Moment, type: string) {
    const keyList = await db('JWT').orderBy('created_at', 'DESC');
    let keys: any[] = [];

    switch (type) {
      case 'ACCESS':
        keyList.forEach((element: { access_key: any }) => {
          keys.push(element.access_key);
        });
        break;
      case 'REFRESH':
        keyList.forEach((element: { refresh_key: any }) => {
          keys.push(element.refresh_key);
        });
        break;
    }
    const keyStore = await JWK.asKeyStore({ keys: keys });
    const [key] = keyStore.all({ use: 'sig' });

    const opt = { compact: true, jwk: key, fields: { type: 'jwt' } };
    const payload = JSON.stringify({
      sub: user_id,
      org: organisation_id,
      role: role_id,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
      issuer: 'iam.decoupledsaas.com',
      audience: 'decoupledsaas.com'
    });

    return await JWS.createSign(opt, key).update(payload).final();
  }

  getAccessToken(token: string) {
    return db('Tokens').where({ access: token, active: true, deleted_at: null }).orderBy('created_at', 'DESC').first();
  }

  async generateAuthTokens(user_id: string, organisation_id: string, role_id: string) {
    const accessTokenExpires = moment().add(process.env.JWT_ACCESS_EXPIRATION_MINUTES, 'minutes');
    const accessToken = await this.generateToken(user_id, organisation_id, role_id, accessTokenExpires, 'ACCESS');

    const refreshTokenExpires = moment().add(process.env.JWT_REFRESH_EXPIRATION_DAYS, 'days');
    const refreshToken = await this.generateToken(user_id, organisation_id, role_id, refreshTokenExpires, 'REFRESH');

    await this.saveToken(user_id, organisation_id, role_id, accessToken, refreshToken);
    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate()
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate()
      }
    };
  }

  async saveToken(
    user_id: string,
    organisation_id: string,
    role_id: string,
    accessToken: JWS.CreateSignResult,
    refreshToken: JWS.CreateSignResult
  ) {
    await db('Tokens').delete().where({ user_id, organisation_id, role_id });
    return db('Tokens').insert({
      access: accessToken,
      refresh: refreshToken,
      user_id: user_id,
      organisation_id: organisation_id,
      role_id: role_id
    });
  }
}

export const tokenService = new TokenService();
