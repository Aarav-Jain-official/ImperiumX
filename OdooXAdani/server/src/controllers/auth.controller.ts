import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.models.js';
import jwt from 'jsonwebtoken';
import { asyncHandler, apiError, apiResponse} from '../libs/index.js';

const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  });
};

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 24 * 60 * 60 * 1000 // 1 day
};

// --- REGISTER ---
export const registerUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    throw new apiError(400, "Name, Email, and Password are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new apiError(409, "User with this email already exists");
  }

  const user = await User.create({
    name,
    email,
    password
  });

  const token = generateToken(user._id?.toString() as string);

  const createdUser = await User.findById(user._id).select('-password');

  if (!createdUser) {
    throw new apiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .cookie('token', token, cookieOptions)
    .json(
      new apiResponse(201, createdUser, "User registered successfully")
    );
});

// --- LOGIN ---
export const loginUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new apiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new apiError(404, "User not found");
  }

  const isMatch = await user.isPasswordCorrect(password);
  if (!isMatch) {
    throw new apiError(401, "Invalid user credentials");
  }

  const token = generateToken(user._id?.toString() as string);

  // 4. Send Response (Return user data without password)
  const loggedInUser = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .cookie('token', token, cookieOptions)
    .json(
      new apiResponse(200, loggedInUser, "Login successful")
    );
});

// --- LOGOUT ---
export const logoutUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  return res
    .status(200)
    .clearCookie('token', cookieOptions)
    .json(
      new apiResponse(200, {}, "Logged out successfully")
    );
});