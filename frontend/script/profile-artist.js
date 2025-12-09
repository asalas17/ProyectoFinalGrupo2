const params = new URLSearchParams(window.location.search);
const artistId = params.get("id");

async function loadProfile() {
    const res = await fetch(`http://localhost:4000/api/artist/${artistId}`);
    const a = await res.json();

    document.getElementById("artistName").textContent = a.artistName;

    document.getElementById("genres").textContent =
        `🎶 ${a.generoMusical} — ${a.estiloMusical}`;

    document.getElementById("bio").textContent = a.bio || "Sin biografía";

    document.getElementById("location").textContent =
        `${a.provincia}, ${a.distrito}`;

    document.getElementById("rate").textContent =
        a.tarifaBase ? `₡${a.tarifaBase}` : "No especificado";

    document.getElementById("instagram").innerHTML =
        a.instagram
            ? `<a href="https://instagram.com/${a.instagram.replace("@", "")}" target="_blank">@${a.instagram}</a>`
            : "No disponible";
}

async function loadReviews() {
    const res = await fetch(`http://localhost:4000/api/reviews/${artistId}`);
    const reviews = await res.json();
    const list = document.getElementById("reviews");

    list.innerHTML = "";

    if (reviews.length === 0) {
        list.textContent = "No hay reseñas todavía.";
        return;
    }

    reviews.forEach(r => {
        const li = document.createElement("li");
        li.textContent = `⭐${r.rating} — ${r.comment} (${r.userName})`;
        list.appendChild(li);
    });
}

document.getElementById("reviewForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    artistId,
    userName: document.getElementById("reviewer").value,
    rating: document.getElementById("rating").value,
    comment: document.getElementById("comment").value
  };

  await fetch("http://localhost:4000/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  alert("Gracias por tu reseña! ✔️");
  document.getElementById("reviewForm").reset();

  loadReviews();
});


loadProfile();
loadReviews();
