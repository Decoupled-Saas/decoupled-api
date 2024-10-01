// @ts-nocheck
import { validationResult, matchedData } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { ServiceResponse } from '@/common/models/serviceResponse';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

export const dataValidator = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = {
      message: {},
      error: undefined
    };

    err.message = errors
      .array()
      .map((element) => `${element.param} - has Error: ${element.msg}`)
      .toString();
    err.error = errors.array();
    const serviceResponse = ServiceResponse.failure('Error', err, StatusCodes.BAD_REQUEST);
    return handleServiceResponse(serviceResponse, res);
  }
  return matchedData(req);
};
