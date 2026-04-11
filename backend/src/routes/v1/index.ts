import { Router } from 'express';
import clothesRoutes from './clothes.routes';

const v1Router = Router();

v1Router.get('/', (_req, res) => {
  res.send('API v1 is working!');
});

v1Router.use('/clothes', clothesRoutes);

export default v1Router;
