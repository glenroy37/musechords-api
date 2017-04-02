import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import Users from './model/Users';
import Sheets from './model/Sheets';
import TokenRouter from './routes/TokenRouter';
import SheetRouter from './routes/SheetRouter';
import {JWTMiddleWare} from "./middle-ware/JWTMiddleWare";
import Request = express.Request;
import Response = express.Response;
import NextFunction = express.NextFunction;


class Server {

  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }
    //JUST FOR DEBUG
    /*public initialize(req: Request, res: Response, next: NextFunction): void {
        Users.getInstance().init(true).then(function(){
            Users.getInstance().newUser("Glenroy", "teier@kagent.at", "123456").then(function(){
                Sheets.getInstance().init(true).then(function(){
                    res.send("Database Reset done");
                    next();
                });
            });
        });
    }*/


    private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    let router = express.Router();

    this.express.use('/', router);
    this.express.use('/sheets', SheetRouter);
    this.express.use('/token', TokenRouter);

    //JUST FOR DEBUG
    //this.express.get('/db', this.initialize);
  }

}

export default new Server().express;
