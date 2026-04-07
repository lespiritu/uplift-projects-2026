import Rsvps from "../models/rsvpModel.js";
import Invitations from "../models/invitationModel.js";

const upsertRsvpByEmail = async (req, res) => {
  try {
    const { invitationId } = req.params;
    const { name, email, response, message } = req.body;

    // 1) Validate required fields
    if (!name || !email || !response) {
      return res.status(400).json({
        message: "Name, email, and response are required",
      });
    }

    if (!["yes", "no"].includes(response)) {
      return res.status(400).json({
        message: 'Response must be "yes" or "no"',
      });
    }

    const invitation = await Invitations.findById(invitationId).select(
      "eventDate rsvpCutoffDate isPublished allowRsvp",
    );

    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    if (!invitation || invitation.isPublished === false) {
      return res.status(404).json({ message: "Invitation not found" });
    }

    if (invitation.allowRsvp === false) {
      return res
        .status(403)
        .json({ message: "RSVP is disabled for this invitation" });
    }

    //  Optional cutoff check (if your invitation has rsvpCutoffDate)
    if (invitation.rsvpCutoffDate) {
      const now = new Date();
      if (now >= invitation.rsvpCutoffDate) {
        return res
          .status(403)
          .json({ message: "RSVP is closed for this invitation." });
      }
    }

    // Compute TTL expiry: eventDate + 10 days
    const expiresAt = new Date(invitation.eventDate);
    expiresAt.setDate(expiresAt.getDate() + 10);

    // Update if exists; otherwise create
    const existing = await Rsvps.findOne({
      invitationId,
      email: normalizedEmail,
    });

    if (existing) {
      existing.name = String(name).trim();
      existing.response = response;
      existing.message = message ? String(message).trim() : "";
      existing.expiresAt = expiresAt;

      const updated = await existing.save();

      return res.json({
        message: "RSVP updated successfully",
        rsvp: updated,
      });
    }

    const created = await Rsvps.create({
      invitationId,
      name: String(name).trim(),
      email: normalizedEmail,
      response,
      message: message ? String(message).trim() : "",
      expiresAt,
    });

    return res.status(201).json({
      message: "RSVP created successfully",
      rsvp: created,
    });
  } catch (error) {
    // In case two requests race and unique index triggers
    if (error?.code === 11000) {
      return res.status(409).json({
        message: "RSVP already exists for this email. Please try again.",
      });
    }

    return res.status(500).json({ message: error.message });
  }
};

const getRsvpsForInvitation = async (req, res) => {
  const invitations = await Invitations.find({ userId: req.user.id }).select(
    "_id",
  );
  const isMyInvitation = invitations.find(
    (inv) => inv._id.toString() === req.params.invitationId,
  );
  if (!isMyInvitation) {
    return res
      .status(403)
      .json({ message: "You do not have access to this invitation's RSVPs" });
  }
  try {
    const { invitationId } = req.params;
    const rsvps = await Rsvps.find({ invitationId }).sort({ createdAt: -1 });
    const summary = {
      yes: rsvps.filter((r) => r.response === "yes").length,
      no: rsvps.filter((r) => r.response === "no").length,
      all: rsvps.length,
    };
    res.json({ rsvps, summary });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get RSVPs for an invitation with yes/no counts (for owner only)

const getRsvpsWithYes = async (req, res) => {
  try {
    const { invitationId } = req.params;
    const rsvps = await Rsvps.find({ invitationId, response: "yes" }).sort({
      createdAt: -1,
    });

    const summary = {
      yes: rsvps.length,
    };
    res.json({ rsvps, summary });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { upsertRsvpByEmail, getRsvpsForInvitation, getRsvpsWithYes };
