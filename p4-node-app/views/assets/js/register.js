const form = document.querySelector(".auth-form");
const API_BASE_URL =
  window.location.origin === "null"
    ? "http://localhost:4502"
    : window.location.origin;
const REGISTER_ENDPOINT = `${API_BASE_URL}/api/auth/register`;

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return { message: text };
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value;

    if (!name || !email || !password) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const response = await fetch(REGISTER_ENDPOINT, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await parseResponse(response);

      if (!response.ok) {
        alert(data.message || "Registration failed.");
        return;
      }

      alert("Registration successful. Please log in.");
      window.location.href = "/client/pages/auth/login.html";
    } catch (error) {
      alert("Unable to register right now. Please try again.");
      console.error(error);
    }
  });
}
