import { NextFunction, Request, Response } from 'express';

import ApiError from '../utils/apiError';
import httpStatus from 'http-status';

export default (req: Request, res: Response, next: NextFunction) => next(new ApiError(httpStatus.NOT_FOUND, 'Route not found', 'ROUTE_NOT_FOUND'));
