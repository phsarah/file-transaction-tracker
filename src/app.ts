/* eslint-disable import/first */

import cors from 'cors';
import express from 'express';

// Open listen connection
const app = express();

import { router } from './routes';

app.use(express.json());
app.use(cors());
app.use(router);


export { app };