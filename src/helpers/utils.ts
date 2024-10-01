import { type Knex, type TableBuilder } from 'knex';

export const createOnUpdateTrigger = (tableName: string) => `
  CREATE TRIGGER "${tableName}_updated_at"
  BEFORE UPDATE ON "${tableName}"
  FOR EACH ROW
  EXECUTE PROCEDURE on_update_timestamp();`;

export const deleteOnUpdateTrigger = (tableName: string) => `
  DROP TRIGGER "${tableName}_updated_at" ON "${tableName}";
`;

export const defaultHistoryFields = (knex: Knex, table: TableBuilder): void => {
  // @ts-ignore
  table.boolean('active').notNullable().defaultTo(true);
  // @ts-ignore

  table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  // @ts-ignore
  table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  // @ts-ignore
  table.timestamp('deleted_at');
};
