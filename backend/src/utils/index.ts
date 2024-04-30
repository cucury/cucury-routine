import { Request } from 'express';
export const getUserHash = (req: Request) => {
  return Array.isArray(req.headers['x-user-id']) ? req.headers['x-user-id'][0] : req.headers['x-user-id'] || '';
}