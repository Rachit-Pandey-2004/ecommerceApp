import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

// export const validUsername
export const register = async (req:Request,res:Response) => {
    try{
        const {username, email, password} = req.body;
        //check if the user exists before hand
        console.log(username, email , password)
        const exitUserStatus = await User.findOne({username});
        if(exitUserStatus){
            return res.status(400).json(
                {
                    user : "User already exists"
                }
            );
        }
        else{
            const user = User.create(
                {
                    username, 
                    email, 
                    password
                }
            );
            res.status(200).json(
                {
                    msg : "activity completed"
                }
            )
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json(
            {
                msg : "server error!"
            }
        )
    }
}

export const login = async (req:Request, res:Response)=>{
    try{
        const {email, password} = req.body;
        // checks if the user with the mail exists
        const user = await User.findOne({email});
        if(!user){
            res.status(400).json(
                {
                    msg : "Invalid Credentials!"
                }
            )
        }
        const validPassword = await user.comparePassword(password);
        if(!validPassword){
            res.status(400).json(
                {
                    msg : "Invalid Credentials!"
                }
            )
        }
        //now generate JWT token
        const token = jwt.sign(
            {
                id : user?._id
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn : "1h"
            }
        )
        res.cookie(
            "token",
            token,
            {
                "httpOnly": true
            }
        )
        res.status(200).json(
            {
                msg : "activity completed",
                token
            }
        )
    }
    catch(error){
        res.status(500).json(
            {
                msg : "server error !"
            }
        )
    }
}

export const logout = async (req:Request, res:Response)=>{
    res.clearCookie("token");
    res.status(200).json(
        {
            msg : "activity completed"
        }
    );
}