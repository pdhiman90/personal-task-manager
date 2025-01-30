
import { HTTPStatusCodes } from "@bizcuit/httpstatuscodes";
import { Request, Response } from "express";
import AuthService from "../services/auth.services";
import jwt from "jsonwebtoken";

const authUser = new AuthService();
const signup = async (req:Request, res:Response): Promise<any> => {
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        return res.status(HTTPStatusCodes.BAD_REQUEST).json({message:"Please fill all the fields"});
    }
    const payload={
        username,
        email,
        password
    }
    const existingUser = await authUser.findUser(payload);
    if(existingUser){
        return res.status(HTTPStatusCodes.BAD_REQUEST).json({message:"User already exists"});
    }
    const response = await authUser.registerUser(payload);
    const token = jwt.sign({username:payload.username,email:payload.email},"secretkey",{
        expiresIn:"10d"
    });
    if(!response){
        return res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json({message:"Something went wrong"});

    }
    return res.status(HTTPStatusCodes.OK).json({
        status:true,
        data:{token},
        message:"User created successfully"});
};

const login = async (req:Request, res:Response): Promise<any> => {
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(HTTPStatusCodes.BAD_REQUEST).json({message:"Please fill all the fields"});
    }
    const payload={
        email,
        password
    }
    const user:any = await authUser.findUser(payload);
    if(!user){
        return res.status(HTTPStatusCodes.BAD_REQUEST).json({message:"User not found"});
    }
    const token = jwt.sign({id:user._id,username:user.username,email:payload.email},"secretkey",{
        expiresIn:"10d"
    });
    const response = await authUser.loginUser(payload);
    if(!response){
        return res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json({
            status:false,
            message:"Something went wrong"});

    }
    return res.status(HTTPStatusCodes.OK).json(
        {
            status:true,
            data:{token},
            message:"User logged in successfully"});
}
const profile = async (req:Request, res:Response): Promise<any> => {
   console.log("Welcome to profile"); 
   res.send("Welcome to profile");
}
export default {signup,login,profile};
