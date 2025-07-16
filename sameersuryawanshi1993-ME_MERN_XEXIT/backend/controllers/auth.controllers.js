import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    console.log("[REGISTER] Request body:", req.body);
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      // Check if password matches
      const passwordMatches = await bcrypt.compare(password, existingUser.password);
      if (passwordMatches) {
        // Idempotent: return as if registration succeeded, but with 201
        return res.status(201).json({ message: "User registered successfully", user: existingUser });
      } else {
        return res.status(400).json({ message: "User already exists" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role === "admin" ? "admin" : "employee";
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role: userRole,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("[REGISTER] Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    console.log("[LOGIN] Request body:", req.body);
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.warn("[LOGIN] Invalid credentials for username:", username);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      data: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("[LOGIN] Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
