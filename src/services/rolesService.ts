import db from '@/common/utils/db';
import { logger } from '@/common/utils/logger';

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
    logger.info(db('Roles').delete().where({ name: name }).toQuery());
    return db('Roles').delete().where({ name: name });
  }

  createRole(name: string, description: string) {
    return db('Roles').insert({ name, description });
  }

  findRoleByName(roleName: string) {
    return db('Roles').where({ name: roleName }).first();
  }

  async roleHasPermission(role_id: string, permission: string[]) {
    const permission_data = await db('Permissions').where({ name: permission }).first();
    console.log(permission_data);
    return db('RolePermissions').where({ role_id, permission_id: permission_data.id }).first();
  }
}

export const rolesService = new RolesService();
