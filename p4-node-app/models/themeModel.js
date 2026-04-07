import mongoose from "mongoose";

const themeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Theme name is required"],
      unique: true,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      maxlength: 200,
    },
    previewImage: {
      url: String,
      publicId: String,
      format: String,
    },

    category: {
      type: String,
      enum: ["birthday", "wedding", "corporate", "holiday", "other"],
      default: "other",
    },
    colorScheme: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
    },

    templateKey: {
      type: String,
      required: [true, "Template key is required"],
      enum: ["classic", "modern", "minimal", "floral", "elegant"],
    },
  },
  { timestamps: true },
);

const Themes = mongoose.model("themes", themeSchema);

export default Themes;
