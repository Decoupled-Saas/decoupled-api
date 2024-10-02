import { dataValidator } from '@/common/utils/dataValidator';
import { ServiceResponse } from '@/common/models/serviceResponse';
import { StatusCodes } from 'http-status-codes';
import { handleServiceResponse } from '@/common/utils/httpHandlers';
import { organisationService } from '@/services/organisationService';
import { roleService } from '@/services/roleService';
import { userService } from '@/services/userService';

class AuthController {
  async register(req: Request, res: Response) {
    const data = dataValidator(req, res);

    const organisation = await organisationService.create(data.company, data.email);
    const role = await roleService.findRoleByName('owner');
    const user = await userService.createUser(
      data.first_name,
      data.last_name,
      data.email,
      data.password,
      organisation.id
    );
    const serviceResponse = ServiceResponse.success('User Registered', user, StatusCodes.CREATED);
    return handleServiceResponse(serviceResponse, res);
  }
}

export const authController = new AuthController();
