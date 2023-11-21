import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/apiError';

// Middleware для обработки ошибок
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Unpredictable error.' });
};

export default errorHandler;
