import { NextFunction, Request, Response } from 'express';
import { USER_ROLE } from './db/models/user.entity';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from 'configuration';

const ROUTE_ALLOW = {
  [USER_ROLE.ACCOUNTANT]: ['/invoice/create', '/invoice/update'],
  [USER_ROLE.VIEWER]: ['/invoice/list', '/invoice/details'],
};

export async function RoleMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req?.header('access_token');
  let token_data;
  try {
    token_data = verify(token, JWT_SECRET);
  } catch (e) {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  // pending database check token
  const role_str = token_data?.role?.toString();
  if (req?.body) req.body.user_id = token_data?.id;
  if (req?.query) req.query.user_id = token_data?.id;
  if (role_str == USER_ROLE.ADMIN) return next();
  if (!ROUTE_ALLOW[role_str]?.includes(req?.url))
    return res.status(403).json({ message: 'Unauthorized' });
  return next();
}
