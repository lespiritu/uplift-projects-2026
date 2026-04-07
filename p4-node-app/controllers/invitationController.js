import Invitations from "../models/invitationModel.js";
import cloudinary from "../lib/cloudinary.js";
import createUniqueSlug from "../utils/slug-generator.js";

import Rsvps from "../models/rsvpModel.js";

// ---------- Controller ----------
const createInvitation = async (req, res) => {
  try {
    const {
      title,
      theme,
      message,
      eventType,
      eventDate,
      eventTime,
      location,
      googleMapLink,
      rsvpCutoffDate,
    } = req.body;

    const images = req.files;

    // Validate cutoff date
    if (rsvpCutoffDate) {
      const cutoff = new Date(rsvpCutoffDate);
      const event = new Date(eventDate); // your parsed eventDate

      if (Number.isNaN(cutoff.getTime())) {
        return res.status(400).json({
          message: "Invalid rsvpCutoffDate format",
        });
      }

      // Block if cutoff >= eventDate
      if (cutoff >= event) {
        return res.status(400).json({
          message: "RSVP cutoff date must be BEFORE the event date",
        });
      }
    }

    if (!title) return res.status(400).json({ message: "Title is required" });
    if (!eventDate)
      return res.status(400).json({ message: "Event date is required" });
    if (!location)
      return res.status(400).json({ message: "Location is required" });

    // Validate google map link (optional but must be https)
    if (googleMapLink && !String(googleMapLink).startsWith("https://")) {
      return res
        .status(400)
        .json({ message: "Google map link must be a valid https URL" });
    }

    if (!images || images.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Upload images to cloudinary and get URLs
    const cloudinaryImages = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "web-invitation-app",
        });

        return {
          url: result.secure_url,
          publicId: result.public_id,
          format: result.format,
        };
      }),
    );

    // Generate unique slug from title + year
    const eventDateObj = new Date(eventDate);
    const slugBase = `${title}-${eventDateObj.getFullYear()}`;
    const slug = await createUniqueSlug(slugBase);

    const newData = {
      userId: req.user.id,
      title,
      theme,
      message,
      eventType,
      eventDate,
      rsvpCutoffDate,
      eventTime,
      location,
      googleMapLink,
      images: cloudinaryImages,
      slug, //  use generated slug
    };

    const savedInvitation = await Invitations.create(newData);

    res.status(201).json({ invitation: savedInvitation });
  } catch (error) {
    // In case of rare duplicate slug due to race condition
    if (error?.code === 11000) {
      return res
        .status(409)
        .json({ message: "Duplicate slug, please try again" });
    }
    res.status(500).json({ message: error.message });
  }
};

/// get all invitations for user

