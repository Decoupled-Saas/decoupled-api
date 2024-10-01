import { Knex } from "knex";
const tableName = "Roles";
export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(tableName).del();

    // Inserts seed entries
    await knex(tableName).insert([
      {
        name: 'master',
        description: 'Master',
      },
      {
        name: 'owner',
        description: 'Owner',
      },
      {
        name: 'admin',
        description: 'Admin',
      },
      {
        name: 'user',
        description: 'User',
      },
      {
        name: 'developer',
        description: 'Developer',
      },
    ]);
};
