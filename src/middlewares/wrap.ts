import { Request, Response, NextFunction } from 'express';

export default (fn: (req: Request, res: Response, next: NextFunction) => Promise<void> | void) =>
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
