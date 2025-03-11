import jwt from 'jsonwebtoken';
import Token from '../models/token.js';
import UserModel from '../models/user.js';
import dotenv from "dotenv";

dotenv.config();

export const auth = (roles = [], isPublic = false) => async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token ) {
      return res.status(401).json({ message: "Unauthorized user: Token missing", success: false });
    }

  

    let decoded;
    try {
      decoded = jwt.verify(token, isPublic ? process.env.ACCESS_TOKEN_PUBLIC_KEY : process.env.ACCESS_TOKEN_PRIVATE_KEY);
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token", success: false });
    }

    // Fetch user and token in a single query
    const user = await UserModel.findById(decoded.id);
    const userToken = await Token.findOne({ userId: decoded.id, accessToken: token });

    if (!user) {
      return res.status(401).json({ message: "User not found", success: false });
    }

    if (!userToken) {
      return res.status(401).json({ message: "Token is invalid or expired", success: false });
    }

    if (roles.length && !roles.includes(user.role)) {
      return res.status(403).json({ message: "Access denied: Insufficient permissions", success: false });
    }

    req.userId = decoded.id;
    req.userEmail = decoded.email;
    req.userRole = user.role;
    req.user = user;

    next();
  } catch (err) {
    return res.status(500).json({ message: "Server error: " + err.message, success: false });
  }
};
