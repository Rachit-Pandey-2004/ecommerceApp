import {Resquest, Response} from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const register = async (req:Resquest,res:Response) => {
    try{
        const {username, email, password} = req.body;
        //check if the user exists before hand
        const exitUserStatus = User.findOne(username);
        if(exitUserStatus)
            return res.status(400).json({user:"User already exists"});
    }
    catch(error){}
}