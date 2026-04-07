const API_BASE_URL = window.location.origin;
const LOGIN_PATH = "/client/pages/auth/login.html";
const USER_DASHBOARD_PATH = "/client/pages/dashboard/index.html";

const adminNameEl = document.getElementById("admin-name");
const refreshBtn = document.getElementById("admin-refresh-btn");
const logoutBtn = document.getElementById("admin-logout-btn");

const allThemesCountEl = document.getElementById("all-themes-count");
const activeThemesCountEl = document.getElementById("active-themes-count");
const inactiveThemesCountEl = document.getElementById("inactive-themes-count");

const createThemeForm = document.getElementById("create-theme-form");
const createThemeBtn = document.getElementById("create-theme-btn");
const createThemeStatus = document.getElementById("create-theme-status");
const colorPrimaryInput = document.getElementById("theme-color-primary");
const colorAccentInput = document.getElementById("theme-color-accent");
const colorSoftInput = document.getElementById("theme-color-soft");
const colorSchemeInput = document.getElementById("theme-color-scheme");

const allThemeList = document.getElementById("all-theme-list");
const inactiveThemeList = document.getElementById("inactive-theme-list");
const allThemeStatus = document.getElementById("all-theme-status");
const inactiveThemeStatus = document.getElementById("inactive-theme-status");
const adminInvitationStatus = document.getElementById("admin-invitation-status");
const adminInvitationList = document.getElementById("admin-invitation-list");

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

function clearAuthAndRedirect() {
  localStorage.removeItem("authUser");
  window.location.href = LOGIN_PATH;
}

function setStatus(element, message, type) {
  if (!element) return;
  element.textContent = message || "";
  element.classList.remove("status-error", "status-success");
  if (type === "error") element.classList.add("status-error");
  if (type === "success") element.classList.add("status-success");
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

async function copyPublicLink(slug) {
  const publicUrl = getPublicInvitationUrl(slug);
  if (!publicUrl) return;
  try {
    await navigator.clipboard.writeText(publicUrl);
    setStatus(adminInvitationStatus, "Public invitation link copied.", "success");
  } catch (error) {
    console.error("Admin copy link failed:", error);
    setStatus(adminInvitationStatus, "Unable to copy invitation link.", "error");
  }
}

async function deleteInvitation(invitationId) {
  if (!invitationId) return;

  const confirmed = window.confirm(
    "Delete this invitation? This action cannot be undone.",
  );
  if (!confirmed) return;

  setStatus(adminInvitationStatus, "Deleting invitation...");
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

    if (response.status === 403) {
      window.location.href = USER_DASHBOARD_PATH;
      return;
    }

    const data = await response.json();
    if (!response.ok) {
      setStatus(
        adminInvitationStatus,
        data.message || "Failed to delete invitation.",
        "error",
      );
      return;
    }

    setStatus(adminInvitationStatus, "Invitation deleted successfully.", "success");
    await loadAdminInvitations();
  } catch (error) {
    console.error("Admin delete invitation failed:", error);
    setStatus(adminInvitationStatus, "Unable to delete invitation right now.", "error");
  }
}

function renderStats(allThemes, inactiveThemes) {
  const all = Array.isArray(allThemes) ? allThemes.length : 0;
  const inactive = Array.isArray(inactiveThemes) ? inactiveThemes.length : 0;
  const active = all - inactive;

  allThemesCountEl.textContent = String(all);
  activeThemesCountEl.textContent = String(Math.max(active, 0));
  inactiveThemesCountEl.textContent = String(inactive);
}

function buildThemeCard(theme, allowActivate = false) {
  const card = document.createElement("article");
  card.className = "theme-card";

  const thumb = document.createElement("div");
  thumb.className = "theme-thumb";
  if (theme?.previewImage?.url) {
    const image = document.createElement("img");
    image.src = theme.previewImage.url;
    image.alt = `${theme.name || "Theme"} preview`;
    thumb.appendChild(image);
  }

  const body = document.createElement("div");
  body.className = "theme-body";
  body.innerHTML = `
    <p class="theme-name">${theme.name || "Untitled Theme"}</p>
    <p class="theme-meta">Category: ${theme.category || "N/A"}</p>
    <p class="theme-meta">Template: ${theme.templateKey || "N/A"}</p>
    <p class="theme-meta">Status: ${theme.isActive ? "Active" : "Inactive"}</p>
  `;

  if (allowActivate) {
    const actions = document.createElement("div");
    actions.className = "theme-actions";

    const activateBtn = document.createElement("button");
    activateBtn.type = "button";
    activateBtn.className = "theme-btn";
    activateBtn.textContent = "Activate + Upload Preview";

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.className = "hidden-input";

    activateBtn.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", () => {
      activateTheme(theme._id, fileInput.files?.[0]);
      fileInput.value = "";
    });

    actions.appendChild(activateBtn);
    actions.appendChild(fileInput);
    body.appendChild(actions);
  }

  card.appendChild(thumb);
  card.appendChild(body);
  return card;
}

