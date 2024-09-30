import { Request, Response, Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { generateOpenAPIDocument } from '@/api-docs/openAPIDocumentGenerator';

const router = Router();
const openAPIDocument = generateOpenAPIDocument();

router.get('/swagger.json', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(openAPIDocument);
});

router.use('/', swaggerUi.serve, swaggerUi.setup(openAPIDocument));

export default router;
