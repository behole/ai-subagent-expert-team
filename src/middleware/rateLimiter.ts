/**
 * Rate limiting middleware for production API
 */

import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private requests: Map<string, RateLimitEntry> = new Map();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests = 100, windowMs = 15 * 60 * 1000) { // 100 requests per 15 minutes
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;

    // Clean up expired entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.requests.entries()) {
      if (now > entry.resetTime) {
        this.requests.delete(key);
      }
    }
  }

  private getClientKey(req: Request): string {
    // Use API key if available, otherwise IP address
    const apiKey = req.headers['x-api-key'] as string;
    if (apiKey) {
      return `api:${apiKey}`;
    }
    return `ip:${req.ip || req.connection.remoteAddress || 'unknown'}`;
  }

  public middleware() {
    return (req: Request, res: Response, next: NextFunction): void => {
      const clientKey = this.getClientKey(req);
      const now = Date.now();

      let entry = this.requests.get(clientKey);

      if (!entry || now > entry.resetTime) {
        // Create new entry or reset expired entry
        entry = {
          count: 1,
          resetTime: now + this.windowMs,
        };
        this.requests.set(clientKey, entry);
        return next();
      }

      if (entry.count >= this.maxRequests) {
        logger.warn('Rate limit exceeded', {
          clientKey,
          count: entry.count,
          resetTime: new Date(entry.resetTime).toISOString(),
          path: req.path,
          method: req.method,
        });

        res.status(429).json({
          error: 'Rate limit exceeded',
          message: `Too many requests. Limit: ${this.maxRequests} requests per ${this.windowMs / 1000} seconds`,
          retryAfter: Math.ceil((entry.resetTime - now) / 1000),
        });
        return;
      }

      // Increment request count
      entry.count++;
      this.requests.set(clientKey, entry);

      // Add rate limit headers
      res.set({
        'X-RateLimit-Limit': this.maxRequests.toString(),
        'X-RateLimit-Remaining': (this.maxRequests - entry.count).toString(),
        'X-RateLimit-Reset': Math.ceil(entry.resetTime / 1000).toString(),
      });

      next();
    };
  }
}

// Create rate limiter instance
const rateLimiterInstance = new RateLimiter(
  parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000') // 15 minutes
);

export const rateLimiter = rateLimiterInstance.middleware();