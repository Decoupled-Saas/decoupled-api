import db from '../common/utils/db';
import { logger } from '@/server';

class RolesService {
  getAll() {
    return db('Roles').select('name', 'description').where({ deleted_at: null });
  }

  roleExists(name: string) {
    logger.info('roleExists: ', name);
    return db('Roles').select('name', 'description').where({ name: name, deleted_at: null }).first();
  }

  deleteRole(name: string) {
    logger.info('deleteRole: ', name);
    return db('Roles').delete().where({ name });
  }

  createRole(name: string, description: string) {
    return db('Roles').insert({ name, description });
  }
}

export const rolesService = new RolesService();
