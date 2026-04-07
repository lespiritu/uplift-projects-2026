import express from "express";
import { isAllowed } from "../middleware/authMiddleware.js";
import {
  upsertRsvpByEmail,
  getRsvpsForInvitation,
  getRsvpsWithYes,
} from "../controllers/rsvpController.js";

const router = express.Router();

router.put("/:invitationId", upsertRsvpByEmail);
router.get("/:invitationId", isAllowed, getRsvpsForInvitation);

router.get("/yes/:invitationId", isAllowed, getRsvpsWithYes);

export default router;
