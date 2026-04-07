const form = document.querySelector(".auth-form");
const API_BASE_URL =
  window.location.origin === "null"
    ? "http://localhost:4502"
    : window.location.origin;
const submitButton = form?.querySelector('button[type="submit"]');

const LOGIN_ENDPOINT = `${API_BASE_URL}/api/auth/login`;
const USER_DASHBOARD_PATH = "/client/pages/dashboard/index.html";
const ADMIN_DASHBOARD_PATH = "/client/pages/admin/index.html";

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return { message: text };
}

function setLoadingState(isLoading) {
  if (!submitButton) return;
  submitButton.disabled = isLoading;
  submitButton.textContent = isLoading ? "Logging in..." : "Log In";
}

function persistAuthData(data) {
  if (!data) return;

  const safeUser = {
    _id: data._id,
    name: data.name,
    email: data.email,
    role: data.role,
  };
  localStorage.setItem("authUser", JSON.stringify(safeUser));
}

function getRedirectPathByRole(role) {
  return role === "admin" ? ADMIN_DASHBOARD_PATH : USER_DASHBOARD_PATH;
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email")?.value.trim();
    const password = document.querySelector("#password")?.value;

    if (!email || !password) {
      alert("Email and password are required.");
      return;
    }

    setLoadingState(true);

    try {
      const response = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await parseResponse(response);

      if (!response.ok) {
        alert(data.message || "Login failed.");
        return;
      }

      persistAuthData(data);
      window.location.href = getRedirectPathByRole(data.role);
    } catch (error) {
      console.error("Login error:", error);
      alert("Unable to login right now. Please try again.");
    } finally {
      setLoadingState(false);
    }
  });
}
