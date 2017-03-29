import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import TokenRouter from './routes/TokenRouter';
import SheetRouter from './routes/SheetRouter';
import {JWTMiddleWare} from "./middle-ware/JWTMiddleWare";

class Server {

  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    let router = express.Router();

    this.express.use('/', router);
    this.express.use('/sheets', JWTMiddleWare.authentificate);
    this.express.use('/sheets', SheetRouter);
    this.express.use('/token', TokenRouter);  
  }

}

export default new Server().express;
