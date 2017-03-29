import {Router, Request, Response, NextFunction} from 'express';
import Users from "../model/Users";
import {JWT, JWTObject} from '../jwt';

export class SheetRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public getSpecificSheet(req: Request, res: Response, next: NextFunction) {

    }

    public getAllSheets(req: Request, res: Response, next: NextFunction){

    }

    public newSheet(req: Request, res: Response, next: NextFunction) {

    }

    public updateSheet(req: Request, res:Response, next: NextFunction) {

    }

    init() {
        this.router.get('/:sheetId', this.getSpecificSheet);
        this.router.put('/:sheetId', this.updateSheet);
        this.router.get('/', this.getAllSheets);
        this.router.post('/', this.newSheet);
    }
}

const sheetRoutes = new SheetRouter();

export default sheetRoutes.router;
