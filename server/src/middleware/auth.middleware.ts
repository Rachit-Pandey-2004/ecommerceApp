import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken'

export const protect = (req:Request, res:Response, next:NextFunction) => {
    try{
        const token = req.cookies.token
        if (!token){
            res.status(401).json(
                {
                    msg : "UnAuthorized!"
                }
            )
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        // attaching the user info to the request then passing it on
        req.user = decoded
        next();
    }
    catch(error){
        // invalid token
        res.status(403).json(
            {
                msg : "Intruder!"
            }
        )
    }
}