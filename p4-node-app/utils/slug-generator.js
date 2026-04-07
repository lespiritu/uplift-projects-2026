import Invitations from "../models/invitationModel.js";

// ---------- Slug helpers ----------
const generateSlug = (text) => {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // spaces -> hyphen
    .replace(/-+/g, "-"); // remove duplicate hyphens
};

const createUniqueSlug = async (baseText) => {
  const baseSlug = generateSlug(baseText) || `invitation-${Date.now()}`;
  let slug = baseSlug;
  let counter = 1;

  while (await Invitations.exists({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

export default createUniqueSlug;
