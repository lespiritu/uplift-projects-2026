import express from "express";
import {
  registerUser,
  signInUser,
  logoutUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", signInUser);
router.post("/logout", logoutUser);

export default router;