function renderThemeList(container, themes, allowActivate = false) {
  container.innerHTML = "";
  if (!Array.isArray(themes) || !themes.length) {
    container.innerHTML = '<div class="theme-empty">No themes found.</div>';
    return;
  }

  themes.forEach((theme) => {
    container.appendChild(buildThemeCard(theme, allowActivate));
  });
}

function buildAdminInvitationCard(invitation) {
  const card = document.createElement("article");
  card.className = "admin-invitation-card";

  const statusLabel = invitation?.isPublished ? "Published" : "Draft";
  const statusClass = invitation?.isPublished
    ? "admin-invitation-chip-published"
    : "admin-invitation-chip-draft";
  const themeName = invitation?.theme?.name || "No Theme";

  card.innerHTML = `
    <div class="admin-invitation-theme-highlight">${themeName}</div>
    <h3 class="admin-invitation-title">${invitation?.title || "Untitled Invitation"}</h3>
    <p class="admin-invitation-meta">Event Date: ${formatDate(invitation?.eventDate)}</p>
    <p class="admin-invitation-meta">Location: ${invitation?.location || "N/A"}</p>
    <p class="admin-invitation-meta">Type: ${invitation?.eventType || "N/A"}</p>
    <span class="admin-invitation-chip ${statusClass}">${statusLabel}</span>
  `;

  const actions = document.createElement("div");
  actions.className = "admin-invitation-actions";

  if (invitation?.slug) {
    const viewLink = document.createElement("a");
    viewLink.className = "admin-invitation-link";
    viewLink.href = getPublicInvitationUrl(invitation.slug);
    viewLink.target = "_blank";
    viewLink.rel = "noopener noreferrer";
    viewLink.textContent = "Open Public Link";

    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.className = "theme-btn";
    copyButton.textContent = "Copy Link";
    copyButton.addEventListener("click", () => copyPublicLink(invitation.slug));

    actions.appendChild(viewLink);
    actions.appendChild(copyButton);
  } else {
    const noLink = document.createElement("p");
    noLink.className = "admin-invitation-meta";
    noLink.textContent = "No public link yet.";
    actions.appendChild(noLink);
  }

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "admin-invitation-delete-btn";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    deleteInvitation(invitation?._id);
  });
  actions.appendChild(deleteButton);

  card.appendChild(actions);
  return card;
}

function renderAdminInvitations(invitations) {
  if (!adminInvitationList) return;
  adminInvitationList.innerHTML = "";

  if (!Array.isArray(invitations) || !invitations.length) {
    adminInvitationList.innerHTML =
      '<div class="theme-empty">No invitations found for this admin account.</div>';
    return;
  }

  invitations.forEach((invitation) => {
    adminInvitationList.appendChild(buildAdminInvitationCard(invitation));
  });
}

async function fetchAllThemes() {
  const response = await fetch(`${API_BASE_URL}/api/themes/admin`, {
    method: "GET",
    credentials: "include",
    headers: getAuthHeaders(),
  });
  return response;
}

async function fetchInactiveThemes() {
  const response = await fetch(`${API_BASE_URL}/api/themes/admin/inactive`, {
    method: "GET",
    credentials: "include",
    headers: getAuthHeaders(),
  });
  return response;
}

async function fetchAdminInvitations() {
  const response = await fetch(`${API_BASE_URL}/api/invitation`, {
    method: "GET",
    credentials: "include",
    headers: getAuthHeaders(),
  });
  return response;
}

async function loadAdminInvitations() {
  setStatus(adminInvitationStatus, "Loading invitations...");
  try {
    const response = await fetchAdminInvitations();

    if (response.status === 401) {
      clearAuthAndRedirect();
      return;
    }

    if (response.status === 403) {
      window.location.href = USER_DASHBOARD_PATH;
      return;
    }

    const data = await response.json();
    if (!response.ok) {
      setStatus(
        adminInvitationStatus,
        data.message || "Failed to load invitations.",
        "error",
      );
      return;
    }

    const invitations = Array.isArray(data.invitations) ? data.invitations : [];
    renderAdminInvitations(invitations);
    setStatus(
      adminInvitationStatus,
      `Loaded ${invitations.length} invitation(s).`,
      "success",
    );
  } catch (error) {
    console.error("Load admin invitations failed:", error);
    setStatus(adminInvitationStatus, "Unable to load invitations right now.", "error");
  }
}

