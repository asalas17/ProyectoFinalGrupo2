// Injectar Bootstrap Icons en el <head> si no existe
if (!document.querySelector('link[href*="bootstrap-icons"]')) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css";
    document.head.appendChild(link);
}

window.addEventListener("DOMContentLoaded", () => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const container = document.getElementById("globalHeaderContainer");
    if (!container) return;

    container.innerHTML = `
        <header class="global-header">
            <div class="header-left">
                <a href="dashboard.html" class="header-logo">VenueBooker</a>

                <!-- BOTÓN REUTILIZABLE -->
                <button id="backToDashboardBtn" class="back-btn">
                    <i class="bi bi-arrow-left"></i> Dashboard
                </button>
            </div>

            <div class="header-right">
                <div class="user-info">
                    <div class="user-avatar"><i class="bi bi-person-circle"></i></div>
                    <span class="user-name">${user?.fullName || "Usuario"}</span>
                </div>

                <button id="logoutBtn" class="logout-btn">
                    <i class="bi bi-box-arrow-right"></i>
                </button>
            </div>
        </header>
    `;

    // Función del botón volver
    document.getElementById("backToDashboardBtn").onclick = () => {
        window.location.href = "dashboard.html";
    };

    // Función de logout
    document.getElementById("logoutBtn").onclick = () => {
        localStorage.removeItem("user");
        window.location.href = "index.html";
    };
});
