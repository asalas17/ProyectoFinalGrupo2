console.log("🔍 Cargando Mis Reseñas...");

const user = JSON.parse(localStorage.getItem("user"));

// Validación
if (!user || user.userType !== "artist" || !user.artistId) {
    console.error("No se encontró un artistId en localStorage");
    document.getElementById("reviewsContainer").innerHTML =
        "<p>Error: No se pudo identificar tu perfil de artista.</p>";
    throw new Error("Artist not found");
}

const artistId = user.artistId;

async function loadReviews() {
    try {
        const res = await fetch(`http://localhost:4000/api/reviews/${artistId}`);
        const reviews = await res.json();

        const container = document.getElementById("reviewsContainer");
        container.innerHTML = "";

        if (!reviews.length) {
            container.innerHTML = `<p>No tienes reseñas aún.</p>`;
            return;
        }

        reviews.forEach(r => {
            const div = document.createElement("div");
            div.className = "review-card";

            const rating = Number(r.rating) || 0;
            const stars = "⭐".repeat(rating);

            const date = r.createdAt
                ? new Date(r.createdAt).toLocaleDateString("es-CR")
                : "Fecha desconocida";

            div.innerHTML = `
                <div class="review-rating">${stars}</div>
                <div class="review-user"><i class="bi bi-person"></i> ${r.userName || "Anónimo"}</div>
                <div class="review-comment">"${r.comment || "Sin comentario"}"</div>
                <div class="review-date"><i class="bi bi-calendar"></i> ${date}</div>
            `;

            container.appendChild(div);
        });

    } catch (err) {
        console.error("Error cargando reseñas:", err);
        document.getElementById("reviewsContainer").innerHTML =
            "<p>Ocurrió un error al cargar tus reseñas.</p>";
    }
}

loadReviews();
