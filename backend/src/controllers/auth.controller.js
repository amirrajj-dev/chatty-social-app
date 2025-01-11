import bcrypt from "bcryptjs";
import { usersModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import multer from "multer";

const emailReg = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/profiles"); // Specify the new destination directory for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Use a unique filename
  },
});

const upload = multer({ storage: storage });

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
    // Handle automatic profile pic based on gender in the future

    const user = await usersModel.create({
      email,
      password: hashedPassword,
      fullname,
      gender,
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
    // Use multer's middleware to handle file upload
    upload.single("profilePic")(req, res, async (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error uploading file", err, success: false });
      }

      const { file } = req;
      if (!file) {
        return res
          .status(400)
          .json({
            message: "Please provide a profile picture",
            success: false,
          });
      }

      const userId = req.user._id;

      // Update the user's profile picture in the database
      const user = await usersModel.findByIdAndUpdate(
        userId,
        { profilePic: `/profiles/${file.filename}` },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found", success: false });
      }

      return res
        .status(200)
        .json({
          message: "Profile picture updated successfully",
          user,
          success: true,
        });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating user profile", error, success: false });
  }
};