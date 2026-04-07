import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },

    theme: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "themes",
    },
    title: {
      type: String,
      required: [true, "Invitation title is required"],
      maxlength: 120,
    },
    message: {
      type: String,
      maxlength: 1000,
    },

    eventType: {
      type: String,
      enum: ["wedding", "birthday", "baptism", "party", "meeting", "other"],
      default: "other",
    },

    eventDate: {
      type: Date,
      required: [true, "Event date is required"],
      index: true,
    },

    rsvpCutoffDate: {
      type: Date,
      index: true,
      required: true,
      validate: {
        validator: function (value) {
          // reject if cutoff is same day or after eventDate
          if (!value) return true; // optional field
          return value < this.eventDate; // MUST be strictly before
        },
        message: "RSVP cutoff date must be earlier than the event date",
      },
    },

    eventTime: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },

    // GOOGLE MAP AS LINK ONLY
    googleMapLink: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return !v || v.startsWith("https://");
        },
        message: "Google map link must be a valid https URL",
      },
    },

    images: [
      {
        url: String,
        publicId: String,
        format: String,
      },
    ],

    slug: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    allowRsvp: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Invitations = mongoose.model("invitations", schema);

export default Invitations;
