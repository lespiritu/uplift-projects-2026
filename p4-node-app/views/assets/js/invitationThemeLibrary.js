(function () {
  const PRESETS = {
    classic: {
      "--theme-primary": "#254f78",
      "--theme-accent": "#c89b3c",
      "--theme-soft": "#f3efe6",
      "--theme-heading-font": "'Georgia', 'Times New Roman', serif",
      "--theme-body-font": "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    modern: {
      "--theme-primary": "#0f172a",
      "--theme-accent": "#0ea5e9",
      "--theme-soft": "#eaf7ff",
      "--theme-heading-font": "'Trebuchet MS', 'Segoe UI', sans-serif",
      "--theme-body-font": "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    minimal: {
      "--theme-primary": "#1f2937",
      "--theme-accent": "#4b5563",
      "--theme-soft": "#f8fafc",
      "--theme-heading-font": "'Helvetica Neue', Arial, sans-serif",
      "--theme-body-font": "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    floral: {
      "--theme-primary": "#6b2f5b",
      "--theme-accent": "#d48fb9",
      "--theme-soft": "#fff1f8",
      "--theme-heading-font": "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
      "--theme-body-font": "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    elegant: {
      "--theme-primary": "#1f2937",
      "--theme-accent": "#b48a3d",
      "--theme-soft": "#f8f3e8",
      "--theme-heading-font": "'Garamond', 'Times New Roman', serif",
      "--theme-body-font": "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
  };

  function toThemeClassName(themeName) {
    const normalized = String(themeName || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!normalized) return "";
    return `theme-${normalized}`;
  }

  function applyThemeNameClass(themeName) {
    if (!document?.body) return;

    const classNames = Array.from(document.body.classList);
    classNames
      .filter((className) => className.startsWith("theme-"))
      .forEach((className) => document.body.classList.remove(className));

    const themeClassName = toThemeClassName(themeName);
    if (themeClassName) {
      document.body.classList.add(themeClassName);
    }
  }

  function applyTheme(theme) {
    const templateKey = theme?.templateKey || "classic";
    const preset = PRESETS[templateKey] || PRESETS.classic;

    document.body.dataset.template = templateKey;
    applyThemeNameClass(theme?.name);

    Object.entries(preset).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });

    if (theme?.colorScheme) {
      document.documentElement.style.setProperty(
        "--theme-custom-scheme",
        String(theme.colorScheme),
      );
    }
  }

  function startCountdown(eventDateInput, countdownEl) {
    if (!countdownEl) return null;
    const eventDate = new Date(eventDateInput);
    if (Number.isNaN(eventDate.getTime())) {
      countdownEl.textContent = "Countdown unavailable";
      return null;
    }

    function update() {
      const now = new Date().getTime();
      const distance = eventDate.getTime() - now;

      if (distance <= 0) {
        countdownEl.textContent = "Event is happening or already started.";
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    update();
    return window.setInterval(update, 1000);
  }

  window.InvitationThemeLibrary = {
    applyTheme,
    startCountdown,
  };
})();
