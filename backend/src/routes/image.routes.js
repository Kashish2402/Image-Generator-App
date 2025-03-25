import { Router } from "express";
import { verifyJWT } from "../middlewares/authentication.middleware.js";
import { generateImage } from "../controllers/image.controller.js";

const router = Router();

router.route('/generate-image').post(verifyJWT,generateImage)

export default router;