import Bluebird = require("bluebird");
import * as Sequelize from "sequelize";

export abstract class ModelManager {
    sequelize: Sequelize.Sequelize;

    public init(newTable?:boolean):Bluebird<any> {
        newTable = newTable || false;
        if(newTable){
            return this.sequelize.sync({force: true});
        }
        return null;
    }
}