const getInvitations = async (req, res) => {
  try {
    const invitations = await Invitations.find({ userId: req.user.id })
      .sort({
        createdAt: -1,
      })
      .populate("userId", "name email")
      .populate("theme");
    res.json({ invitations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get the invitation by slug for public view (optional, not implemented in routes yet)
const getInvitationBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const invitation = await Invitations.findOne({
      slug,
      isPublished: true,
    })
      .populate("userId", "name email")
      .populate("theme");
    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }

    res.json({ invitation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get the invitation by ID for user only
const getInvitationById = async (req, res) => {
  try {
    const { invitationId } = req.params;

    const invitation = await Invitations.findOne({
      _id: invitationId,
      userId: req.user.id,
    })
      .populate("userId", "name email")
      .populate("theme");

    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }
    if (invitation.userId._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }
    res.json({ invitation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteInvitation = async (req, res) => {
  try {
    const { invitationId } = req.params;

    const isMyInvitation = await Invitations.findOne({
      _id: invitationId,
      userId: req.user.id,
    });

    if (!isMyInvitation) {
      return res.status(403).json({
        message: "You do not have permission to delete this invitation",
      });
    }

    const invitation = await Invitations.findOneAndDelete({
      _id: invitationId,
      userId: req.user.id,
    });

    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }

    // delete associated RSVPs
    await Rsvps.deleteMany({ invitationId: invitation._id });

    // Delete associated images from Cloudinary
    if (invitation.images && invitation.images.length > 0) {
      await Promise.all(
        invitation.images.map(async (img) => {
          if (img.publicId) {
            await cloudinary.uploader.destroy(img.publicId);
          }
        }),
      );
    }

    res.json({ message: "Invitation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const togglePublish = async (req, res) => {
  try {
    const { invitationId } = req.params;

    const invitation = await Invitations.findOne({
      _id: invitationId,
      userId: req.user.id,
    });
    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }

    invitation.isPublished = !invitation.isPublished;
    await invitation.save();

    res.json({
      message: invitation.isPublished
        ? "Invitation published"
        : "Invitation unpublished",
      invitation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changeImages = async (req, res) => {
  try {
    const images = req.files;
    const { invitationId } = req.params;

    const invitation = await Invitations.findOne({
      _id: invitationId,
      userId: req.user.id,
    });

    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }

    // Delete associated images from Cloudinary
    if (invitation.images && invitation.images.length > 0) {
      await Promise.all(
        invitation.images.map(async (img) => {
          if (img.publicId) {
            await cloudinary.uploader.destroy(img.publicId);
          }
        }),
      );
    }

    if (!images || images.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Upload images to cloudinary and get URLs
    const cloudinaryImages = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "web-invitation-app",
        });

        return {
          url: result.secure_url,
          publicId: result.public_id,
          format: result.format,
        };
      }),
    );

    invitation.images = cloudinaryImages;
    await invitation.save();

    res.json({ message: "Successfully updated the images.", invitation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editInvitation = async (req, res) => {
  try {
    const { invitationId } = req.params;

    const {
      title,
      message,
      theme,
      eventType,
      eventDate,
      eventTime,
      location,
      googleMapLink,
      rsvpCutoffDate,
    } = req.body;

    const invitation = await Invitations.findOne({
      _id: invitationId,
      userId: req.user.id,
    });

    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }

    // Validate eventDate if provided
    let eventDateObj;
    if (eventDate) {
      eventDateObj = new Date(eventDate);
      if (Number.isNaN(eventDateObj.getTime())) {
        return res.status(400).json({ message: "Invalid eventDate format" });
      }
    }

    // Validate googleMapLink if provided
    if (googleMapLink && !String(googleMapLink).startsWith("https://")) {
      return res.status(400).json({
        message: "Google map link must be a valid https URL",
      });
    }

    // Validate cutoff date if provided
    if (rsvpCutoffDate) {
      const cutoff = new Date(rsvpCutoffDate);
      const event = eventDateObj || invitation.eventDate;

      if (Number.isNaN(cutoff.getTime())) {
        return res.status(400).json({
          message: "Invalid rsvpCutoffDate format",
        });
      }

      // Must be strictly before event date
      if (cutoff >= event) {
        return res.status(400).json({
          message: "RSVP cutoff date must be BEFORE the event date",
        });
      }

      invitation.rsvpCutoffDate = cutoff;
    }

    // Apply updates (only if provided)
    if (title) invitation.title = String(title).trim();
    if (theme !== undefined) invitation.theme = theme;
    if (message !== undefined) invitation.message = String(message).trim();
    if (eventType) invitation.eventType = eventType;
    if (eventDateObj) invitation.eventDate = eventDateObj;
    if (eventTime !== undefined)
      invitation.eventTime = String(eventTime).trim();
    if (location) invitation.location = String(location).trim();
    if (googleMapLink !== undefined)
      invitation.googleMapLink = String(googleMapLink).trim();

    // save updated data
    const updated = await invitation.save();

    res.json({
      message: "Invitation updated successfully",
      invitation: updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createInvitation,
  getInvitations,
  getInvitationBySlug,
  deleteInvitation,
  getInvitationById,
  togglePublish,
  changeImages,
  editInvitation,
};
