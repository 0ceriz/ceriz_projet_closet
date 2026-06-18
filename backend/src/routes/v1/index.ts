import { Router } from 'express';
import clothesRoutes from './clothes.routes';
import appUserRoutes from './appUser.routes';
import closetRoutes from './closet.routes';
import authRoutes from './auth.routes';

const v1Router = Router();

v1Router.get('/', (_req, res) => {
  res.send('API v1 is working!');
});

v1Router.use('/users', appUserRoutes);
v1Router.use('/clothes', clothesRoutes);
v1Router.use('/closet', closetRoutes);
v1Router.use('/auth', authRoutes);

export default v1Router;
