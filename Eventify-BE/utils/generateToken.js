import jwt from 'jsonwebtoken'
import Token from '../models/token.js'
import dotenv from "dotenv"
dotenv.config()

export const generateTokens = async (
  email,
  userId,
  role
) => {
  try {
    if (!email || !userId) {
      throw new Error("Email and userId are required to generate tokens");
    }

    const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY || "30d";
    const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY || "30d";
    const payload = {
      email,
      id: userId,
      role
    };

    const [accessToken, refreshToken] = [
      jwt.sign(payload, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
        expiresIn: accessTokenExpiry,
      }),
      jwt.sign(payload, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
        expiresIn: refreshTokenExpiry,
      }),
    ];



    await Token.deleteMany({ userId });

    await Token.create({
      userId,
      refreshToken,
      accessToken,
      accessTokenExpiry,
      refreshTokenExpiry,
    });

    return {
      accessToken,
      refreshToken,
      accessTokenExpiry,
      refreshTokenExpiry,
    };
  } catch (error) {
    throw new Error(`Failed to generate tokens: ${error.message}`);
  }
};

