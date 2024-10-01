import express, { Express } from 'express';
import { logger } from '@/common/utils/logger';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import errorHandler from '@/common/middleware/errorHandler';
import rateLimiter from '@/common/middleware/rateLimiter';
import { env } from '@/common/utils/envConfig';
import routes from '@/routes';

const app: Express = express();
const morganFormat = ':method :url :status :res[content-length] - :response-time ms'; // Customize format

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(morgan(morganFormat, { stream: logger.stream }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

app.get('/', (req, res) => {
  res.redirect('/api/latest/docs');
});

app.use('/api', routes);
app.use(errorHandler());
export { app, logger };
