(function () {
  const openCreateButton = document.getElementById("open-create-btn");
  const cancelCreateButton = document.getElementById("cancel-create-btn");
  const createWrap = document.getElementById("create-wrap");
  const createForm = document.getElementById("create-invitation-form");
  const submitCreateButton = document.getElementById("submit-create-btn");
  const eventTypeSelect = document.getElementById("eventType");
  const themeInput = document.getElementById("theme");
  const themeCardList = document.getElementById("theme-card-list");
  const themeHelpText = document.getElementById("theme-help-text");

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

  function setThemeHelpText(text) {
    if (themeHelpText) {
      themeHelpText.textContent = text || "";
    }
  }

  function clearThemeCards() {
    if (themeCardList) {
      themeCardList.innerHTML = "";
    }
  }

  function setSelectedThemeCard(themeId) {
    if (!themeInput) return;
    themeInput.value = themeId || "";

    if (!themeCardList) return;
    const cards = themeCardList.querySelectorAll(".theme-card");
    cards.forEach((card) => {
      card.classList.toggle(
        "theme-card-selected",
        card.dataset.themeId === themeId,
      );
    });
  }

  function createThemeCard(theme) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "theme-card";
    button.dataset.themeId = theme._id;

    const previewUrl =
      theme?.previewImage?.url || theme?.previewImageUrl || theme?.previewImage;

    const thumb = document.createElement("div");
    thumb.className = "theme-thumb";
    if (previewUrl) {
      const image = document.createElement("img");
      image.src = previewUrl;
      image.alt = `${theme.name || "Theme"} preview`;
      thumb.appendChild(image);
    } else {
      const emptyPreview = document.createElement("div");
      emptyPreview.className = "theme-thumb-empty";
      emptyPreview.textContent = "No preview image";
      thumb.appendChild(emptyPreview);
    }

    const meta = document.createElement("div");
    meta.className = "theme-meta";

    const name = document.createElement("p");
    name.className = "theme-name";
    name.textContent = theme.name || "Untitled Theme";

    const sub = document.createElement("p");
    sub.className = "theme-sub";
    sub.textContent = theme.templateKey || "Template";

    meta.appendChild(name);
    meta.appendChild(sub);

    button.appendChild(thumb);
    button.appendChild(meta);

    button.addEventListener("click", () => {
      setSelectedThemeCard(theme._id);
    });

    return button;
  }

  function renderThemeCards(themes, eventType) {
    clearThemeCards();
    setSelectedThemeCard("");

    if (!Array.isArray(themes) || !themes.length) {
      setThemeHelpText(`No active themes found for "${eventType}".`);
      return;
    }

    themes.forEach((theme) => {
      const card = createThemeCard(theme);
      themeCardList?.appendChild(card);
    });

    setThemeHelpText(`Select one theme card for "${eventType}".`);
  }

  async function loadThemesForEventType(apiBaseUrl, eventType) {
    if (!eventType) {
      clearThemeCards();
      setSelectedThemeCard("");
      setThemeHelpText("Choose an event type to load available themes.");
      return;
    }

    const category = mapEventTypeToThemeCategory(eventType);

    clearThemeCards();
    setSelectedThemeCard("");
    setThemeHelpText("Loading themes...");

    try {
      const response = await fetch(
        `${apiBaseUrl}/api/themes/active?category=${encodeURIComponent(category)}`,
        {
          method: "GET",
        },
      );

      const data = await response.json();
      if (!response.ok) {
        setThemeHelpText(data.message || "Failed to load themes.");
        return;
      }

      const themes = Array.isArray(data) ? data : [];
      renderThemeCards(themes, eventType);
    } catch (error) {
      console.error("Load themes error:", error);
      setThemeHelpText("Unable to load themes right now.");
    }
  }

  function toggleCreateForm(show, apiBaseUrl, notify) {
    if (!createWrap) return;
    createWrap.classList.toggle("hidden", !show);
    if (!show) {
      createForm?.reset();
      if (notify) notify("");
      loadThemesForEventType(apiBaseUrl, "");
    }
  }

  async function createInvitation({
    event,
    apiBaseUrl,
    getAuthHeaders,
    clearAuthAndRedirect,
    onCreated,
    notify,
  }) {
    event.preventDefault();

    if (!createForm) return;

    const formData = new FormData(createForm);
    const selectedFiles = formData
      .getAll("images")
      .filter((file) => file?.size > 0);

    if (selectedFiles.length === 0) {
      notify("Please upload at least one image.", "error");
      return;
    }

    if (selectedFiles.length > 5) {
      notify("You can upload up to 5 images only.", "error");
      return;
    }

    const eventDate = toIsoDateTime(formData.get("eventDate"));
    const rsvpCutoffDate = toIsoDateTime(formData.get("rsvpCutoffDate"));

    if (!eventDate || !rsvpCutoffDate) {
      notify("Please enter valid event and cutoff dates.", "error");
      return;
    }

    const selectedTheme = themeInput?.value || formData.get("theme");
    if (!selectedTheme) {
      notify("Please choose a theme for this invitation.", "error");
      return;
    }

    formData.set("eventDate", eventDate);
    formData.set("rsvpCutoffDate", rsvpCutoffDate);

    submitCreateButton.disabled = true;
    submitCreateButton.textContent = "Saving...";
    notify("Creating invitation...");

    try {
      const response = await fetch(`${apiBaseUrl}/api/invitation`, {
        method: "POST",
        credentials: "include",
        headers: getAuthHeaders(),
        body: formData,
      });

      if (response.status === 401) {
        clearAuthAndRedirect();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        notify(data.message || "Failed to create invitation.", "error");
        return;
      }

      notify("Invitation created successfully.", "success");
      await onCreated();
      createForm.reset();
      setTimeout(() => {
        toggleCreateForm(false, apiBaseUrl, notify);
      }, 700);
    } catch (error) {
      console.error("Create invitation error:", error);
      notify("Unable to create invitation right now.", "error");
    } finally {
      submitCreateButton.disabled = false;
      submitCreateButton.textContent = "Save Invitation";
    }
  }

  function init({
    apiBaseUrl,
    getAuthHeaders,
    clearAuthAndRedirect,
    onCreated,
    notify,
  }) {
    if (!createForm || !openCreateButton || !cancelCreateButton) return;

    openCreateButton.addEventListener("click", () =>
      toggleCreateForm(true, apiBaseUrl, notify),
    );
    cancelCreateButton.addEventListener("click", () =>
      toggleCreateForm(false, apiBaseUrl, notify),
    );
    createForm.addEventListener("submit", (event) =>
      createInvitation({
        event,
        apiBaseUrl,
        getAuthHeaders,
        clearAuthAndRedirect,
        onCreated,
        notify,
      }),
    );
    eventTypeSelect?.addEventListener("change", (event) => {
      loadThemesForEventType(apiBaseUrl, event.target.value);
    });

    loadThemesForEventType(apiBaseUrl, eventTypeSelect?.value || "");
  }

  window.CreateInvitationModule = { init };
})();
