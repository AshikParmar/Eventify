import User from "../models/user.js";
import bcrypt from "bcrypt";
import { generateTokens } from "../utils/generateToken.js";


export const googleLogin = async (req, res) => {
  try {
    const { email, name, googleId } = req.body;

    let user = await User.findOne({ email });

    if (user && user.password && (!user.googleId || user.googleId !== googleId)) {
      return res.status(400).json({
        success: false,
        message: "Use email login."
      });
    }
    if (!user) {
      user = new User({
        googleId,
        username: name,
        email,
      });
      await user.save();
    }

    const { accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry } =
      await generateTokens(email, user?._id, user?.role);

    return res.status(200).json({
      success: true,
      user,
      accessToken,
    });

  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Signup
export const signUp = async (req, res) => {
  try {

    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({
        success: false,
        message: "All fields are required!"
      })

    if (email !== email.toLowerCase()) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email!"
      })
    }

    const isExist = await User.findOne({ email: email })
    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "Email is already exist"
      })
    }

    if (password.length < 4) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 4 characters long."
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while registering the user"
      })
    }

    return res.status(201).json({
      user: createdUser,
      success: true,
      message: "Account Created"
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}


// Login 
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(400).json({
        status: -1,
        message: "You have to register",
        success: false,
      });
    }

    if (!user.password) {
      return res.status(400).json({
        success: false,
        message: "Account registered via Google. Please sign in with Google."
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

// Get All Users
export const getUsers = async (req, res) => {
  try {
    const Users = (await User.find()).filter(user => user.role === "User");
    if (Users.length === 0) {
      return res.status(404).json({ success: false, message: "No Users found" });
    }
    res.status(200).json({ success: true, data: Users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Get User By Id
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("myTickets");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// Change Password
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = req.user; // Extracted from auth middleware

    // Find the user by ID
    // const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect", success: false });
    }

    if (newPassword.length < 4) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 4 characters long."
      })
    }

    // Hash the new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ user, message: "Password changed successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message, success: false });
  }
};



// Update User Controller
export const updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = req.user;
    // const userId = req.userId; // Get user ID from JWT (authMiddleware)

    // // Check if user exists
    // const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (email !== email.toLowerCase()) {
      return res.status(400).json({
        success: false,
        message: "Email must be in lowercase!"
      })
    }

    // Update user details
    user.username = username || user.username;
    user.email = email || user.email;
    await user.save();

    res.status(200).json({ message: "User updated successfully", success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error", success: false });
  }
};
