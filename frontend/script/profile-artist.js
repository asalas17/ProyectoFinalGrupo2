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

let selectedRating = 0;

document.querySelectorAll("#starRating i").forEach(star => {
    star.addEventListener("mouseover", () => highlightStars(star.dataset.value));
    star.addEventListener("mouseout", () => highlightStars(selectedRating));
    star.addEventListener("click", () => {
        selectedRating = star.dataset.value;
        highlightStars(selectedRating);
    });
});

function highlightStars(limit) {
    document.querySelectorAll("#starRating i").forEach(s => {
        s.classList.remove("active");
        if (s.dataset.value <= limit) {
            s.classList.add("active");
        }
    });
}

async function loadReviews() {
    const res = await fetch(`http://localhost:4000/api/reviews/${artistId}`);
    const reviews = await res.json();
    const list = document.getElementById("reviews");

    list.innerHTML = "";

    if (reviews.length === 0) {
        list.innerHTML = `<p>No hay reseñas todavía.</p>`;
        return;
    }

    reviews.forEach(r => {
        const div = document.createElement("div");
        div.className = "review-item";
        div.innerHTML = `
            <p><strong>${"⭐".repeat(r.rating)}</strong></p>
            <p>${r.comment}</p>
            <small>— ${r.userName}</small>
        `;
        list.appendChild(div);
    });
}

document.getElementById("submitReviewBtn").addEventListener("click", async () => {

    const userName = document.getElementById("reviewDisplayName").value.trim();
    const comment = document.getElementById("reviewComment").value.trim();

    if (selectedRating === 0) {
        alert("Selecciona una calificación ⭐");
        return;
    }

    if (!userName || !comment) {
        alert("Completa todos los campos.");
        return;
    }

    const payload = {
        artistId,
        userName,
        rating: selectedRating,
        comment
    };

    await fetch("http://localhost:4000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    alert("Gracias por tu reseña  ");

    selectedRating = 0;
    highlightStars(0);
    document.getElementById("reviewDisplayName").value = "";
    document.getElementById("reviewComment").value = "";

    loadReviews();
});

loadProfile();
loadReviews();
