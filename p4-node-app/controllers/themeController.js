import Themes from "../models/themeModel.js";
import cloudinary from "../lib/cloudinary.js";

const createTheme = async (req, res) => {
  try {
    const { name, description, category, templateKey, colorScheme } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const newTheme = new Themes({
      name,
      description,
      category,
      templateKey,
      colorScheme,
    });

    const savedTheme = await newTheme.save();
    res.status(201).json(savedTheme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// see all themes admin only
const getAllThemes = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    const category = String(req.query?.category || "").trim();
    const filter = {};

    if (category) {
      filter.category = category;
    }

    const themes = await Themes.find(filter);
    res.status(200).json(themes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// frontend dev will see only active themes
const getInactiveThemes = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const themes = await Themes.find({ isActive: false });
    res.status(200).json(themes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get active themes for users
const getActiveThemes = async (req, res) => {
  try {
    const category = req.query.category || req.body?.category;
    const filter = { isActive: true };

    if (category) {
      filter.category = category;
    }

    const themes = await Themes.find(filter);
    res.status(200).json(themes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// edit theme to be active true for frontend dev and upload preview image to cloudinary and save url and public id to database

const editTheme = async (req, res) => {
  try {
    const { themeId } = req.params;
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    // multer validation
    const previewImage = req.file;
    if (!previewImage) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    //upload image to cloudinary
    const result = await cloudinary.uploader.upload(previewImage.path, {
      folder: "web-invitation-themes",
    });

    const cloudinaryImage = {
      public_id: result.public_id,
      url: result.secure_url,
      format: result.format,
    };

    const updatedTheme = await Themes.findByIdAndUpdate(
      themeId,
      { isActive: true, previewImage: cloudinaryImage },
      { new: true },
    );
    res.status(200).json(updatedTheme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createTheme,
  getAllThemes,
  getInactiveThemes,
  getActiveThemes,
  editTheme,
};
