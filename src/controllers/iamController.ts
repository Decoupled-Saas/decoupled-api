import { rolesService } from '@/services/rolesService';
import { ServiceResponse } from '@/common/models/serviceResponse';
import { handleServiceResponse } from '@/common/utils/httpHandlers';
import { StatusCodes } from 'http-status-codes';
import { dataValidator } from '@/common/utils/dataValidator';
import { logger } from '@/common/utils/logger';

class IamController {
  async getRoles(req: Request, res: Response) {
    const roles = await rolesService.getAll();
    const serviceResponse = ServiceResponse.success('Roles', roles, StatusCodes.OK);
    // @ts-ignore
    return handleServiceResponse(serviceResponse, res);
  }

  async createRole(req: Request, res: Response) {
    const data = dataValidator(req, res);
    logger.info(`Creating Role name: ${data.name}`);

    let serviceResponse;
    // @ts-ignore
    const exists = await rolesService.roleExists(data.name);
    if (exists?.name) {
      logger.error(`Role name: ${data.name} already exists`);
      serviceResponse = ServiceResponse.failure(
        'Role already exists',
        { name: exists.name, description: exists.description },
        StatusCodes.CONFLICT
      );
      return handleServiceResponse(serviceResponse, res);
    }

    await rolesService.createRole(data.name, data.description);
    serviceResponse = ServiceResponse.success(
      'Role Created',
      { name: data.name, description: data.description },
      StatusCodes.CREATED
    );
    return handleServiceResponse(serviceResponse, res);
  }
}

export const iamController = new IamController();
