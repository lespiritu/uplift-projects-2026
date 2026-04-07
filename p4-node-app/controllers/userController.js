import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // validations
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const userExists = await Users.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await Users.create({
      email,
      name,
      password: hashedPassword,
    });

    user.save();

    // return the response
    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// user signin
const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // Store only user ID in token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 100, // 7 days
    });

    res.json({
      message: "Successfully logged in",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: "Logged out successfully!" });
};

export { registerUser, signInUser, logoutUser };
