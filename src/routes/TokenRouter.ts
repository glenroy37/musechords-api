import {Router, Request, Response, NextFunction} from 'express';
import Users from "../model/Users";
import {JWT, JWTObject} from '../jwt';
import * as PasswordHash from 'password-hash';

export class TokenRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }


  public post(req: Request, res: Response, next: NextFunction) {
    Users.getInstance().getUserByPasswordAndName(req.body["username"]).then(function(user){
        if(user == null){
            res.status(403).send({"error":"No user with that name and password found"});
            next();
        }
        if(PasswordHash.verify(req.body["password"], user.password)){
            res.send({token: JWT.sign(new JWTObject(user.name, user.id))});
            next();
        } else {
            res.status(403).send({"error":"No user with that name and password found"});
            next();
        }

    });
  }

    public static corsToken(req: Request, res: Response, next: NextFunction){
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', 'false');
        res.header('Access-Control-Allow-Headers', 'Content-Type,token');
        res.header('Access-Control-Allow-Methods', 'POST');
        next();
    }

  init() {
    this.router.use(TokenRouter.corsToken);
    this.router.post('/', this.post);
  }
}

const tokenRoutes = new TokenRouter();

export default tokenRoutes.router;
