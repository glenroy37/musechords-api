import * as express from "express";
import Request = express.Request;
import Response = express.Response;
import NextFunction = express.NextFunction;
import {JWT, JWTObject} from "../jwt";

export class JWTMiddleWare{
    public static authentificate(req: Request, res: Response, next: NextFunction){
        let jwtObject: JWTObject;
        try{
          jwtObject = JWT.verify(req.headers["token"]);
        } catch (err){
          res.status(403).send();
          next();
        }
        if(jwtObject == null){
          res.status(403).send();
          next();
        }
        if(req.body != null) {
            req.body.originalBody = req.body;
            req.body.jwtObject = jwtObject;
        } else {
            req.body = {jwtObject: jwtObject};
        }
        console.log(JSON.stringify(req.body.jwtObject));
        next();
    }
}
