import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) throw new ApiError(404, "User not found");

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generate access token and refresh token..."
    );
  }
};

const signUp = asyncHandler(async (req, res, next) => {
  const { fullName, email, password } = req.body;
  if (!email || !password || !fullName) {
    return next(new ApiError(400, "Email, FullName, password are required"));
  }

  const checkUser = await User.findOne({ email });

  if (checkUser) return next(new ApiError(400, "User already exists"));

  const user = await User.create({
    fullName,
    email,
    password,
  });

  if (!user) return next(new ApiError(400, "Failed to create user"));

  res
    .status(200)
    .json(new ApiResponse(200, user, "User created Successfully!!"));
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ApiError(400, "Email and password are required"));

  const user = await User.findOne({ email });

  if (!user) return next(new ApiError(404, "User not found"));

  const validatePassword = await user.isPasswordCorrect(password);

  if (!validatePassword)
    return next(new ApiError(400, "Invalid email or password"));

  const loggedInUser = await User.findById(user?._id).select(
    "-password -refreshToken"
  );

  const { accessToken, refreshToken } = await generateAccessToken(user?._id);

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken })
    );
});

const logout = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out Successfully..."));
});

const userCredits = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user?._id).select("-password");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        credits: user.creditBalance,
        user: { fullName: user.fullName },
      },
      "User credit details fetched successfully"
    )
  );
});

const getCurrentUser = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched Successfully"));
});

export { signUp, logout, login, userCredits,getCurrentUser };
