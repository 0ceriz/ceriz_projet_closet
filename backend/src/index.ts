import express from 'express';
import cookieParser from 'cookie-parser';
import v1Router from './routes/v1';
import errorHandler from './middlewares/errorHandler';
import { env } from './config/env';

const app = express();
const { PORT } = env;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', v1Router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`➡️  Server running on port ${PORT}`);
});
