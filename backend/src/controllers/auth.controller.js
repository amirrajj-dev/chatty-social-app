import bcrypt from "bcryptjs";
import { usersModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import fs from 'fs';
import path from 'path';

const emailReg = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
const profiles = ['boy1.png', 'boy2.png', 'boy3.png' , 'girl.png', 'girl2.png', 'girl3.png']

export const signup = async (req, res) => {
  try {
    const { email, password, fullname, gender } = req.body;

    const isUserExist = await usersModel.findOne({ email: email });
    if (isUserExist) {
      return res
        .status(400)
        .json({ message: "You already signed up", success: false });
    }

    if (!email || !password || !fullname || !gender) {
      return res
        .status(400)
        .json({ message: "Please fill all the fields", success: false });
    }

    if (!emailReg.test(email)) {
      return res.status(400).json({ message: "Invalid email", success: false });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
        success: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //picking random profile base on gender
    const profile = gender === 'male' ? profiles[Math.floor(Math.random() * 3)] : profiles[Math.floor(Math.random() * 3) + 3];

    const user = await usersModel.create({
      email,
      password: hashedPassword,
      fullname,
      gender,
      profilePic : `/avatars/${profile}`
    });
    // Generate JWT
    const token = await jwt.sign(
      { email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    // Set token in cookie
    res.cookie("chattyToken", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
      secure: process.env.NODE_ENV !== "development", // Only works on HTTPS
      sameSite: "strict",
    });

    // Remove password field from user
    user.password = null;
    res.status(201).json({
      message: "User created successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error signing up user", error, success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all the fields", success: false });
    }
    if (!emailReg.test(email)) {
      return res.status(400).json({ message: "Invalid email", success: false });
    }
    const user = await usersModel.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }
    // Generate JWT
    const token = await jwt.sign(
      { email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    // Set token in cookie
    res.cookie("chattyToken", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
      secure: process.env.NODE_ENV !== "development", // Only works on HTTPS
      sameSite: "strict",
    });

    // Remove password field from user
    user.password = null;
    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in user", error, success: false });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("chattyToken", {
      path: "/",
      sameSite: "strict",
      maxAge: 0,
    });
    res
      .status(200)
      .json({ message: "User logged out successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging out user", error, success: false });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { file } = req;
    console.log('update profile =>', file);
    if (!file) {
      return res.status(400).json({ message: 'Please provide a profile picture', success: false });
    }

    const userId = req.user.id;

    // Find the user to get the previous profile picture
    const user = await usersModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found', success: false });
    }

    // Delete the previous profile picture file if it exists
    if (user.profilePic && !user.profilePic.startsWith('/avatars')) {
      const previousProfilePicPath = path.join(path.resolve(), '../frontend/public', user.profilePic);
      fs.unlink(previousProfilePicPath, (err) => {
        if (err) {
          console.error('Error deleting previous profile picture:', err);
        } else {
          console.log('Previous profile picture deleted:', previousProfilePicPath);
        }
      });
    }

    // Update the user's profile picture
    const updatedUser = await usersModel.findByIdAndUpdate(
      userId,
      { profilePic: `/profiles/${file.filename}` },
      { new: true }
    );

    res.status(200).json({ message: 'Profile picture updated successfully', user: updatedUser, success: true });

  } catch (error) {
    return res.status(500).json({ message: 'Error updating user profile', error, success: false });
  }
};



export const checkAuth = async (req, res) => {
    try {
        return res.status(200).json({user : req.user})
    } catch (error) {
        return res.status(500).json({message : 'Error checking authentication', error, success : false})
    }
}