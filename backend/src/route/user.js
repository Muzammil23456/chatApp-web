import { Router } from "express";
import { allUsers, currentUser, logoutUser, registerUser, updatePassword, updateUser ,updateUserPicture} from "../controller/user.js";
import { loginUser } from "../controller/user.js";
import { verifyJWT } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

// protected routes
router.route("/current-user").get(verifyJWT, currentUser);
router.route("/all-users").get(verifyJWT, allUsers)
router.route("/change-password").post(verifyJWT, updatePassword)
router.route("/update-profile").patch(verifyJWT, updateUser);
router.route("/update-profile-picture").patch(verifyJWT, upload.single("avatar"),updateUserPicture);
export default router;
