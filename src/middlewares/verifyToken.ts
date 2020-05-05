import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

interface PayloadInterface{
    id: string;
    iat: number;
    exp: number;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
const token = req.header('authorization')
if(!token) return res.status(401).json('Access Denied')

const payload = jwt.verify(token, 'secretkey') as PayloadInterface;
req.userId = payload.id;

next();
}