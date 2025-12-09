window.addEventListener("DOMContentLoaded", () => {
  console.log("DASHBOARD JS CARGADO");


  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    window.location.href = "index.html";
  }

  const user = JSON.parse(storedUser);

  document.getElementById("welcomeText").textContent = `👋 Hola, ${user.fullName}`;

  const title = document.getElementById("title");
  const content = document.getElementById("content");

  if (user.userType === "artist") {
    title.textContent = "Panel de Músico";
    content.innerHTML = `
      <ul>
        <li><a href="my-artist.html">Mis Perfiles Artísticos</a></li>
        <li><a href="bookings-artist.html">Mis Reservas</a></li>
        <li><a href="reviews-artist.html">Mis Reseñas</a></li>
      </ul>
    `;
  }
  // Venue (organizador)
  else if (user.userType === "venue") {
    title.textContent = "Panel de Local/Organizador";
    content.innerHTML = `
    <ul>
      <li><a href="browse-artists.html">Buscar Artistas</a></li>
      <li><a href="my-venues.html">Mis Locales</a></li>
      <li><a href="events-venue.html">Mis Eventos</a></li>
      <li><a href="bookings-venue.html">Reservas Pendientes</a></li>
    </ul>
  `;
  }

  // Consumer (usuario final)
  else if (user.userType === "consumer") {
    title.textContent = "Panel de Usuario";
    content.innerHTML = `
    <ul>
      <li><a href="browse-artists.html">Buscar Artistas</a></li>
      <li><a href="browse-events.html">Buscar Eventos</a></li>
      <li><a href="my-tickets.html">Mis Tickets</a></li>
      <li><a href="favorites.html">Favoritos</a></li>
    </ul>
  `;
  }



  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "index.html";
  });

  console.log("USER DATA:", user);
  console.log("title:", title);
  console.log("content:", content);
  console.log("TIPO:", user.userType);

});
