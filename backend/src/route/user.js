import { Router } from "express";
import { allUsers, currentUser, logoutUser, registerUser, updatePassword, updateUser } from "../controller/user.js";
import { loginUser } from "../controller/user.js";
import { verifyJWT } from "../middleware/auth.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

// protected routes
router.route("/current-user").get(verifyJWT, currentUser);
router.route("/all-users").get(verifyJWT, allUsers)
router.route("/change-password").post(verifyJWT, updatePassword)
router.route("/update-profile").patch(verifyJWT, updateUser);
export default router;
