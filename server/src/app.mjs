import express, { Router } from 'express';
import morgan from 'morgan';
import cors from 'cors';
const app = express();
import { PORT } from './config.mjs';

//settings
app.set("port", PORT);

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//routes

//users
import { usersRouter } from "./routes/users.mjs";
app.use('/api/users', usersRouter);

//bankAccounts
import {bankRouter} from "./routes/bankAccount.mjs";
app.use('/api/bank', bankRouter);

//adultAssign 
import { adultRouter } from "./routes/assignAdult.mjs";
app.use('/api/adult-assign', adultRouter);

//coinExchange
import {coinRouter} from "./routes/coinChange.mjs";
app.use('/api/coin-exchange', coinRouter);


export default app;

