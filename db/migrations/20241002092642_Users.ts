import type { Knex } from 'knex';
import { createOnUpdateTrigger, defaultHistoryFields, deleteOnUpdateTrigger } from '../../src/helpers/utils';

const tableName = 'Users';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.uuid('id').primary().notNullable().defaultTo(knex.fn.uuid());
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.string('password');
    table.timestamp('last_login_at');
    table.string('last_ip_address');
    table.boolean('mfa_enabled').defaultTo(false);
    table.text('mfa_secret');
    table.text('mfa_backup_code');
    table.uuid('default_organisation').references('id').inTable('Organisations');
    table.string('phone');
    table.string('email_verification_code');
    table.text('email_verification_code_sent_at');
    table.boolean('email_verified').defaultTo(false);
    table.string('avatar_url');
    defaultHistoryFields(knex, table);
  });
  await knex.raw(createOnUpdateTrigger(tableName));
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(deleteOnUpdateTrigger(tableName));
  await knex.schema.dropTable(tableName);
}
