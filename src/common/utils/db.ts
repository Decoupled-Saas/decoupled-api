import { knex } from 'knex';
import knexFile from '../../../knexfile';
import * as dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV || 'development';
// @ts-ignore
const configOptions = knexFile[env];

const db = knex(configOptions);

export default db;
