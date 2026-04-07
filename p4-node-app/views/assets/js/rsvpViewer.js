(function () {
  let apiBaseUrl = "";
  let getAuthHeaders = () => ({});
  let clearAuthAndRedirect = () => {};
  let currentInvitationId = "";

  const invitationList = document.getElementById("invitation-list");
  const viewerWrap = document.getElementById("rsvp-viewer-wrap");
  const viewerTitle = document.getElementById("rsvp-viewer-title");
  const viewerStatus = document.getElementById("rsvp-viewer-status");
  const rsvpTotal = document.getElementById("rsvp-total");
  const rsvpYes = document.getElementById("rsvp-yes");
  const rsvpNo = document.getElementById("rsvp-no");
  const rsvpList = document.getElementById("rsvp-list");

  function setSummary(summary = {}) {
    rsvpTotal.textContent = String(summary.all || 0);
    rsvpYes.textContent = String(summary.yes || 0);
    rsvpNo.textContent = String(summary.no || 0);
  }

  function showViewer(title, status) {
    viewerWrap?.classList.remove("hidden");
    if (title) viewerTitle.textContent = title;
    if (status) viewerStatus.textContent = status;
  }

  function hideViewer() {
    viewerWrap?.classList.add("hidden");
  }

  function resetViewer(statusMessage = "Select an invitation to view RSVP data.") {
    currentInvitationId = "";
    if (viewerTitle) {
      viewerTitle.textContent = "RSVP Results";
    }
    if (viewerStatus) {
      viewerStatus.textContent = statusMessage;
    }
    setSummary({ all: 0, yes: 0, no: 0 });
    if (rsvpList) {
      rsvpList.innerHTML = "";
    }
    hideViewer();
  }

  function renderRsvps(rsvps = []) {
    rsvpList.innerHTML = "";

    if (!Array.isArray(rsvps) || !rsvps.length) {
      rsvpList.innerHTML = '<div class="empty-state">No RSVP records found.</div>';
      return;
    }

    rsvps.forEach((item) => {
      const article = document.createElement("article");
      const responseValue = (item.response || "").toLowerCase();
      article.className = "rsvp-item";
      if (responseValue === "yes") {
        article.classList.add("rsvp-item-yes");
      } else if (responseValue === "no") {
        article.classList.add("rsvp-item-no");
      }

      article.innerHTML = `
        <p class="rsvp-item-name">${item.name || "Guest"}</p>
        <p class="rsvp-item-meta">Email: ${item.email || "N/A"}</p>
        <p class="rsvp-item-meta">Response: ${(item.response || "").toUpperCase() || "N/A"}</p>
        <p class="rsvp-item-meta">Message: ${item.message || "-"}</p>
      `;

      rsvpList.appendChild(article);
    });
  }

  async function fetchRsvps(endpoint, invitationTitle, mode) {
    showViewer(
      `${mode} RSVP - ${invitationTitle || "Invitation"}`,
      "Loading RSVP records...",
    );
    setSummary({ all: 0, yes: 0, no: 0 });
    rsvpList.innerHTML = "";

    try {
      const response = await fetch(endpoint, {
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
        showViewer(
          `${mode} RSVP - ${invitationTitle || "Invitation"}`,
          data.message || "Failed to load RSVP records.",
        );
        renderRsvps([]);
        return;
      }

      const records = Array.isArray(data.rsvps) ? data.rsvps : [];
      const summary = data.summary || {};

      if (mode === "YES") {
        setSummary({
          all: records.length,
          yes: summary.yes || records.length,
          no: 0,
        });
      } else {
        setSummary({
          all: summary.all || records.length,
          yes: summary.yes || 0,
          no: summary.no || 0,
        });
      }

      showViewer(
        `${mode} RSVP - ${invitationTitle || "Invitation"}`,
        `Loaded ${records.length} record(s).`,
      );
      renderRsvps(records);
    } catch (error) {
      console.error("RSVP viewer error:", error);
      showViewer(
        `${mode} RSVP - ${invitationTitle || "Invitation"}`,
        "Unable to load RSVP records right now.",
      );
      renderRsvps([]);
    }
  }

  async function viewAllRsvps(invitationId, invitationTitle) {
    currentInvitationId = invitationId || "";
    return fetchRsvps(
      `${apiBaseUrl}/api/rsvp/${encodeURIComponent(invitationId)}`,
      invitationTitle,
      "All",
    );
  }

  async function viewYesRsvps(invitationId, invitationTitle) {
    currentInvitationId = invitationId || "";
    return fetchRsvps(
      `${apiBaseUrl}/api/rsvp/yes/${encodeURIComponent(invitationId)}`,
      invitationTitle,
      "YES",
    );
  }

  function handleInvitationDeleted(event) {
    const deletedInvitationId = event?.detail?.invitationId || "";
    if (!deletedInvitationId) return;

    if (currentInvitationId && currentInvitationId === deletedInvitationId) {
      resetViewer("Invitation was deleted. RSVP records were removed.");
    }
  }

  function handleActionClick(event) {
    const button = event.target.closest(".rsvp-btn");
    if (!button) return;

    const invitationId = button.dataset.invitationId;
    const invitationTitle = button.dataset.invitationTitle || "Invitation";
    const action = button.dataset.action;

    if (!invitationId || !action) return;

    if (action === "all") {
      viewAllRsvps(invitationId, invitationTitle);
      return;
    }

    if (action === "yes") {
      viewYesRsvps(invitationId, invitationTitle);
    }
  }

  function init(deps) {
    apiBaseUrl = deps.apiBaseUrl;
    getAuthHeaders = deps.getAuthHeaders;
    clearAuthAndRedirect = deps.clearAuthAndRedirect;

    invitationList?.addEventListener("click", handleActionClick);
    window.addEventListener("invitation:deleted", handleInvitationDeleted);
  }

  window.RsvpViewerModule = {
    init,
    resetViewer,
  };
})();
