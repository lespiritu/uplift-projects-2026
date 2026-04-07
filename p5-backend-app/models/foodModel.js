import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name of food is required"],
      maxlength: 120,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },

    description: {
      type: String,
    },

    category: {
      type: String,
    },

    isFeatured: { type: Boolean, default: false },

    isPopular: { type: Boolean, default: false },

    ratings: { type: Number, default: 4 },

    imageUrl: [
      {
        url: String,
        publicId: String,
        format: String,
      },
    ],
  },
  { timestamps: true },
);
const Foods = mongoose.model("foods", schema);

export default Foods;
