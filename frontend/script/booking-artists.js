const storedUser = localStorage.getItem("user");
if (!storedUser) {
  window.location.href = "index.html";
}

const user = JSON.parse(storedUser);

// Traemos bookings por artista
async function loadBookings() {
  const res = await fetch(`http://localhost:4000/api/bookings/artist/${user._id}`);
  const bookings = await res.json();

  const container = document.getElementById("bookingsContainer");
  container.innerHTML = "";

  bookings.forEach(b => {
    const div = document.createElement("div");
    div.className = "booking-card";

    div.innerHTML = `
      <p><strong>Evento:</strong> ${b.eventType}</p>
      <p><strong>Fecha:</strong> ${b.eventDate}</p>
      <p><strong>Lugar:</strong> ${b.eventLocation}</p>
      <p><strong>Duración:</strong> ${b.hoursDuration} horas</p>
      <p><strong>Pago:</strong> ₡${b.payment}</p>
      <p><strong>Estado:</strong> ${b.status}</p>

      ${b.status === "pending" ? `
        <button class="btn-accept" onclick="updateStatus('${b._id}', 'accepted')">Aceptar</button>
        <button class="btn-reject" onclick="updateStatus('${b._id}', 'rejected')">Rechazar</button>
      ` : ""}
    `;
    container.appendChild(div);
  });
}

async function updateStatus(id, status) {
  await fetch(`http://localhost:4000/api/bookings/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
  loadBookings(); // refresca
}

loadBookings();
