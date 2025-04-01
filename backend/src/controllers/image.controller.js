import { User } from "../models/user.model.js";
import axios from "axios";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import FormData from "form-data";

export const generateImage = asyncHandler(async (req, res, next) => {
  const { prompt } = req.body;

  if (!prompt) return next(new ApiError(400, "Prompt required to generate image"));

  const user = await User.findById(req.user?._id);

  if (!user) return next(new ApiError(404, "User not found"));

  if (user.creditBalance <= 0) return next(new ApiError(400, "No Credit balance left"));

  const formData = new FormData();
  formData.append("prompt", prompt);

  try {
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.IMAGE_GEN_API_KEY,
          ...formData.getHeaders(),
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    const updatedUser = await User.findByIdAndUpdate(
      req.user?._id,
      { creditBalance: user.creditBalance - 1 },
      { new: true }
    );

    return res.status(200).json(
      new ApiResponse(200, {
        creditBalance: updatedUser.creditBalance,
        resultImage,
      })
    );
  } catch (error) {
    console.error("API Error:", error.response?.data || error);
    return next(new ApiError(500, `Image generation failed: ${error.message}`));
  }
});
