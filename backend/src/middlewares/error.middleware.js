import env from '../config/env.js';
import AppError from '../utils/AppError.js';


export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // DEVELOPMENT
  if (env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }

  // PRODUCTION
  if (err instanceof AppError || err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // UNKNOWN ERROR
  console.error('ERROR:', err);

  return res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!',
  });
};
