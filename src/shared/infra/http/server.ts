
import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config'

import express, { NextFunction, Request, Response } from 'express'
import routes from './routes' 
import AppError from '../../errors/AppError';

import '../typeorm/';
import '../../container'
import '../../container/providers'


const app = express()
const port = process.env.PORT||'3333'

app.use(express.json())
app.use(routes)


app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(port,()=>{
  console.log("Server started in port: " + port)
})