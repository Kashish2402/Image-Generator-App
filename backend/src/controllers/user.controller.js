import { Transaction } from "../models/transaction.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import Razorpay from "razorpay";

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

const razorPayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const razorPayPayment = asyncHandler(async (req, res, next) => {
  const { planId } = req.body;
  let  userId  = req.user._id;

  if (!planId) return next(new ApiError(400, "Selct plan first"));

  const userData = await User.findById(req.user?._id);

  if (!userData) return next(new ApiError(400, "User not login"));

  let credits, plan, amount, date;

  switch (planId) {
    case "Basic":
      plan = "Basic";
      credits = 15;
      amount = 10;
      break;

    case "Advanced":
      plan = "Advanced";
      credits = 30;
      amount = 20;
      break;

    case "Premier":
      plan = "Premier";
      credits = 150;
      amount = 50;
      break;

    default:
      return res.status(200).json(new ApiError(200, "Plan Not found"));
  }

  date = Date.now();

  const transactionData = {
    userId,
    plan,
    amount,
    credits,
    date,
  };

  const newTransaction = await Transaction.create(transactionData);

  const options = {
    amount: amount * 100,
    currency: process.env.CURRENCY,
    receipt: newTransaction._id,
  };

  try {
    const order = await razorPayInstance.orders.create(options);
    res.status(200).json(new ApiResponse(200, order, "Payment Successfull"));
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "Error in payment"));
  }
  });


const verifyRazorPay = asyncHandler(async (req, res, next) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorPayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status !== "paid") {
      return next(new ApiError(400, "Payment not completed"));
    }

    const transactionData = await Transaction.findById(orderInfo.receipt);
    if (!transactionData)
      return next(new ApiError(404, "Transaction not found"));

    if (transactionData.payment) {
      return res
        .status(200)
        .json(new ApiResponse(200, "Payment already verified"));
    }

    const userData = await User.findById(transactionData.userId);
    if (!userData) return next(new ApiError(404, "User not found"));

    userData.creditBalance += transactionData.credits;
    await userData.save();

    transactionData.payment = true;
    await transactionData.save();

    res.status(200).json(new ApiResponse(200, "Credits Added"));
  } catch (error) {
    next(new ApiError(500, "Error verifying payment"));
  }
});

export {
  signUp,
  logout,
  login,
  userCredits,
  getCurrentUser,
  verifyRazorPay,
  razorPayPayment,
};
