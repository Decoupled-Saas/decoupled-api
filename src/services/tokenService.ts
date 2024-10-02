import db from '@/common/utils/db';
import { logger } from '@/common/utils/logger';

class TokenService {
  getAccessToken(token: string) {
    return db('Tokens').where({ access: token, active: true, deleted_at: null });
  }
}

export const tokenService = new TokenService();
