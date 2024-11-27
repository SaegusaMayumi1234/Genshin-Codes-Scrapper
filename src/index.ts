import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import './utils/uncaughtError';
import config from './config/config';
import logger from './utils/logger';

import NotFound from './middlewares/notFound';
import ErrorHandler from './middlewares/errorHandler';

import './scheduler/scrapeGenshinCodes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app: Express = express();

(async () => {
  app.set('trust proxy', config.proxied);

  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true }));

  app.use(cors());

  app.use(
    morgan('combined', {
      stream: {
        write: (message) => logger.http(message),
      },
    }),
  );

  app.use(express.static(path.join(__dirname, '/public')));

  // app.use('/v1', RoutesV1);

  app.use(NotFound);
  app.use(ErrorHandler);

  app.listen(config.port, () => {
    logger.info(`Genshin-Codes-Scrapper server is running at http://localhost:${config.port}`);
  });
})();
