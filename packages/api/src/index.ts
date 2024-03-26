import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';



import usersRouter from './routes/users';
import balanceRouter from './routes/balance';
import sendRouter from './routes/send';

dotenv.config();


const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', usersRouter);
app.use('/api', balanceRouter);
app.use('/api', sendRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});