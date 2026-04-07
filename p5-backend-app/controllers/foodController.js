import cloudinary from "../lib/cloudinary.js";

import Foods from "../models/foodModel.js";

const parseBoolean = (value, defaultValue = false) => {
  if (value === undefined) return defaultValue;
  if (typeof value === "boolean") return value;
  return String(value).toLowerCase() === "true";
};

const getFoods = async (req, res) => {
  try {
    const foods = await Foods.find();

    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFood = async (req, res) => {
  try {
    const images = req.files || [];

    const {
      name,
      price,
      description,
      category,
      isFeatured,
      isPopular,
      ratings,
    } = req.body;

    // Upload images only when files were sent in multipart/form-data.
    const cloudinaryImages = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "p5-restaurant-app",
        });

        return {
          url: result.secure_url,
          publicId: result.public_id,
          format: result.format,
        };
      }),
    );

    const newFood = {
      name,
      price: Number(price),
      description,
      isFeatured: parseBoolean(isFeatured, false),
      isPopular: parseBoolean(isPopular, false),
      category,
      imageUrl: cloudinaryImages,
      ratings: ratings !== undefined ? Number(ratings) : 4,
    };

    const savedFood = await Foods.create(newFood);

    res.status(201).json({ food: savedFood });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getFoods, createFood };
