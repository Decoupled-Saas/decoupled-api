import {Router} from 'express';
import fs from 'fs/promises';
import path from 'path';
import {pathToFileURL} from 'url'
import { logger } from '@/common/utils/logger';

const router = Router();
const ignore = ['.DS_Store', 'index.ts'];

async function loadRoutes() {

  const files = await fs.readdir(path.join(__dirname));

  for (const file of files){
    if (!ignore.includes(file)){

      const filePath = path.join(__dirname, file);
      const fileURL = pathToFileURL(filePath).href;

      const routeName = file.split('.')[0]
      const routeVersion = file.split('.')[1]

      const mod = await import(fileURL);
      if (mod.default) {
        logger.info(`Added ${routeVersion}/${routeName}`);
        router.use(`/${routeVersion}/${routeName}`, mod.default);
      }

    }
  }
}

(async () => {
  await loadRoutes();
})();

export default router;
