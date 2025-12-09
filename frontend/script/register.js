import { showMessage, isValidEmail } from "./app.js";

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const fullName = event.target.name.value.trim();
    const email = event.target.email.value.trim();
    const password = event.target.password.value.trim();
    const confirm = event.target.confirm.value.trim();
    const phone = event.target.phone.value.trim();
    const userType = event.target.userType.value.trim();

    if (password !== confirm) {
      showMessage("Las contraseñas no coinciden", "error");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, phone, userType })
      });

      const data = await res.json();

      if (!res.ok) {
        showMessage(data.message, "error");
      } else {
        showMessage("Cuenta creada correctamente 🎸", "success");
        registerForm.reset();
      }

    } catch (err) {
      showMessage("Error conectando con el servidor", "error");
    }
  });
}
