import type { Knex } from 'knex';
import { createOnUpdateTrigger, defaultHistoryFields, deleteOnUpdateTrigger } from '../../src/helpers/utils';

const tableName = 'Subscriptions';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.uuid('id').primary().notNullable().defaultTo(knex.fn.uuid());
    table.uuid('plan_id').references('id').inTable('Plans');
    table.uuid('organisation_id').references('id').inTable('Organisations');
    table.string('stripe_customer_id');
    table.string('stripe_subscription_id');

    defaultHistoryFields(knex, table);
  });
  await knex.raw(createOnUpdateTrigger(tableName));
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(deleteOnUpdateTrigger(tableName));
  await knex.schema.dropTable(tableName);
}
