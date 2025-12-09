async function loadArtists(filters={}) {
  let url = new URL("http://localhost:4000/api/artist/all");

  if (filters.provincia) url.searchParams.set("provincia", filters.provincia);
  if (filters.genero) url.searchParams.set("generoMusical", filters.genero);
  if (filters.maxTarifa) url.searchParams.set("tarifaBase", filters.maxTarifa);

  const res = await fetch(url);
  const artists = await res.json();

  const container = document.getElementById("results");
  container.innerHTML = "";

  if (artists.length === 0) {
    container.textContent = "No se encontraron artistas.";
    return;
  }

  artists.forEach(a => {
    const card = document.createElement("div");
    card.className = "artist-card-public";
    card.innerHTML = `
      <h3>${a.artistName}</h3>
      <p>${a.generoMusical} — ${a.estiloMusical}</p>
      <p>${a.provincia}</p>
      <p>₡${a.tarifaBase || "Sin tarifa"}</p>
      <a href="profile-artist.html?id=${a._id}">Ver Perfil</a>
    `;
    container.appendChild(card);
  });
}

document.getElementById("filterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  loadArtists({
    provincia: document.getElementById("provincia").value,
    genero: document.getElementById("genero").value,
    maxTarifa: document.getElementById("maxTarifa").value
  });
});

loadArtists();
