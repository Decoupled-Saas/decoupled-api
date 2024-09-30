const rateLimit = require('express-rate-limit');
const { env } = require('../utils/envConfig');

const rateLimiter = rateLimit({
  legacyHeaders: true,
  limit: env.COMMON_RATE_LIMIT_MAX_REQUESTS,
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  windowMs: 15 * 60 * env.COMMON_RATE_LIMIT_WINDOW_MS,
  keyGenerator: (req) => req.ip
});

module.exports = rateLimiter;
