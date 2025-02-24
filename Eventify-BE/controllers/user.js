import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async(req,res)=>{
   try {

    const {username,email,password} = req.body;

    if(!username || !email || !password) 
        return res.status(400).json({
           success:false,
           message:"All fields are required"
        })

    const hashedPassword = await bcrypt.hash(password,10);   
    const user = await User.create({
        username,
        email,
        password:hashedPassword
    });

    return res.status(201).json({
        user,
        success:true, 
        message:"Account Created"
    })    
   } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
   }    
}

export const signIn = async(req,res)=>{
   try {
    const {email,password} = req.body;
    if(!email || !password) {
        return res.status(400).json({
            success:false,
            message:"Fill the field"
        })
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            success:false,
            message:"User Does not Exists"
        })
    }
    
    const matchPassword = await bcrypt.compare(password,user.password);
    if(!matchPassword){
        return res.status(400).json({
            success:false,
            message:"Incorrect Password"
        })
    }

    const token = await jwt.sign({id:user._id}, process.env.SECRET_KEY, {expiresIn :'1d'});
    return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
        message: `Welcome back ${user.username}`,
        success: true,
        user,
        token
    });

   } 
   catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
   }
}