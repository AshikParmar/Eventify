import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendResetPassword } from "../services/emailService.js";

export const forgotPassword = async (req, res) => {
    
    try {
        const { email } = req.body;

        const user = await User.findOne({ email:email });

        if (!user) {
            console.log(`User not found for email: ${email}`);
            return res.status(404).json({ success: false, message: "User not found!" });
          }

          
        // Generate a password reset token (valid for 15 minutes)
        const token = jwt.sign({ id: user._id }, process.env.FORGET_SECRET_KEY, { expiresIn: "15m" });

        // Send email with reset link
       const emailRes = await sendResetPassword(user, token);

       res.json({ success: true, message: emailRes?.message || "email sent successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error in Generate token." });
    }
};


export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.FORGET_SECRET_KEY);

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });

        res.json({ success: true, message: "Password reset successfully!" });
    } catch (error) {
        res.status(400).json({ success: false, message: "Invalid or expired token." });
    }
};