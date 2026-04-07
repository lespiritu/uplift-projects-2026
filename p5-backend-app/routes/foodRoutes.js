import express from "express";

import { createFood, getFoods } from "../controllers/foodController.js";
const router = express.Router();

//middleware
import upload from "../lib/multer.js";

router.get("/", getFoods);
router.post("/", upload.array("imageUrl", 2), createFood);

export default router;
