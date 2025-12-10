async function loadDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  try {
    const res = await fetch(`http://localhost:4000/api/bookings/${id}`);
    const b = await res.json();

    document.getElementById("eventType").textContent = b.eventType;
    document.getElementById("eventDate").textContent =
      new Date(b.eventDate).toLocaleString();
    document.getElementById("duration").textContent = `${b.hoursDuration} horas`;
    document.getElementById("location").textContent = b.eventLocation;
    document.getElementById("payment").textContent = `₡${b.payment.toLocaleString()}`;
    document.getElementById("description").textContent =
      b.eventDescription || "No indicada";
    document.getElementById("status").textContent = b.status;

  } catch (err) {
    console.error("Error:", err);
  }
}

loadDetails();
