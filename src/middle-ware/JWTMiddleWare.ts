import * as express from "express";
import Request = express.Request;
import Response = express.Response;
import NextFunction = express.NextFunction;
import {JWT, JWTObject} from "../jwt";

export class JWTMiddleWare{
    public static authentificate(req: Request, res: Response, next: NextFunction){
        let jwtObject: JWTObject = JWT.verify(req.params.token);
        req.params.token = jwtObject;
    }
}