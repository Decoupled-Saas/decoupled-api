import { NextFunction, Request, Response } from 'express';

// @ts-ignore
export const wrapper = (fn) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);
