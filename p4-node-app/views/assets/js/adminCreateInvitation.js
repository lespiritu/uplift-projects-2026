(function () {
  const API_BASE_URL = window.location.origin;
  const LOGIN_PATH = "/client/pages/auth/login.html";
  const USER_DASHBOARD_PATH = "/client/pages/dashboard/index.html";

  const openButton = document.getElementById("admin-open-create-btn");
  const cancelButton = document.getElementById("admin-cancel-create-btn");
  const createWrap = document.getElementById("admin-create-wrap");
  const createForm = document.getElementById("admin-create-invitation-form");
  const submitButton = document.getElementById("admin-submit-create-btn");
  const eventTypeSelect = document.getElementById("admin-eventType");
  const themeInput = document.getElementById("admin-theme");
  const themeCardList = document.getElementById("admin-theme-card-list");
  const themeHelpText = document.getElementById("admin-theme-help-text");
  const createStatus = document.getElementById("admin-create-status");

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

  function toIsoDateTime(localValue) {
    if (!localValue) return "";
    const date = new Date(localValue);
    if (Number.isNaN(date.getTime())) return "";
    return date.toISOString();
  }

  function mapEventTypeToThemeCategory(eventType) {
    const categoryMap = {
      wedding: "wedding",
      birthday: "birthday",
      meeting: "corporate",
      party: "holiday",
      baptism: "other",
      other: "other",
    };
    return categoryMap[eventType] || "other";
  }

  function setStatus(message, type) {
    if (!createStatus) return;
    createStatus.textContent = message || "";
    createStatus.classList.remove("status-error", "status-success");
    if (type === "error") createStatus.classList.add("status-error");
    if (type === "success") createStatus.classList.add("status-success");
  }

  function setThemeHelpText(message) {
    if (!themeHelpText) return;
    themeHelpText.textContent = message || "";
  }

  function clearThemeCards() {
    if (themeCardList) {
      themeCardList.innerHTML = "";
    }
  }

  function setSelectedTheme(themeId) {
    if (themeInput) {
      themeInput.value = themeId || "";
    }

    if (!themeCardList) return;
    const cards = themeCardList.querySelectorAll(".admin-select-theme-card");
    cards.forEach((card) => {
      card.classList.toggle(
        "admin-select-theme-card-selected",
        card.dataset.themeId === themeId,
      );
    });
  }

  function buildThemeCard(theme) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "admin-select-theme-card";
    button.dataset.themeId = theme._id;

    const top = document.createElement("div");
    top.className = "admin-select-theme-top";

    const name = document.createElement("p");
    name.className = "admin-select-theme-name";
    name.textContent = theme.name || "Untitled Theme";

    const status = document.createElement("span");
    status.className = `admin-select-theme-status ${theme.isActive ? "active" : "inactive"}`;
    status.textContent = theme.isActive ? "Active" : "Inactive";

    const meta = document.createElement("p");
    meta.className = "admin-select-theme-meta";
    meta.textContent = `${theme.category || "N/A"} - ${theme.templateKey || "N/A"}`;

    top.appendChild(name);
    top.appendChild(status);
    button.appendChild(top);
    button.appendChild(meta);

    button.addEventListener("click", () => {
      setSelectedTheme(theme._id);
    });

    return button;
  }

  function renderThemes(themes, eventType) {
    clearThemeCards();
    setSelectedTheme("");

    if (!Array.isArray(themes) || !themes.length) {
      setThemeHelpText(`No themes found for "${eventType}".`);
      return;
    }

    themes.forEach((theme) => {
      themeCardList?.appendChild(buildThemeCard(theme));
    });
    setThemeHelpText(
      `Showing all themes for "${eventType}" (including inactive).`,
    );
  }

  async function loadThemesByEventType(eventType) {
    if (!eventType) {
      clearThemeCards();
      setSelectedTheme("");
      setThemeHelpText("Choose an event type to load themes.");
      return;
    }

    const category = mapEventTypeToThemeCategory(eventType);
    clearThemeCards();
    setSelectedTheme("");
    setThemeHelpText("Loading themes...");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/themes/admin?category=${encodeURIComponent(category)}`,
        {
          method: "GET",
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
        setThemeHelpText(data.message || "Failed to load themes.");
        return;
      }

      renderThemes(Array.isArray(data) ? data : [], eventType);
    } catch (error) {
      console.error("Admin load themes failed:", error);
      setThemeHelpText("Unable to load themes right now.");
    }
  }

  function toggleCreateForm(show) {
    if (!createWrap) return;
    createWrap.classList.toggle("hidden", !show);
    if (!show) {
      createForm?.reset();
      clearThemeCards();
      setSelectedTheme("");
      setThemeHelpText("Choose an event type to load themes.");
      setStatus("");
    }
  }

  async function submitCreateInvitation(event) {
    event.preventDefault();
    if (!createForm) return;

    const formData = new FormData(createForm);
    const selectedFiles = formData
      .getAll("images")
      .filter((file) => file?.size > 0);

    if (selectedFiles.length === 0) {
      setStatus("Please upload at least one image.", "error");
      return;
    }

    if (selectedFiles.length > 5) {
      setStatus("You can upload up to 5 images only.", "error");
      return;
    }

    const eventDate = toIsoDateTime(formData.get("eventDate"));
    const rsvpCutoffDate = toIsoDateTime(formData.get("rsvpCutoffDate"));
    if (!eventDate || !rsvpCutoffDate) {
      setStatus("Please enter valid event and cutoff dates.", "error");
      return;
    }

    if (!String(themeInput?.value || formData.get("theme") || "").trim()) {
      setStatus("Please choose a theme for this invitation.", "error");
      return;
    }

    formData.set("eventDate", eventDate);
    formData.set("rsvpCutoffDate", rsvpCutoffDate);

    submitButton.disabled = true;
    submitButton.textContent = "Saving...";
    setStatus("Creating invitation...");

    try {
      const response = await fetch(`${API_BASE_URL}/api/invitation`, {
        method: "POST",
        credentials: "include",
        headers: getAuthHeaders(),
        body: formData,
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
        setStatus(data.message || "Failed to create invitation.", "error");
        return;
      }

      setStatus("Invitation created successfully.", "success");
      window.dispatchEvent(new CustomEvent("admin:invitation-created"));
      createForm.reset();
      clearThemeCards();
      setSelectedTheme("");
      setThemeHelpText("Choose an event type to load themes.");
      setTimeout(() => toggleCreateForm(false), 700);
    } catch (error) {
      console.error("Admin create invitation failed:", error);
      setStatus("Unable to create invitation right now.", "error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Save Invitation";
    }
  }

  function init() {
    if (!openButton || !cancelButton || !createForm) return;

    const user = getStoredUser();
    if (!user || user.role !== "admin") return;

    openButton.addEventListener("click", () => toggleCreateForm(true));
    cancelButton.addEventListener("click", () => toggleCreateForm(false));
    createForm.addEventListener("submit", submitCreateInvitation);
    eventTypeSelect?.addEventListener("change", (event) => {
      loadThemesByEventType(event.target.value);
    });

    setThemeHelpText("Choose an event type to load themes.");
  }

  init();
})();
