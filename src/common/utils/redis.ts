import cache from "express-redis-cache";
import dotenv from 'dotenv';
dotenv.config();

const redis = cache({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  // auth_pass: process.env.REDIS_PASSWORD,
  expire: Number(process.env.REDIS_EXPIRE),
  prefix: process.env.NODE_ENV,
})

export default redis
