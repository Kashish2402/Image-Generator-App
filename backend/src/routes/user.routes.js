import { Router } from "express";
import {
  login,
  logout,
  signUp,
  userCredits,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/authentication.middleware.js";

const router = Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/logout").post(verifyJWT, logout);
router.route("/credits").get(verifyJWT, userCredits);

export default router;