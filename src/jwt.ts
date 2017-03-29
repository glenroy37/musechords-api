import * as jwt from 'jsonwebtoken';

export class JWT{
    public static jwtSecret: string = "123456"; //PW just for debugging

    public static sign(payload: JWTObject): string{
        return jwt.sign(payload, JWT.jwtSecret);
    }

    public static verify(token: string):JWTObject{
        return jwt.decode(token, JWT.jwtSecret);
    }
}

export class JWTObject{
    public username: string;
    public userId: number;
    constructor(username: string, userId: number){
        this.username = username;
        this.userId = userId;
    }
}