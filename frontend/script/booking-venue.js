const storedUser = localStorage.getItem("user");
if (!storedUser) window.location.href = "index.html";

const user = JSON.parse(storedUser);

async function loadBookings() {
  const res = await fetch(`http://localhost:4000/api/bookings/venue/${user.id}`);
  const bookings = await res.json();

  const container = document.getElementById("bookingsContainer");
  container.innerHTML = "";

  if (!bookings.length) {
    container.innerHTML = `<p>No tienes reservas todavía.</p>`;
    return;
  }

  bookings.forEach(b => {
    const div = document.createElement("div");
    div.className = "booking-card";

    div.innerHTML = `
      <p><strong>${b.eventType}</strong></p>
      <p><strong>Fecha:</strong> ${new Date(b.eventDate).toLocaleString()}</p>
      <p><strong>Músico:</strong> ${b.artistName || "No indicado"}</p>
      <p><strong>Pago:</strong> ₡${b.payment.toLocaleString()}</p>
      <p class="booking-status status-${b.status}">${b.status.toUpperCase()}</p>

      <button class="btn-details" onclick="window.location.href='booking-details.html?id=${b._id}'">Ver detalles</button>
    `;
    container.appendChild(div);
  });
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "index.html";
});

loadBookings();
