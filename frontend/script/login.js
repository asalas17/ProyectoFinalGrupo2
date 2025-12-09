import { showMessage } from "./app.js";

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = event.target.email.value.trim();
    const password = event.target.password.value.trim();

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        showMessage(data.message, "error");
      } else {
        // GUARDAR EL USER EN LOCALSTORAGE 🔥
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.user.id,
            fullName: data.user.fullName,
            userType: data.user.userType   // <-- ESTO
          })
        );


        showMessage(`Bienvenido ${data.user.fullName}! 🎉`, "success");

        setTimeout(() => window.location.href = "dashboard.html", 900);
      }

    } catch (err) {
      showMessage("Error conectando al servidor", "error");
    }
  });
}
