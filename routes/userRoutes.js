import express from "express";
import {
  userRegistration,
  userLogin,
  changeUserPassword,
  loggedUser,
  sendUserPasswordResetEmail,
  userPasswordReset,
} from "../controllers/userController.js";
import checkUserAuth from "../middlewares/auth-middleware.js";

const router = express.Router();

//Route Level Middleware
router.use("/changepassword", checkUserAuth);
router.use("/loggeduser", checkUserAuth);

//Protected Routes
router.post("/changepassword", changeUserPassword);
router.get("/loggeduser", loggedUser);

//Public Routes
router.post("/register", userRegistration);
router.post("/login", userLogin);
router.post("/send-reset-password-email", sendUserPasswordResetEmail);
router.post("/reset-password/:id/:token", userPasswordReset);

export default router;
