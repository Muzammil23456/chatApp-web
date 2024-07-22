import { Router } from "express";
import { currentUser, logoutUser, refreshAccessToken, registerUser } from "../controller/user.js";
import { loginUser } from "../controller/user.js";
import { verifyJWT } from "../middleware/auth.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refreshToken").post(refreshAccessToken)

// protected routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/currentUser").get(verifyJWT, currentUser);
export default router;
