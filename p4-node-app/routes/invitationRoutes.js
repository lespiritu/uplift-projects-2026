import express from "express";

import {
  createInvitation,
  getInvitations,
  getInvitationBySlug,
  deleteInvitation,
  getInvitationById,
  togglePublish,
  changeImages,
  editInvitation,
} from "../controllers/invitationController.js";

// middleware
import { isAllowed } from "../middleware/authMiddleware.js";
import upload from "../lib/multer.js";

const router = express.Router();

router.post("/", isAllowed, upload.array("images", 5), createInvitation);

router.get("/", isAllowed, getInvitations);

router.get("/slug/:slug", getInvitationBySlug);
router.delete("/:invitationId", isAllowed, deleteInvitation);

router.get("/:invitationId", isAllowed, getInvitationById);

router.patch("/togglePublish/:invitationId", isAllowed, togglePublish);
router.patch(
  "/changeImages/:invitationId",
  isAllowed,
  upload.array("images", 5),
  changeImages,
);

router.put("/edit/:invitationId", isAllowed, editInvitation);

export default router;
