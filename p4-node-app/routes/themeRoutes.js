import express from "express";
import {
  createTheme,
  getAllThemes,
  getInactiveThemes,
  getActiveThemes,
  editTheme,
} from "../controllers/themeController.js";
import upload from "../lib/multer.js";
import { isAllowed } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", isAllowed, createTheme);
router.get("/admin", isAllowed, getAllThemes);

router.get("/admin/inactive", isAllowed, getInactiveThemes);
router.get("/active", getActiveThemes);
router.put(
  "/activate/:themeId",
  isAllowed,
  upload.single("previewImage"),
  editTheme,
);
export default router;
