import {Router, Request, Response, NextFunction} from 'express';

export class TokenRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  public get(req: Request, res: Response, next: NextFunction) {
    res.send("Token Router works");
  }

  init() {
    this.router.get('/', this.get);
  }
}

const tokenRoutes = new TokenRouter();

export default tokenRoutes.router;
