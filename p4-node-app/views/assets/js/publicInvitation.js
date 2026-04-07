const statusEl = document.getElementById("public-status");
const titleEl = document.getElementById("inv-title");
const heroSubtitleEl = document.getElementById("inv-hero-subtitle");
const messageEl = document.getElementById("inv-message");
const dateEl = document.getElementById("inv-date");
const timeEl = document.getElementById("inv-time");
const locationEl = document.getElementById("inv-location");
const viewMapButton = document.getElementById("view-map-btn");
const imagesEl = document.getElementById("inv-images");
const countdownEl = document.getElementById("event-countdown");
const rsvpForm = document.getElementById("rsvp-form");
const rsvpHelpEl = document.getElementById("rsvp-help");
const rsvpStatusEl = document.getElementById("rsvp-status");
const rsvpSubmitButton = document.getElementById("rsvp-submit-btn");

const cssThemeLinkEl = document.getElementById("css-theme");

let currentInvitationId = "";
let countdownTimerId = null;
let currentGoogleMapLink = "";

function getSlugFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("slug");
}

function formatDate(value) {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleString();
}

function getHeroSubtitleByEventType(eventType) {
  const type = String(eventType || "").toLowerCase();
  if (type === "wedding") return "are getting married!";
  if (type === "birthday") return "is celebrating a special birthday!";
  if (type === "baptism") return "invites you to a meaningful baptism.";
  if (type === "party") return "is hosting a celebration!";
  if (type === "meeting") return "invites you to an important meeting.";
  return "invites you to celebrate this special event.";
}

function setRsvpStatus(message, type) {
  if (!rsvpStatusEl) return;
  rsvpStatusEl.textContent = message || "";
  rsvpStatusEl.classList.remove("rsvp-status-success", "rsvp-status-error");
  if (type === "success") {
    rsvpStatusEl.classList.add("rsvp-status-success");
  }
  if (type === "error") {
    rsvpStatusEl.classList.add("rsvp-status-error");
  }
}

function setRsvpEnabled(isEnabled, helpText) {
  if (!rsvpForm || !rsvpSubmitButton) return;
  const fields = rsvpForm.querySelectorAll("input, select, textarea, button");
  fields.forEach((field) => {
    field.disabled = !isEnabled;
  });

  if (rsvpHelpEl && helpText) {
    rsvpHelpEl.textContent = helpText;
  }
}

function renderInvitation(invitation) {
  currentInvitationId = invitation?._id || "";
  currentGoogleMapLink = invitation?.googleMapLink || "";

  if (window.InvitationThemeLibrary?.applyTheme) {
    window.InvitationThemeLibrary.applyTheme(invitation.theme || {});
  }

  titleEl.textContent = invitation.title || "Invitation";
  heroSubtitleEl.textContent = getHeroSubtitleByEventType(invitation.eventType);
  messageEl.textContent = invitation.message || "";
  dateEl.textContent = formatDate(invitation.eventDate);
  timeEl.textContent = invitation.eventTime || "N/A";
  locationEl.textContent = invitation.location || "N/A";

  if (
    currentGoogleMapLink &&
    String(currentGoogleMapLink).startsWith("https://")
  ) {
    viewMapButton?.classList.remove("hidden");
  } else {
    viewMapButton?.classList.add("hidden");
  }

  imagesEl.innerHTML = "";
  const images = Array.isArray(invitation.images) ? invitation.images : [];
  images.forEach((image, index) => {
    if (!image?.url) return;
    const img = document.createElement("img");
    img.className = "inv-image";
    img.src = image.url;
    img.alt = `Invitation image ${index + 1}`;
    imagesEl.appendChild(img);
  });

  if (countdownTimerId) {
    clearInterval(countdownTimerId);
  }
  if (window.InvitationThemeLibrary?.startCountdown) {
    countdownTimerId = window.InvitationThemeLibrary.startCountdown(
      invitation.eventDate,
      countdownEl,
    );
  }

  if (invitation.allowRsvp === false) {
    setRsvpEnabled(false, "RSVP is disabled for this invitation.");
    return;
  }

  if (invitation.rsvpCutoffDate) {
    const cutoff = new Date(invitation.rsvpCutoffDate);
    const now = new Date();
    if (!Number.isNaN(cutoff.getTime()) && now >= cutoff) {
      setRsvpEnabled(false, "RSVP is closed for this invitation.");
      return;
    }
  }

  setRsvpEnabled(true, "Please confirm if you can attend this event.");
}

async function submitRsvp(event) {
  event.preventDefault();
  if (!currentInvitationId || !rsvpForm) {
    setRsvpStatus("Unable to submit RSVP for this invitation.", "error");
    return;
  }

  const formData = new FormData(rsvpForm);
  const payload = {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    response: String(formData.get("response") || "").trim(),
    message: String(formData.get("message") || "").trim(),
  };

  if (!payload.name || !payload.email || !payload.response) {
    setRsvpStatus("Name, email, and response are required.", "error");
    return;
  }

  rsvpSubmitButton.disabled = true;
  rsvpSubmitButton.textContent = "Sending...";
  setRsvpStatus("Submitting RSVP...");

  // create rsvp via API
  try {
    const response = await fetch(
      `${window.location.origin}/api/rsvp/${encodeURIComponent(currentInvitationId)}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    const data = await response.json();
    if (!response.ok) {
      setRsvpStatus(data.message || "Failed to submit RSVP.", "error");
      return;
    }

    setRsvpStatus(data.message || "RSVP submitted successfully.", "success");
    rsvpForm.reset();
  } catch (error) {
    console.error("RSVP submit failed:", error);
    setRsvpStatus("Unable to submit RSVP right now.", "error");
  } finally {
    rsvpSubmitButton.disabled = false;
    rsvpSubmitButton.textContent = "Send RSVP";
  }
}

async function loadBySlug() {
  const slug = getSlugFromQuery();
  if (!slug) {
    statusEl.textContent = "Invalid invitation link.";
    return;
  }

  statusEl.textContent = "Loading invitation...";
  try {
    const response = await fetch(
      `${window.location.origin}/api/invitation/slug/${encodeURIComponent(slug)}`,
      { method: "GET" },
    );
    const data = await response.json();

    if (!response.ok) {
      statusEl.textContent = data.message || "Invitation not found.";
      return;
    }

    // Set theme CSS based on invitation data before rendering
    cssThemeLinkEl.setAttribute(
      "href",
      `/client/assets/css/themes/${data.invitation.theme.name || "/client/assets/css/themes/default-theme"}.css`,
    );

    renderInvitation(data.invitation || {});

    statusEl.textContent = "";
  } catch (error) {
    console.error("Load invitation by slug failed:", error);
    statusEl.textContent = "Unable to load invitation right now.";
  }
}

loadBySlug();
rsvpForm?.addEventListener("submit", submitRsvp);
viewMapButton?.addEventListener("click", () => {
  if (!currentGoogleMapLink) return;
  window.open(currentGoogleMapLink, "_blank", "noopener,noreferrer");
});
