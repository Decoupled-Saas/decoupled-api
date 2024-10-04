import db from '@/common/utils/db';

class OrganisationUserService {
  find(user_id: string, organisation_id: string, role_id: string) {
    return db('OrganisationUsers').where({ user_id, organisation_id, role_id }).first();
  }

  async create(user_id: string, organisation_id: string, role_id: string) {
    const exists = await this.find(user_id, organisation_id, role_id);
    if (exists) {
      return exists;
    }
    return db('OrganisationUsers').insert({ user_id, organisation_id, role_id }).returning('*');
  }

  findRole(user_id: string, organisation_id: string) {
    return db('OrganisationUsers').where({ user_id, organisation_id }).first();
  }
}

export const organisationUserService = new OrganisationUserService();
