import type { Request, Response, NextFunction } from 'express';

// Cache middleware for static data
export function cacheControl(maxAge: number = 300) {
  return (req: Request, res: Response, next: NextFunction) => {
    res.set('Cache-Control', `public, max-age=${maxAge}`);
    next();
  };
}

// Cache middleware for frequently accessed API endpoints
export function apiCache(maxAge: number = 600) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    res.set({
      'Cache-Control': `public, max-age=${maxAge}`,
      'ETag': `"${Date.now()}"`,
      'Vary': 'Accept-Encoding'
    });
    
    next();
  };
}

// No cache for dynamic/user-specific data
export function noCache() {
  return (req: Request, res: Response, next: NextFunction) => {
    res.set({
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    next();
  };
}

// Conditional cache based on content type
export function conditionalCache() {
  return (req: Request, res: Response, next: NextFunction) => {
    const userSpecificEndpoints = ['/api/auth', '/api/users', '/api/collections'];
    const isUserSpecific = userSpecificEndpoints.some(endpoint => 
      req.path.startsWith(endpoint)
    );

    if (isUserSpecific) {
      res.set({
        'Cache-Control': 'private, no-cache',
        'Pragma': 'no-cache'
      });
    } else {
      res.set({
        'Cache-Control': 'public, max-age=300',
        'ETag': `"${Date.now()}"`
      });
    }
    
    next();
  };
}