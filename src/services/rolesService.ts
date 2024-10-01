// @ts-ignore
import { Roles } from '@/models';

class RolesService {
  async getAll() {
    return await Roles.findAll();
  }
}

export const rolesService = new RolesService();
