import { dataValidator } from '@/common/utils/dataValidator';
import { ServiceResponse } from '@/common/models/serviceResponse';
import { StatusCodes } from 'http-status-codes';
import { handleServiceResponse } from '@/common/utils/httpHandlers';
import { organisationService } from '@/services/organisationService';
import { rolesService } from '@/services/rolesService';
import { userService } from '@/services/userService';
import { organisationUserService } from '@/services/organisationUserService';
import { tokenService } from '@/services/tokenService';

class AuthController {
  async register(req: Request, res: Response) {
    const data = dataValidator(req, res);

    const organisation = await organisationService.create(data.company, data.email);
    const role = await rolesService.findRoleByName('owner');
    const user = await userService.createUser(
      data.first_name,
      data.last_name,
      data.email,
      data.password,
      organisation.id
    );
    await organisationUserService.create(user.id, organisation.id, role.id);
    const tokens = await tokenService.generateAuthTokens(user.id, organisation.id, role.id);

    const serviceResponse = ServiceResponse.success('User Registered', tokens, StatusCodes.CREATED);
    return handleServiceResponse(serviceResponse, res);
  }

  async login(req: Request, res: Response) {
    const data = dataValidator(req, res);
    const serviceResponse = ServiceResponse.success('User Logged In', data, StatusCodes.OK);
    return handleServiceResponse(serviceResponse, res);
  }
}

export const authController = new AuthController();
