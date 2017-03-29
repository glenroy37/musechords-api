import {Router, Request, Response, NextFunction} from 'express';
import Users from "../model/Users";

export class TokenRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public get(req: Request, res: Response, next: NextFunction) {
    Users.getInstance().init(true);
    res.send("Token Router works");
  }

  init() {
    this.router.get('/', this.get);

  }
}

const tokenRoutes = new TokenRouter();

export default tokenRoutes.router;