async function loadAdminData() {
  setStatus(allThemeStatus, "Loading themes...");
  setStatus(inactiveThemeStatus, "Loading inactive themes...");

  try {
    const [allResponse, inactiveResponse] = await Promise.all([
      fetchAllThemes(),
      fetchInactiveThemes(),
    ]);

    if (allResponse.status === 401 || inactiveResponse.status === 401) {
      clearAuthAndRedirect();
      return;
    }

    if (allResponse.status === 403 || inactiveResponse.status === 403) {
      window.location.href = USER_DASHBOARD_PATH;
      return;
    }

    const allData = await allResponse.json();
    const inactiveData = await inactiveResponse.json();

    if (!allResponse.ok) {
      setStatus(allThemeStatus, allData.message || "Failed to load themes.", "error");
      return;
    }

    if (!inactiveResponse.ok) {
      setStatus(
        inactiveThemeStatus,
        inactiveData.message || "Failed to load inactive themes.",
        "error",
      );
      return;
    }

    renderStats(allData, inactiveData);
    renderThemeList(allThemeList, allData, false);
    renderThemeList(inactiveThemeList, inactiveData, true);
    setStatus(allThemeStatus, `Loaded ${allData.length} theme(s).`);
    setStatus(
      inactiveThemeStatus,
      `${inactiveData.length} inactive theme(s). Upload image to activate.`,
    );
  } catch (error) {
    console.error("Load admin data failed:", error);
    setStatus(allThemeStatus, "Unable to load themes right now.", "error");
    setStatus(inactiveThemeStatus, "Unable to load inactive themes right now.", "error");
  }
}

async function refreshAdminDashboard() {
  await Promise.all([loadAdminData(), loadAdminInvitations()]);
}

async function createTheme(event) {
  event.preventDefault();

  const colorSchemeValue = [
    colorPrimaryInput?.value || "",
    colorAccentInput?.value || "",
    colorSoftInput?.value || "",
  ]
    .filter(Boolean)
    .join("-");
  if (colorSchemeInput) {
    colorSchemeInput.value = colorSchemeValue;
  }

  const formData = new FormData(createThemeForm);
  const payload = {
    name: String(formData.get("name") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    category: String(formData.get("category") || "").trim(),
    templateKey: String(formData.get("templateKey") || "").trim(),
    colorScheme: String(formData.get("colorScheme") || "").trim(),
  };

  if (!payload.name || !payload.category || !payload.templateKey) {
    setStatus(createThemeStatus, "Name, category, and template are required.", "error");
    return;
  }

  createThemeBtn.disabled = true;
  createThemeBtn.textContent = "Saving...";
  setStatus(createThemeStatus, "Creating theme...");

  try {
    const response = await fetch(`${API_BASE_URL}/api/themes`, {
      method: "POST",
      credentials: "include",
      headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.status === 401) {
      clearAuthAndRedirect();
      return;
    }

    if (response.status === 403) {
      window.location.href = USER_DASHBOARD_PATH;
      return;
    }

    const data = await response.json();
    if (!response.ok) {
      setStatus(createThemeStatus, data.message || "Failed to create theme.", "error");
      return;
    }

    createThemeForm.reset();
    setStatus(createThemeStatus, "Theme created successfully.", "success");
    await loadAdminData();
  } catch (error) {
    console.error("Create theme failed:", error);
    setStatus(createThemeStatus, "Unable to create theme right now.", "error");
  } finally {
    createThemeBtn.disabled = false;
    createThemeBtn.textContent = "Save Theme";
  }
}

async function activateTheme(themeId, file) {
  if (!themeId || !file) {
    setStatus(inactiveThemeStatus, "Please choose a preview image first.", "error");
    return;
  }

  const formData = new FormData();
  formData.append("previewImage", file);

  setStatus(inactiveThemeStatus, "Activating theme...");
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/themes/activate/${encodeURIComponent(themeId)}`,
      {
        method: "PUT",
        credentials: "include",
        headers: getAuthHeaders(),
        body: formData,
      },
    );

    if (response.status === 401) {
      clearAuthAndRedirect();
      return;
    }

    if (response.status === 403) {
      window.location.href = USER_DASHBOARD_PATH;
      return;
    }

    const data = await response.json();
    if (!response.ok) {
      setStatus(inactiveThemeStatus, data.message || "Failed to activate theme.", "error");
      return;
    }

    setStatus(inactiveThemeStatus, "Theme activated successfully.", "success");
    await loadAdminData();
  } catch (error) {
    console.error("Activate theme failed:", error);
    setStatus(inactiveThemeStatus, "Unable to activate theme right now.", "error");
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
    console.error("Admin logout failed:", error);
  } finally {
    clearAuthAndRedirect();
  }
}

function guardAdminAccess() {
  const user = getStoredUser();
  if (!user) {
    window.location.href = LOGIN_PATH;
    return false;
  }

  if (user.role !== "admin") {
    window.location.href = USER_DASHBOARD_PATH;
    return false;
  }

  adminNameEl.textContent = user.name || user.email || "Administrator";
  return true;
}

function initAdminDashboard() {
  if (!guardAdminAccess()) return;

  refreshBtn?.addEventListener("click", refreshAdminDashboard);
  logoutBtn?.addEventListener("click", logout);
  createThemeForm?.addEventListener("submit", createTheme);
  window.addEventListener("admin:invitation-created", loadAdminInvitations);

  if (colorSchemeInput) {
    colorSchemeInput.value = [
      colorPrimaryInput?.value || "",
      colorAccentInput?.value || "",
      colorSoftInput?.value || "",
    ]
      .filter(Boolean)
      .join("-");
  }

  refreshAdminDashboard();
}

initAdminDashboard();
