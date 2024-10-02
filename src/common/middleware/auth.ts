import { NextFunction } from 'express';
import { ServiceResponse } from '@/common/models/serviceResponse';
import { StatusCodes } from 'http-status-codes';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

const auth =
  (...requiredPermissions) =>
  async (req: Request, res: Response, next: NextFunction) => {
    let serviceResponse;
    try {
      const header = req.headers['authorization'];
      const token = header.split(' ')[1];

      let validToken;
      try {
        validToken = await tokenService.getAccessToken(token);
      } catch (error) {
        return sendErrorResponse(res, Status.UNAUTHORIZED, 'Invalid token');
      }
    } catch (err) {
      serviceResponse = ServiceResponse.failure('Error', err, StatusCodes.BAD_REQUEST);
      return handleServiceResponse(serviceResponse, res);
    }
  };
