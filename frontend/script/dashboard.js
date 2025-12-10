window.addEventListener("DOMContentLoaded", async () => {
    console.log("Dashboard cargado");

    const storedUser = localStorage.getItem("user");
    if (!storedUser) return (window.location.href = "index.html");

    const user = JSON.parse(storedUser);

    const container = document.getElementById("dashboardContent");
    container.innerHTML = ""; 

    // diferentes paneles según tipo usuario
    if (user.userType === "artist") {
        container.innerHTML = `
            <section class="hero-panel">
                <h1>Panel de Artista</h1>
                <p class="subtitle">Administra tus perfiles y reservas.</p>

                <div class="menu-grid">
                    <a href="my-artist.html" class="action-card">
                        <div class="icon"><i class="bi bi-music-note-beamed"></i></div>
                        <h3>Mi Perfil de Artista</h3>
                        <p>Modifica tu información artística.</p>
                    </a>

                    <a href="bookings-artist.html" class="action-card">
                        <div class="icon"><i class="bi bi-calendar-check"></i></div>
                        <h3>Mis Reservas</h3>
                        <p>Solicitudes recibidas para tus shows.</p>
                    </a>

                    <a href="my-reviews.html" class="action-card">
                        <div class="icon"><i class="bi bi-star"></i></div>
                        <h3>Mis Reseñas</h3>
                        <p>Calificaciones de tus eventos.</p>
                    </a>
                </div>
            </section>
        `;
        return;
    }

    if (user.userType === "venue") {

      const venues = await fetch(`http://localhost:4000/api/venues/user/${user.id}`).then(r => r.json());

        container.innerHTML = `
            <section class="hero-panel">
                <h1>Tu Panel de Organizador</h1>
                <p class="subtitle">Administra tus locales, eventos y reservas.</p>

                <div class="stats-grid">
                    <div class="stat-card">
                      <h2>${venues.length}</h2>
                      <p>Locales registrados</p>
                    </div>
                    <div class="stat-card"><h2>0</h2><p>Eventos creados</p></div>
                    <div class="stat-card"><h2>0</h2><p>Reservas pendientes</p></div>
                    <div class="stat-card"><h2>0 ⭐</h2><p>Rating promedio</p></div>
                </div>
            </section>

            <section class="menu-grid">
                <a href="browse-artists.html" class="action-card">
                    <div class="icon"><i class="bi bi-search"></i></div>
                    <h3>Buscar Artistas</h3>
                    <p>Encuentra músicos disponibles.</p>
                </a>

                <a href="my-venues.html" class="action-card">
                    <div class="icon"><i class="bi bi-house-door"></i></div>
                    <h3>Mis Locales</h3>
                    <p>Administra tus venues registrados.</p>
                </a>

                <a href="my-events.html" class="action-card">
                    <div class="icon"><i class="bi bi-calendar-event"></i></div>
                    <h3>Mis Eventos</h3>
                    <p>Crea y administra eventos.</p>
                </a>

                <a href="pending-reservations.html" class="action-card">
                    <div class="icon"><i class="bi bi-inbox"></i></div>
                    <h3>Reservas Pendientes</h3>
                    <p>Revisa solicitudes nuevas.</p>
                </a>
            </section>
        `;
        return;
    }

    container.innerHTML = `
        <section class="hero-panel">
            <h1>Bienvenido a VenueBooker</h1>
            <p class="subtitle">Explora música, eventos y experiencias.</p>
        </section>

        <section class="menu-grid">
            <a href="browse-artists.html" class="action-card">
                <div class="icon"><i class="bi bi-search"></i></div>
                <h3>Buscar Artistas</h3>
            </a>

            <a href="browse-events.html" class="action-card">
                <div class="icon"><i class="bi bi-calendar"></i></div>
                <h3>Buscar Eventos</h3>
            </a>

            <a href="my-tickets.html" class="action-card">
                <div class="icon"><i class="bi bi-ticket-perforated"></i></div>
                <h3>Mis Tickets</h3>
            </a>
        </section>
    `;
});
