import type { Knex } from 'knex';
import { createOnUpdateTrigger, defaultHistoryFields, deleteOnUpdateTrigger } from '../../src/helpers/utils';

const tableName = 'Plans';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.uuid('id').primary().notNullable().defaultTo(knex.fn.uuid());
    table.string('name');
    table.string('stripe_id');
    table.float('price');
    table.enum('interval', ['month', 'year']).defaultTo('year');
    table.json('currency');
    table.json('features');
    table.json('options');
    defaultHistoryFields(knex, table);
  });
  await knex.raw(createOnUpdateTrigger(tableName));
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(deleteOnUpdateTrigger(tableName));
  await knex.schema.dropTable(tableName);
}
