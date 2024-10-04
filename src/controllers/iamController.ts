import { rolesService } from '@/services/rolesService';
import { ServiceResponse } from '@/common/models/serviceResponse';
import { handleServiceResponse } from '@/common/utils/httpHandlers';
import { StatusCodes } from 'http-status-codes';
import { dataValidator } from '@/common/utils/dataValidator';
import { logger } from '@/common/utils/logger';
import { tokenService } from '@/services/tokenService';
import { JWK, JWS } from 'node-jose';
import moment from 'moment';

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

  async deleteRole(req: Request, res: Response) {
    const data = dataValidator(req, res);
    logger.info(`Deleting Role name: ${data.name}`);
    await rolesService.deleteRole(data.name);
    const serviceResponse = ServiceResponse.success('Role Deleted', null, StatusCodes.OK);
    return handleServiceResponse(serviceResponse, res);
  }

  async getKeys(req: Request, res: Response) {
    const tokenList = await tokenService.getTokens();
    const access_keys: any[] = [];
    const refresh_keys: any[] = [];
    tokenList.forEach((element: { access_key: any }) => {
      access_keys.push(element.access_key);
    });
    tokenList.forEach((element: { refresh_key: any }) => {
      refresh_keys.push(element.refresh_key);
    });
    const accessKeyStore = await JWK.asKeyStore({ keys: access_keys });
    const refreshKeyStore = await JWK.asKeyStore({ keys: refresh_keys });
    const serviceResponse = ServiceResponse.success(
      'tokens',
      { access_keys: accessKeyStore.toJSON(), refresh_keys: refreshKeyStore.toJSON() },
      StatusCodes.OK
    );
    return handleServiceResponse(serviceResponse, res);
  }

  async getTestToken(req: Request, res: Response) {
    const tokenList = await tokenService.getTokens();
    const access_keys: any[] = [];
    const refresh_keys: any[] = [];
    tokenList.forEach((element: { access_key: any }) => {
      access_keys.push(element.access_key);
    });
    tokenList.forEach((element: { refresh_key: any }) => {
      refresh_keys.push(element.refresh_key);
    });

    const aks = { keys: access_keys };
    const rks = { keys: refresh_keys };

    const accessKeyStore = await JWK.asKeyStore(aks);
    const refreshKeyStore = await JWK.asKeyStore(rks);

    const [access_key] = accessKeyStore.all({ use: 'sig' });
    const [refresh_key] = refreshKeyStore.all({ use: 'sig' });

    const access_opt = { compact: true, jwk: access_key, fields: { type: 'jwt' } };
    const payload = JSON.stringify({
      exp: moment().add(1, 'days').unix(),
      iat: moment().unix(),
      sub: 'test'
    });

    const access_token = await JWS.createSign(access_opt, access_key).update(payload).final();
    const refresh_token = await JWS.createSign(access_opt, refresh_key).update(payload).final();

    const serviceResponse = ServiceResponse.success(
      'test tokens',
      { access_key: access_token, refresh_key: refresh_token },
      StatusCodes.OK
    );
    return handleServiceResponse(serviceResponse, res);
  }
}

export const iamController = new IamController();
