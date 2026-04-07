const API_BASE_URL = window.location.origin;
const LOGIN_PATH = "/client/pages/auth/login.html";

const userNameElement = document.getElementById("user-name");
const totalElement = document.getElementById("total-invitations");
const publishedElement = document.getElementById("published-invitations");
const draftElement = document.getElementById("draft-invitations");
const statusText = document.getElementById("status-text");
const invitationList = document.getElementById("invitation-list");
const refreshButton = document.getElementById("refresh-btn");
const logoutButton = document.getElementById("logout-btn");
const createStatusText = document.getElementById("create-status-text");
const createWrap = document.getElementById("create-wrap");
const editWrap = document.getElementById("edit-wrap");
const cancelEditButton = document.getElementById("cancel-edit-btn");
const editForm = document.getElementById("edit-invitation-form");
const editStatusText = document.getElementById("edit-status-text");
const submitEditButton = document.getElementById("submit-edit-btn");
const editInvitationIdInput = document.getElementById("edit-invitation-id");
const editTitleInput = document.getElementById("edit-title");
const editEventDateInput = document.getElementById("edit-eventDate");
const editRsvpCutoffDateInput = document.getElementById("edit-rsvpCutoffDate");
const editLocationInput = document.getElementById("edit-location");
const editEventTypeInput = document.getElementById("edit-eventType");
const editEventTimeInput = document.getElementById("edit-eventTime");
const editGoogleMapLinkInput = document.getElementById("edit-googleMapLink");
const editMessageInput = document.getElementById("edit-message");

const invitationCache = new Map();

function getStoredUser() {
  const raw = localStorage.getItem("authUser");
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function getAuthHeaders() {
  return {};
}

function formatDate(value) {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleString();
}

function getPublicInvitationUrl(slug) {
  if (!slug) return "";
  return `${window.location.origin}/client/pages/invitation/public.html?slug=${encodeURIComponent(slug)}`;
}

function setDashboardNotice(message, type) {
  if (!createStatusText) return;
  createStatusText.textContent = message || "";
  createStatusText.classList.remove(
    "create-status-error",
    "create-status-success",
  );

  if (type === "error") {
    createStatusText.classList.add("create-status-error");
  }

  if (type === "success") {
    createStatusText.classList.add("create-status-success");
  }
}

function setEditStatus(message, type) {
  if (!editStatusText) return;
  editStatusText.textContent = message || "";
  editStatusText.classList.remove(
    "create-status-error",
    "create-status-success",
  );
  if (type === "error") {
    editStatusText.classList.add("create-status-error");
  }
  if (type === "success") {
    editStatusText.classList.add("create-status-success");
  }
}

function toLocalDateTimeInputValue(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  const local = new Date(date.getTime() - timezoneOffset);
  return local.toISOString().slice(0, 16);
}

function toIsoDateTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString();
}

function openEditForm(invitationId) {
  const invitation = invitationCache.get(invitationId);
  if (!invitation) {
    setDashboardNotice("Invitation data not found for editing.", "error");
    return;
  }

  if (createWrap) createWrap.classList.add("hidden");
  if (editWrap) editWrap.classList.remove("hidden");

  editInvitationIdInput.value = invitation._id || "";
  editTitleInput.value = invitation.title || "";
  editEventDateInput.value = toLocalDateTimeInputValue(invitation.eventDate);
  editRsvpCutoffDateInput.value = toLocalDateTimeInputValue(
    invitation.rsvpCutoffDate,
  );
  editLocationInput.value = invitation.location || "";
  editEventTypeInput.value = invitation.eventType || "";
  editEventTimeInput.value = invitation.eventTime || "";
  editGoogleMapLinkInput.value = invitation.googleMapLink || "";
  editMessageInput.value = invitation.message || "";
  setEditStatus("");
}

function closeEditForm() {
  if (editWrap) editWrap.classList.add("hidden");
  editForm?.reset();
  setEditStatus("");
}

