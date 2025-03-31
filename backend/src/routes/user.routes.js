import { Router } from "express";
import {
  getCurrentUser,
  login,
  logout,
  razorPayPayment,
  signUp,
  userCredits,
  verifyRazorPay,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/authentication.middleware.js";

const router = Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/check-auth").get(verifyJWT,getCurrentUser)
router.route("/logout").post(verifyJWT, logout);
router.route("/credits").get(verifyJWT, userCredits);
router.route("/pay-razor").post(verifyJWT,razorPayPayment)
router.route("/verify-razor").post(verifyJWT,verifyRazorPay)

export default router;