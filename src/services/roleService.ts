import db from '@/common/utils/db';

class RoleService {
  findRoleByName(roleName: string) {
    return db('Roles').where({ name: roleName }).first();
  }
}

export const roleService = new RoleService();
