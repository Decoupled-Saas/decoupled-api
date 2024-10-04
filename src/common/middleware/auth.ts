import { NextFunction } from 'express';
import { ServiceResponse } from '@/common/models/serviceResponse';
import { StatusCodes } from 'http-status-codes';
import { handleServiceResponse } from '@/common/utils/httpHandlers';
import { tokenService } from '@/services/tokenService';
import { JWK } from 'node-jose';
import jwt, { JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import { rolesService } from '@/services/rolesService';
export const auth = (requiredPermissions: string) => async (req: Request, res: Response, next: NextFunction) => {
  let serviceResponse;

  try {
    const header = req.headers['authorization'];
    if (!header) {
      serviceResponse = ServiceResponse.failure('authorization header not provided', null, StatusCodes.UNAUTHORIZED);
      return handleServiceResponse(serviceResponse, res);
    }
    const token = header.split(' ')[1];

    let validToken;
    try {
      validToken = await tokenService.getAccessToken(token);
    } catch (error) {
      serviceResponse = ServiceResponse.failure('Invalid token', null, StatusCodes.UNAUTHORIZED);
      return handleServiceResponse(serviceResponse, res);
    }

    if (!validToken.id) {
      serviceResponse = ServiceResponse.failure('Banned token', null, StatusCodes.UNAUTHORIZED);
      return handleServiceResponse(serviceResponse, res);
    }

    const tokenPartial = JSON.parse(Buffer.from(token.split('.')[0], 'base64').toString('ascii'));
    const accessKeys = await tokenService.getTokens();
    const keys = [];

    accessKeys.forEach((element: { access_key: any }) => {
      keys.push(element.access_key);
    });

    const accessKeyStore = await JWK.asKeyStore({ keys: keys });

    let key;
    try {
      key = accessKeyStore.get(tokenPartial.kid);
    } catch (error) {
      serviceResponse = ServiceResponse.failure('Signing Key not found', null, StatusCodes.UNAUTHORIZED);
      return handleServiceResponse(serviceResponse, res);
    }

    let decoded;
    try {
      const pem = jwkToPem(key.toJSON(true));
      decoded = jwt.verify(token, pem, (err: any, decoded: void) => {
        if (err instanceof TokenExpiredError) {
          serviceResponse = ServiceResponse.failure(
            'Unauthorized! Access Token was expired!',
            null,
            StatusCodes.UNAUTHORIZED
          );
          return handleServiceResponse(serviceResponse, res);
        }
        if (err instanceof NotBeforeError) {
          serviceResponse = ServiceResponse.failure('Token not active', null, StatusCodes.UNAUTHORIZED);
          return handleServiceResponse(serviceResponse, res);
        }
        if (err instanceof JsonWebTokenError) {
          serviceResponse = ServiceResponse.failure('Token malformed', null, StatusCodes.UNAUTHORIZED);
          return handleServiceResponse(serviceResponse, res);
        }
        return decoded;
      });
    } catch (err) {
      serviceResponse = ServiceResponse.failure(
        'Error decoding the token, please request a new verification token, or contact Support',
        null,
        StatusCodes.UNAUTHORIZED
      );
      return handleServiceResponse(serviceResponse, res);
    }
    req.user = decoded.sub;
    req.role = decoded.role;
    req.org = decoded.org;
  } catch (err) {
    serviceResponse = ServiceResponse.failure('Authorization required', err.stack, StatusCodes.UNAUTHORIZED);
    return handleServiceResponse(serviceResponse, res);
  }

  let validRole;
  try {
    console.log(req.role, requiredPermissions);
    validRole = await rolesService.roleHasPermission(req.role, requiredPermissions);
  } catch (error) {
    serviceResponse = ServiceResponse.failure('Permission denied', null, StatusCodes.UNAUTHORIZED);
    return handleServiceResponse(serviceResponse, res);
  }

  console.log(validRole);
  if (!validRole?.role_id) {
    serviceResponse = ServiceResponse.failure('Permission denied', null, StatusCodes.UNAUTHORIZED);
    return handleServiceResponse(serviceResponse, res);
  }
  next();
};
