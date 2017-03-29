import DBConnection from "./DBConnection";
import * as Sequelize from "sequelize";
import Bluebird = require("bluebird");
import * as PasswordHash from "password-hash";
import {ModelManager} from "./Model";


export interface UserAttribute{
    id?: number;
    name?: string;
    email?: string;
    password?: string;
}

export interface UserInstance extends Sequelize.Instance<UserAttribute>, UserAttribute{
    getUserByPasswordAndName: Sequelize.HasManyGetAssociationsMixin<UserAttribute>;
}

export interface UserModel extends Sequelize.Model<UserInstance, UserAttribute>{ }

export default class UserManager extends ModelManager{
    private static _instance: UserManager = new UserManager();

    sequelize: Sequelize.Sequelize;
    User: UserModel;

    constructor(){
        super();
        if(UserManager._instance){
            throw new Error("Tried to create second singleton of UserManger");
        }
        this.sequelize = DBConnection.getSequelize();
        this.User = this.sequelize.define<UserInstance, UserAttribute>("User", {
            "id": {
                "type": Sequelize.INTEGER(1000),
                "primaryKey": true,
                "autoIncrement": true
            },
            "name": {
                "type": Sequelize.STRING(128),
                "allowNull": false,
                "unique": true,
            },
            "email": {
                "type": Sequelize.STRING(128),
                "allowNull": false,
                "unique": true,
                "validate": {
                    "isEmail": true
                }
            },
            "password": {
                "type": Sequelize.STRING(128),
                "allowNull": false
            }
        }, {
            "timestamps":true
        });
    }

    public static getInstance(): UserManager{
        return UserManager._instance;
    }

    public newUser(name:string, email:string, rawPassword:string):Bluebird<any> {
        let password = PasswordHash.generate(rawPassword);
        return this.User
            .create({
                name: name,
                email: email,
                password: password
            });
    }

    public getUserByPasswordAndName(name:string): Bluebird<any> {
        return this.User.findOne({where: {name: name}});
    }
}