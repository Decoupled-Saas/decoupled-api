import db from '@/common/utils/db';

class OrganisationService {
  getByEmail(email: string) {
    return db('Organisations').where('primary_email', email).first();
  }
  async create(name: string, email: string) {
    const exist = await this.getByEmail(email);
    if (exist) {
      return exist;
    }
    return db('Organisations').insert({ name, primary_email: email }).returning('*');
  }
}

export const organisationService = new OrganisationService();
