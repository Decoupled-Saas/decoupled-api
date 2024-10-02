import { knex } from 'knex';
import knexFile from '../../../knexfile';
import * as dotenv from 'dotenv';
import { logger } from '@/common/utils/logger';
dotenv.config();

const env = process.env.NODE_ENV || 'development';
// @ts-ignore
const configOptions = knexFile[env];

const db = knex(configOptions);

db.on('query', (query: { bindings: any[]; sqlWithBindings: string; sql: any }) => {
  if (query && query.bindings) {
    query.sqlWithBindings = query.sql;
    query.bindings.forEach((param, index) => {
      const knexBindingChar = `$${index + 1}`; // hardcode or insert logic for binding char by the database dialect you use .. ie. @p, :, $ and index value
      query.sqlWithBindings = query.sqlWithBindings.replace(
        knexBindingChar,
        Number.isNaN(Number(param)) && param !== 'null' ? `'${param}'` : param
      );
    });
  }
  logger.debug(query.sqlWithBindings || query.sql);
});

export default db;
