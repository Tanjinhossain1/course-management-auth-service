import { NextFunction, Request, Response, RequestHandler } from 'express';

export const clearableAsync = (func: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      func(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
