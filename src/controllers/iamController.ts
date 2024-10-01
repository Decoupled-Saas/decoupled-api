import { NextFunction } from 'express';
import { rolesService } from '@/services/rolesService';
import { logger } from '@/common/utils/logger';

class IamController {
  async getRoles(req: Request, res: Response) {
    const roles = await rolesService.getAll();
    logger.info(roles);
  }
}

export const iamController = new IamController();
