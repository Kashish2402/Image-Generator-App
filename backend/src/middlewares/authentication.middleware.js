import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token)
      return next(
        new ApiError(401, "UNAUTHORISED REQUEST - NO TOKEN PROVIDED")
      );

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) return next(new ApiError(401, "INVALID ACCESS TOKEN"));

    req.user = user;

    next();
  } catch (error) {
    return next(new ApiError(400, error?.message || "INVALID ACCESS TOKEN"));
  }
});
