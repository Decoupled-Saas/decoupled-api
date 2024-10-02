import db from '@/common/utils/db';
import { logger } from '@/common/utils/logger';

class JwtService {
  findAll() {
    // logger.debug(db('JWT').where({ active: true, deleted_at: null }).orderBy('created_at', 'DESC').toQuery());
    return db('JWT').where({ active: true, deleted_at: null }).orderBy('created_at', 'DESC');
  }
}

export const jwtService = new JwtService();
