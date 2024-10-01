import * as knexFile from 'knexfile';

import { knex } from 'knex';
import dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV || 'development';

// @ts-ignore
const knexInstance = knex(knexFile[env]);

export default knexInstance;
