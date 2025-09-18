/**
 * Global error handling middleware for production API
 */

import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export interface IAPIError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export function errorHandler(
  error: IAPIError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Log the error
  logger.error('API Error:', {
    message: error.message,
    stack: error.stack,
    statusCode: error.statusCode,
    isOperational: error.isOperational,
    path: req.path,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString(),
  });

  // Determine status code
  const statusCode = error.statusCode || 500;

  // Determine if we should expose error details
  const isProduction = process.env.NODE_ENV === 'production';
  const shouldExposeError = !isProduction || error.isOperational;

  // Send error response
  res.status(statusCode).json({
    error: true,
    message: shouldExposeError ? error.message : 'Internal server error',
    ...(shouldExposeError && { details: error.name }),
    ...(!isProduction && { stack: error.stack }),
    timestamp: new Date().toISOString(),
    requestId: req.headers['x-request-id'] || 'unknown',
  });
}

export class APIError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.name = 'APIError';

    Error.captureStackTrace(this, this.constructor);
  }
}

// Common error creators
export const createValidationError = (message: string) =>
  new APIError(message, 400, true);

export const createNotFoundError = (resource: string) =>
  new APIError(`${resource} not found`, 404, true);

export const createUnauthorizedError = (message = 'Unauthorized') =>
  new APIError(message, 401, true);

export const createForbiddenError = (message = 'Forbidden') =>
  new APIError(message, 403, true);

export const createInternalError = (message = 'Internal server error') =>
  new APIError(message, 500, false);