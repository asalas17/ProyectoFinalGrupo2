// =======================================
// CONFIG
// =======================================
const days = [
    "lunes", "martes", "miércoles",
    "jueves", "viernes", "sábado", "domingo"
];

const storedUser = localStorage.getItem("user");
if (!storedUser) window.location.href = "index.html";
const user = JSON.parse(storedUser);

// UI sections
const listSection = document.getElementById("venueListSection");
const formSection = document.getElementById("venueFormSection");

let editingId = null;

// Inputs base
const venueName = document.getElementById("venueName");
const venueType = document.getElementById("venueType");
const description = document.getElementById("description");
const capacity = document.getElementById("capacity");
const phone = document.getElementById("phone");

const provincia = document.getElementById("provincia");
const distrito = document.getElementById("distrito");

const schedulePanel = document.getElementById("schedulePanel");
const amenityCheckboxes = document.querySelectorAll(".amenity");

// =======================================
// HORARIOS (Construcción UI)
// =======================================
function buildSchedulePanel(existing = null) {
    schedulePanel.innerHTML = "";

    days.forEach(day => {
        const dayData = existing?.[day] || "";

        schedulePanel.innerHTML += `
      <div style="margin-bottom: 12px;">
        <strong style="display:block; margin-bottom:4px;">${day.toUpperCase()}</strong>

        <label>
          <input type="checkbox" class="closedDay" data-day="${day}"
              ${dayData === "Cerrado" ? "checked" : ""} />
          Cerrado
        </label>

        <div class="hourFields" data-day="${day}" 
             style="margin-top:6px; display:${dayData === "Cerrado" ? "none" : "block"};">
          <input type="time" class="startHour" data-day="${day}"
            value="${dayData && dayData !== 'Cerrado' ? dayData.split(" - ")[0] : ""}" />

          <input type="time" class="endHour" data-day="${day}"
            value="${dayData && dayData !== 'Cerrado' ? dayData.split(" - ")[1] : ""}" />
        </div>
      </div>
    `;
    });

    // Toggle visual (cerrado)
    document.querySelectorAll(".closedDay").forEach(cb => {
        cb.addEventListener("change", () => {
            const day = cb.dataset.day;
            const fields = document.querySelector(`.hourFields[data-day="${day}"]`);
            fields.style.display = cb.checked ? "none" : "block";
        });
    });
}

window.addEventListener("DOMContentLoaded", () => {
    buildSchedulePanel();
});

// =======================================
// AMENITIES Y HORARIOS
// =======================================
function getAmenities() {
    return [...amenityCheckboxes]
        .filter(cb => cb.checked)
        .map(cb => cb.value);
}

function getOpeningHours() {
    const object = {};

    days.forEach(day => {
        const closed = document.querySelector(`.closedDay[data-day="${day}"]`).checked;

        if (closed) {
            object[day] = "Cerrado";
        } else {
            const start = document.querySelector(`.startHour[data-day="${day}"]`).value;
            const end = document.querySelector(`.endHour[data-day="${day}"]`).value;
            object[day] = `${start} - ${end}`;
        }
    });

    return object;
}

// =======================================
// MOSTRAR LISTA DE VENUES
// =======================================
async function loadVenues() {
    const res = await fetch(`http://localhost:4000/api/venues/user/${user.id}`);
    const venues = await res.json();

    const list = document.getElementById("venueList");
    list.innerHTML = "";

    if (!venues.length) {
        list.innerHTML = `<p>No tienes venues aún.</p>`;
        return;
    }

    venues.forEach(v => {
        const div = document.createElement("div");
        div.className = "booking-card";

        div.innerHTML = `
      <p><strong>${v.venueName}</strong> (${v.venueType})</p>
      <p>${v.description}</p>
      <p><strong>Capacidad:</strong> ${v.capacity}</p>

      <button class="btn-details" onclick="editVenue('${v._id}')">Editar</button>
      <button class="btn-reject" onclick="deleteVenue('${v._id}')">Eliminar</button>
    `;

        list.append(div);
    });
}
window.deleteVenue = async function (id) {
    if (!confirm("¿Eliminar este venue?")) return;

    await fetch(`http://localhost:4000/api/venues/${id}`, { method: "DELETE" });

    loadVenues();
};

document.getElementById("createVenueBtn").onclick = () => {
    editingId = null;
    formSection.style.display = "block";
    listSection.style.display = "none";
    document.getElementById("venueForm").reset();
    buildSchedulePanel();
};

window.editVenue = async function (id) {
    editingId = id;

    const res = await fetch(`http://localhost:4000/api/venues/${id}`);
    const v = await res.json();

    // cambiar pantalla
    listSection.style.display = "none";
    formSection.style.display = "block";

    venueName.value = v.venueName;
    venueType.value = v.venueType;
    description.value = v.description;
    capacity.value = v.capacity;
    phone.value = v.phone;

    provincia.value = v.location?.provincia || "";
    distrito.value = v.location?.distrito || "";

    amenityCheckboxes.forEach(cb => {
        cb.checked = v.amenities?.includes(cb.value);
    });

    buildSchedulePanel(v.openingHours);
};

document.getElementById("venueForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
        userId: user.id,
        venueName: venueName.value,
        venueType: venueType.value,
        description: description.value,
        capacity: capacity.value,
        phone: phone.value,
        location: {
            provincia: provincia.value,
            distrito: distrito.value
        },
        amenities: getAmenities(),
        openingHours: getOpeningHours()
    };

    const url = editingId
        ? `http://localhost:4000/api/venues/${editingId}`
        : `http://localhost:4000/api/venues`;

    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    alert("Guardado  ");

    formSection.style.display = "none";
    listSection.style.display = "block";
    loadVenues();
});

document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {

        if (!btn.dataset.tab) return;

        const currentTab = document.querySelector(".tab-content.active");
        if (currentTab) currentTab.classList.remove("active");

        document.querySelector(".tab.active").classList.remove("active");
        btn.classList.add("active");

        document.getElementById(btn.dataset.tab).classList.add("active");
    });
});


loadVenues();
