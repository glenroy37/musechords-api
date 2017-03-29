import * as Sequelize from "sequelize";
import DBConnection from "./DBConnection";

import * as sequelize from "sequelize";
import {default as UserManager} from "./Users";
import {ModelManager} from "./Model";
import Bluebird = require("bluebird");



export interface  SheetAttribute {
    id?: number;
    capo?:number;
    author?:string;
    title?:string;
    timesig?:string;
    transpose?:number;
    lyrics?:string;
}

export interface SheetInstance extends Sequelize.Instance<SheetAttribute>, SheetAttribute{ }

export interface SheetModel extends Sequelize.Model<SheetInstance, SheetAttribute> { }

export default class SheetManager extends ModelManager{
    private static _instance: SheetManager = new SheetManager();

    sequelize: Sequelize.Sequelize;
    Sheet: SheetModel;
    userManager: UserManager;

    constructor(){
        super();
        if(SheetManager._instance){
            throw new Error("Tried to create second SheetManager");
        }

        this.userManager = UserManager.getInstance();
        this.sequelize = DBConnection.sequelize;

        this.Sheet = this.sequelize.define<SheetInstance, SheetAttribute>("Sheet", {
            "id": {
                "type": sequelize.INTEGER(10000),
                "primaryKey": true,
                "autoIncrement": true
            },
            "capo": {
                "type": sequelize.INTEGER(13),
                "allowNull": true
            },
            "author": {
                "type": sequelize.STRING(50)
            },
            "title": {
                "type": sequelize.STRING(40)
            },
            "timesig": {
                "type": sequelize.STRING(10),
                "allowNull": true
            },
            "transpose": {
                "type": sequelize.INTEGER(13),
                "allowNull": true
            },
            "lyrics": {
                "type": sequelize.TEXT("50000")
            },
            "userId": {
                "type": sequelize.INTEGER(100),
                "references":{
                    model: this.userManager.User,
                    key: 'id'
                }
            }
        });
    }

    public static getInstance(): SheetManager{
        return SheetManager._instance;
    }

    public createSheet(sheet: SheetAttribute): Bluebird<any>{
        return this.Sheet.create(sheet);
    }

    public getSheetsByUser(userId: number): Bluebird<any>{
        return this.Sheet.findAll({where: {userId: userId}});
    }

    public getSheetById(sheetId: number): Bluebird<any>{
        return this.Sheet.find({where: {id: sheetId}});
    }

    public updateSheet(sheet: SheetAttribute): Bluebird<any> {
        return this.Sheet.update(sheet, {where: {id: sheet.id}});
    }

    public deleteSheet(sheetId: number): Bluebird<any>{
        return this.Sheet.destroy({where: {id:sheetId}});
    }
}