import 'express';
import { AppUserPublic } from './appUser.types';

declare global {
  namespace Express {
    interface Request {
      user?: AppUserPublic;
    }
  }
}
