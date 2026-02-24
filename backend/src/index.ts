import express from 'express';
import cookieParser from 'cookie-parser';
import v1Router from './routes/v1';
const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', v1Router);

app.listen(PORT, () => {
  console.log(`➡️  Server running on port ${PORT}`);
});