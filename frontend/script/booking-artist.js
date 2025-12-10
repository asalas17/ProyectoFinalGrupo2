const storedUser = localStorage.getItem("user");
if (!storedUser) window.location.href = "index.html";

const user = JSON.parse(storedUser);

// Solo permitir si es artista
if (user.userType !== "artist") {
  alert("Acceso restringido. Solo artistas pueden ver reservas recibidas.");
  window.location.href = "dashboard.html";
}

async function loadBookings() {
  const res = await fetch(`http://localhost:4000/api/bookings/artist/${user.artistId}`);
  const bookings = await res.json();

  const container = document.getElementById("bookingsContainer");
  container.innerHTML = "";

  if (!bookings.length) {
    container.innerHTML = `<p>No tienes reservas por ahora.</p>`;
    return;
  }

  bookings.forEach(b => {
    const div = document.createElement("div");
    div.className = "booking-card";

    div.innerHTML = `
      <p><strong>${b.eventType}</strong></p>
      <p><strong>Fecha:</strong> ${formatDate(b.eventDate)}</p>
      <p><strong>Lugar:</strong> ${b.eventLocation}</p>
      <p><strong>Pago:</strong> ₡${b.payment.toLocaleString()}</p>

      <p class="booking-status status-${b.status}">
        ${b.status.toUpperCase()}
      </p>

      ${b.status === "pending" ? `
        <button class="btn-accept" data-id="${b._id}">Aceptar</button>
        <button class="btn-reject" data-id="${b._id}">Rechazar</button>
      ` : ""}

      <button class="btn-details" onclick="viewDetails('${b._id}')">
        Ver detalles
      </button>
    `;

    container.appendChild(div);
  });

  attachActionHandlers();
}


// ⭐ Manejar botones dinámicos sin inline onclick
function attachActionHandlers() {
  document.querySelectorAll(".btn-accept").forEach(btn => {
    btn.addEventListener("click", () => updateStatus(btn.dataset.id, "accepted"));
  });

  document.querySelectorAll(".btn-reject").forEach(btn => {
    btn.addEventListener("click", () => updateStatus(btn.dataset.id, "rejected"));
  });
}


// ⭐ Actualizar estado mediante API
async function updateStatus(id, newStatus) {
  const res = await fetch(`http://localhost:4000/api/bookings/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: newStatus })
  });

  if (res.ok) {
    alert(`Reserva ${newStatus === "accepted" ? "aceptada" : "rechazada"}.`);
    loadBookings(); // Recargar lista actualizada ⭐
  } else {
    alert("Error actualizando estado.");
  }
}


// ⭐ Navegar al detalle
function viewDetails(id) {
  window.location.href = `booking-details.html?id=${id}`;
}


// formatear fecha 
function formatDate(date) {
  return new Date(date).toLocaleDateString("es-CR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}


loadBookings();
