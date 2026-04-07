import mongoose from "mongoose";

const rsvpSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    response: {
      type: String,
      enum: ["yes", "no"],

      required: true,
    },
    message: String,
    invitationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invitations",
      required: true,
    },

    // TTL field (delete after this date)
    expiresAt: {
      type: Date,
      required: true,
    },
  },

  { timestamps: true },
);

// 1 RSVP per email per invitation
rsvpSchema.index({ invitationId: 1, email: 1 }, { unique: true });

// Auto-delete when expiresAt is reached
rsvpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Rsvps = mongoose.model("rsvps", rsvpSchema);

export default Rsvps;
