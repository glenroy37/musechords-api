import {Router, Request, Response, NextFunction} from 'express';
import Users from "../model/Users";
import Sheets from "../model/Sheets";
import {JWT, JWTObject} from '../jwt';
import {JWTMiddleWare} from "../middle-ware/JWTMiddleWare";

export class SheetRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public getSpecificSheet(req: Request, res: Response, next: NextFunction) {
        Sheets.getInstance().getSheetById(req.params.sheetId).then(function(sheet){
            res.send(sheet);
            next();
        });
    }

    public getAllSheets(req: Request, res: Response, next: NextFunction) {
        Sheets.getInstance().getSheetsByUser(req.body.jwtObject.username).then(function(sheets){
            res.send(sheets);
            next();
        });
    }

    public newSheet(req: Request, res: Response, next: NextFunction) {
        Sheets.getInstance().createSheet(req.body.originalBody).then(function(sheet){
            res.send(sheet);
            next();
        });
    }

    public deleteSheet(req: Request, res: Response, next: NextFunction) {
        Sheets.getInstance().deleteSheet(req.params.sheetId).then(function (count) {
           res.send({affectedRows: count});
           next();
        });
    }

    public updateSheet(req: Request, res:Response, next: NextFunction) {
        if(req.params.sheetId != req.body.originalBody.id){
            res.send("Invalid Body");
            next();
        }
        Sheets.getInstance().updateSheet(req.body.originalBody).then(function(count){
            res.send({affectedRows: count});
            next();
        });
    }

    init() {
        this.router.use(JWTMiddleWare.authentificate);
        this.router.get('/:sheetId', this.getSpecificSheet);
        this.router.put('/:sheetId', this.updateSheet);
        this.router.delete('/:sheetId', this.deleteSheet);
        this.router.get('/', this.getAllSheets);
        this.router.post('/', this.newSheet);
    }
}

const sheetRoutes = new SheetRouter();

export default sheetRoutes.router;
