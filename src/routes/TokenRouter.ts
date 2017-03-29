import {Router, Request, Response, NextFunction} from 'express';
import Users from "../model/Users";
import {JWT, JWTObject} from '../jwt';

export class TokenRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public get(req: Request, res: Response, next: NextFunction) {
    Users.getInstance().init(true);
    Users.getInstance().newUser("Glenroy", "teier@kagent.at", "123456");
    res.send("Token Router works");
    next();
  }

  public post(req: Request, res: Response, next: NextFunction) {
    Users.getInstance().getUserByPasswordAndName(req.body["username"], req.body["password"]).then(function(){
        res.send({token: JWT.sign(new JWTObject(req.body["username"]))});
        next();
    });
  }

  init() {
    this.router.get('/', this.get);
    this.router.post('/', this.post);
  }
}

const tokenRoutes = new TokenRouter();

export default tokenRoutes.router;
