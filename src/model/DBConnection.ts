import * as Sequelize from "sequelize";

export default class DBConnection{
    static sequelize: Sequelize.Sequelize;

     public static getSequelize(): Sequelize.Sequelize{
        if(this.sequelize != null){
            return this.sequelize;
        } else{
            return this.initSequelize();
        }
    }

    static initSequelize(): Sequelize.Sequelize {
        this.sequelize = new Sequelize('mc.db', null, null, {
            dialect: 'sqlite',
            pool: {
                max: 10,
                min: 0,
                idle: 10000
            },
            storage: 'mc.db'
        });

        return this.sequelize;
    }
}