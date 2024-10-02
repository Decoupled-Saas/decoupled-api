import { NextFunction } from 'express';
import { ServiceResponse } from '@/common/models/serviceResponse';
import { StatusCodes } from 'http-status-codes';
import { handleServiceResponse } from '@/common/utils/httpHandlers';
import { tokenService } from '@/services/tokenService';
import { jwtService } from '@/services/jwtService';
import { JWK } from 'node-jose';

export const auth =
  (...requiredPermissions: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(...requiredPermissions);
    let serviceResponse;

    try {
      const JWTKeys = await jwtService.findAll();
      const keys: any[] = [];
      JWTKeys.forEach((element) => {
        keys.push(element.access_key);
      });

      const keyStore = { keys: keys };

      const accessKeyStore = await JWK.asKeyStore(keyStore);

      console.log(accessKeyStore);

      const header = req.headers['authorization'];
      if (!header) {
        serviceResponse = ServiceResponse.failure('authorization header not provided', null, StatusCodes.UNAUTHORIZED);
        return handleServiceResponse(serviceResponse, res);
      }
      const token = header.split(' ')[1];

      if (!token) {
        serviceResponse = ServiceResponse.failure('No token provided', null, StatusCodes.UNAUTHORIZED);
        return handleServiceResponse(serviceResponse, res);
      }

      let validToken;
      try {
        validToken = await tokenService.getAccessToken(token);
      } catch (error) {
        serviceResponse = ServiceResponse.failure('Invalid token', null, StatusCodes.UNAUTHORIZED);
        return handleServiceResponse(serviceResponse, res);
      }

      if (!validToken?.id) {
        serviceResponse = ServiceResponse.failure('Banned token', null, StatusCodes.UNAUTHORIZED);
        return handleServiceResponse(serviceResponse, res);
      }

      const tokenPartial = JSON.parse(Buffer.from(token.split('.')[0], 'base64').toString('ascii'));
    } catch (err) {
      serviceResponse = ServiceResponse.failure('Error', err.stack, StatusCodes.BAD_REQUEST);
      return handleServiceResponse(serviceResponse, res);
    }
  };
