import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateTokens } from "../utils/generateToken.js";
import dotenv from "dotenv"
dotenv.config();


// Get All Users
export const getUsers = async (req, res) => {
  try {
      const Users = await (await User.find()).filter(user => user.role === "User");
      if (Users.length === 0) {
          return res.status(404).json({ success: false, message: "No Users found" });
      }
      res.status(200).json({ success: true, data: Users });
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};


export const signUp = async(req,res)=>{
   try {

    const {username,email,password,role} = req.body;

    if(!username || !email || !password) 
        return res.status(400).json({
           success:false,
           message:"All fields are required"
        })

    const isExist = await User.findOne({email:email})
    if(isExist){
      return res.status(400).json({
        success:false,
        message:"Email is already exist"
      })
    }

    const hashedPassword = await bcrypt.hash(password,10);   
    const user = await User.create({
        username,
        email,
        password:hashedPassword,
        role
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

export const signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        email: email,
      });
  
      if (!user) {
        return res.status(400).json({
          status: -1,
          message: "You have to register or please verify your email",
          success: false,
        });
      }
  
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res
          .status(400)
          .json({ success: false, message: "Password Does Not Match" });
      }
      
  
      const { accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry } =
        await generateTokens(email, user?._id, user?.role);
  
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user,
        accessToken,
        accessTokenExpiry,
        refreshToken,
        refreshTokenExpiry,
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  };