async function submitEditInvitation(event) {
  event.preventDefault();
  const invitationId = editInvitationIdInput?.value;
  if (!invitationId) {
    setEditStatus("Missing invitation id.", "error");
    return;
  }

  const payload = {
    title: editTitleInput.value.trim(),
    eventDate: toIsoDateTime(editEventDateInput.value),
    rsvpCutoffDate: toIsoDateTime(editRsvpCutoffDateInput.value),
    location: editLocationInput.value.trim(),
    eventType: editEventTypeInput.value,
    eventTime: editEventTimeInput.value.trim(),
    googleMapLink: editGoogleMapLinkInput.value.trim(),
    message: editMessageInput.value.trim(),
  };

  if (
    !payload.title ||
    !payload.eventDate ||
    !payload.location ||
    !payload.rsvpCutoffDate
  ) {
    setEditStatus("Title, dates, and location are required.", "error");
    return;
  }

  submitEditButton.disabled = true;
  submitEditButton.textContent = "Updating...";
  setEditStatus("Updating invitation...");

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/invitation/edit/${encodeURIComponent(invitationId)}`,
      {
        method: "PUT",
        credentials: "include",
        headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (response.status === 401) {
      clearAuthAndRedirect();
      return;
    }

    const data = await response.json();
    if (!response.ok) {
      setEditStatus(data.message || "Failed to update invitation.", "error");
      return;
    }

    setEditStatus("Invitation updated successfully.", "success");
    setDashboardNotice("Invitation updated successfully.", "success");
    await loadInvitations();
    setTimeout(closeEditForm, 600);
  } catch (error) {
    console.error("Edit invitation failed:", error);
    setEditStatus("Unable to update invitation right now.", "error");
  } finally {
    submitEditButton.disabled = false;
    submitEditButton.textContent = "Update Invitation";
  }
}

async function copyPublicLink(slug) {
  const publicUrl = getPublicInvitationUrl(slug);
  if (!publicUrl) return;

  try {
    await navigator.clipboard.writeText(publicUrl);
    setDashboardNotice(
      "Public invitation link copied to clipboard.",
      "success",
    );
  } catch (error) {
    console.error("Copy link failed:", error);
    setDashboardNotice(
      "Unable to copy link. Please copy it manually.",
      "error",
    );
  }
}

async function togglePublishInvitation(invitationId, currentlyPublished) {
  if (!invitationId) return;

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/invitation/togglePublish/${encodeURIComponent(invitationId)}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: getAuthHeaders(),
      },
    );

    if (response.status === 401) {
      clearAuthAndRedirect();
      return;
    }

    const data = await response.json();
    if (!response.ok) {
      setDashboardNotice(
        data.message || "Failed to update publish status.",
        "error",
      );
      return;
    }

    setDashboardNotice(
      currentlyPublished ? "Invitation unpublished." : "Invitation published.",
      "success",
    );
    await loadInvitations();
  } catch (error) {
    console.error("Toggle publish failed:", error);
    setDashboardNotice("Unable to update publish status right now.", "error");
  }
}

async function changeInvitationImages(invitationId, files) {
  if (!invitationId) return;
  if (!files || files.length === 0) {
    setDashboardNotice("Please select at least one image.", "error");
    return;
  }
  if (files.length > 5) {
    setDashboardNotice("You can upload up to 5 images only.", "error");
    return;
  }

  const formData = new FormData();
  Array.from(files).forEach((file) => {
    formData.append("images", file);
  });

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/invitation/changeImages/${encodeURIComponent(invitationId)}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: getAuthHeaders(),
        body: formData,
      },
    );

    if (response.status === 401) {
      clearAuthAndRedirect();
      return;
    }

    const data = await response.json();
    if (!response.ok) {
      setDashboardNotice(
        data.message || "Failed to change invitation images.",
        "error",
      );
      return;
    }

    setDashboardNotice("Invitation images updated successfully.", "success");
    await loadInvitations();
  } catch (error) {
    console.error("Change images failed:", error);
    setDashboardNotice("Unable to change images right now.", "error");
  }
}

async function deleteInvitation(invitationId) {
  if (!invitationId) return;

  const confirmed = window.confirm(
    "Delete this invitation? This action cannot be undone.",
  );
  if (!confirmed) return;

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/invitation/${encodeURIComponent(invitationId)}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: getAuthHeaders(),
      },
    );

    if (response.status === 401) {
      clearAuthAndRedirect();
      return;
    }

    const data = await response.json();
    if (!response.ok) {
      setDashboardNotice(data.message || "Failed to delete invitation.", "error");
      return;
    }

    window.dispatchEvent(
      new CustomEvent("invitation:deleted", {
        detail: { invitationId },
      }),
    );
    setDashboardNotice("Invitation deleted successfully.", "success");
    await loadInvitations();
  } catch (error) {
    console.error("Delete invitation failed:", error);
    setDashboardNotice("Unable to delete invitation right now.", "error");
  }
}

function renderStats(invitations) {
  const total = invitations.length;
  const published = invitations.filter((item) => item.isPublished).length;
  const draft = total - published;

  totalElement.textContent = String(total);
  publishedElement.textContent = String(published);
  draftElement.textContent = String(draft);
}

function renderInvitations(invitations) {
  invitationList.innerHTML = "";

  if (!invitations.length) {
    invitationList.innerHTML =
      '<div class="empty-state">No invitations found. Create your first event.</div>';
    return;
  }

  invitations.forEach((invitation) => {
    if (invitation?._id) {
      invitationCache.set(invitation._id, invitation);
    }

    const card = document.createElement("article");
    card.className = "invitation-card";

    const statusClass = invitation.isPublished
      ? "chip-published"
      : "chip-draft";
    const statusTextValue = invitation.isPublished ? "Published" : "Draft";

    card.innerHTML = `
      <h3 class="inv-title">${invitation.title || "Untitled Invitation"}</h3>
      <p class="inv-meta">Event Date: ${formatDate(invitation.eventDate)}</p>
      <p class="inv-meta">Location: ${invitation.location || "N/A"}</p>
      <p class="inv-meta">Type: ${invitation.eventType || "N/A"}</p>
      <span class="chip ${statusClass}">${statusTextValue}</span>
    `;

    if (invitation.slug) {
      const actions = document.createElement("div");
      actions.className = "inv-actions";

      const viewLink = document.createElement("a");
      viewLink.className = "inv-link";
      viewLink.href = getPublicInvitationUrl(invitation.slug);
      viewLink.target = "_blank";
      viewLink.rel = "noopener noreferrer";
      viewLink.textContent = "Open Public Link";

      const copyButton = document.createElement("button");
      copyButton.type = "button";
      copyButton.className = "inv-copy-btn";
      copyButton.textContent = "Copy Link";
      copyButton.addEventListener("click", () =>
        copyPublicLink(invitation.slug),
      );

      actions.appendChild(viewLink);
      actions.appendChild(copyButton);
      card.appendChild(actions);
    }

    const rsvpActions = document.createElement("div");
    rsvpActions.className = "rsvp-actions";

    const allRsvpButton = document.createElement("button");
    allRsvpButton.type = "button";
    allRsvpButton.className = "rsvp-btn";
    allRsvpButton.dataset.action = "all";
    allRsvpButton.dataset.invitationId = invitation._id || "";
    allRsvpButton.dataset.invitationTitle = invitation.title || "Invitation";
    allRsvpButton.textContent = "View All RSVP";

    const yesRsvpButton = document.createElement("button");
    yesRsvpButton.type = "button";
    yesRsvpButton.className = "rsvp-btn";
    yesRsvpButton.dataset.action = "yes";
    yesRsvpButton.dataset.invitationId = invitation._id || "";
    yesRsvpButton.dataset.invitationTitle = invitation.title || "Invitation";
    yesRsvpButton.textContent = "View YES RSVP";

    rsvpActions.appendChild(allRsvpButton);
    rsvpActions.appendChild(yesRsvpButton);
    card.appendChild(rsvpActions);

    const manageActions = document.createElement("div");
    manageActions.className = "inv-manage-actions";

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "inv-manage-btn";
    editButton.textContent = "Edit Invitation";
    editButton.addEventListener("click", () => openEditForm(invitation._id));

    const publishButton = document.createElement("button");
    publishButton.type = "button";
    publishButton.className = "inv-manage-btn";
    publishButton.textContent = invitation.isPublished
      ? "Unpublish"
      : "Publish";
    publishButton.addEventListener("click", () =>
      togglePublishInvitation(invitation._id, invitation.isPublished),
    );

    const changeImagesButton = document.createElement("button");
    changeImagesButton.type = "button";
    changeImagesButton.className = "inv-manage-btn";
    changeImagesButton.textContent = "Change Images";

    const changeImagesInput = document.createElement("input");
    changeImagesInput.type = "file";
    changeImagesInput.accept = "image/*";
    changeImagesInput.multiple = true;
    changeImagesInput.className = "inv-hidden-file-input";
    changeImagesInput.addEventListener("change", () => {
      changeInvitationImages(invitation._id, changeImagesInput.files);
      changeImagesInput.value = "";
    });

    changeImagesButton.addEventListener("click", () => {
      changeImagesInput.click();
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "inv-manage-btn";
    deleteButton.textContent = "Delete Invitation";
    deleteButton.addEventListener("click", () =>
      deleteInvitation(invitation._id),
    );

    manageActions.appendChild(editButton);
    manageActions.appendChild(publishButton);
    manageActions.appendChild(changeImagesButton);
    manageActions.appendChild(deleteButton);
    manageActions.appendChild(changeImagesInput);
    card.appendChild(manageActions);

    invitationList.appendChild(card);
  });
}

function clearAuthAndRedirect() {
  localStorage.removeItem("authUser");
  window.location.href = LOGIN_PATH;
}

async function loadInvitations() {
  statusText.textContent = "Loading invitations...";
  invitationCache.clear();

  try {
    const response = await fetch(`${API_BASE_URL}/api/invitation`, {
      method: "GET",
      credentials: "include",
      headers: getAuthHeaders(),
    });

    if (response.status === 401) {
      clearAuthAndRedirect();
      return;
    }

    const data = await response.json();

    if (!response.ok) {
      statusText.textContent = data.message || "Failed to load invitations.";
      return;
    }

    const invitations = Array.isArray(data.invitations) ? data.invitations : [];
    renderStats(invitations);
    renderInvitations(invitations);
    statusText.textContent = `Loaded ${invitations.length} invitation(s).`;
  } catch (error) {
    console.error("Failed to load invitations:", error);
    statusText.textContent = "Unable to load invitations right now.";
  }
}

async function logout() {
  try {
    await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: getAuthHeaders(),
    });
  } catch (error) {
    console.error("Logout request failed:", error);
  } finally {
    clearAuthAndRedirect();
  }
}

function initDashboard() {
  const user = getStoredUser();
  if (user?.name) {
    userNameElement.textContent = user.name;
  } else if (user?.email) {
    userNameElement.textContent = user.email;
  }

  refreshButton?.addEventListener("click", loadInvitations);
  logoutButton?.addEventListener("click", logout);
  cancelEditButton?.addEventListener("click", closeEditForm);
  editForm?.addEventListener("submit", submitEditInvitation);

  if (window.CreateInvitationModule?.init) {
    window.CreateInvitationModule.init({
      apiBaseUrl: API_BASE_URL,
      getAuthHeaders,
      clearAuthAndRedirect,
      onCreated: loadInvitations,
      notify: setDashboardNotice,
    });
  }

  if (window.RsvpViewerModule?.init) {
    window.RsvpViewerModule.init({
      apiBaseUrl: API_BASE_URL,
      getAuthHeaders,
      clearAuthAndRedirect,
    });
  }

  loadInvitations();
}

initDashboard();
