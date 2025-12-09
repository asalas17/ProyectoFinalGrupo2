const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location.href = "index.html";

const artistForm = document.getElementById("artistForm");

async function loadProfile() {
    const res = await fetch(`http://localhost:4000/api/artist/${user.id}`);
    const data = await res.json();

    if (data) {
        document.getElementById("artistName").value = data.artistName || "";
        document.getElementById("genre").value = data.genre || "";
        document.getElementById("bio").value = data.bio || "";
        document.getElementById("instagram").value = data.instagram || "";
        document.getElementById("estiloMusical").value = data.estiloMusical || "";
        document.getElementById("provincia").value = data.provincia || "";
        document.getElementById("distrito").value = data.distrito || "";
        document.getElementById("telefonoArtista").value = data.telefonoArtista || "";
        document.getElementById("correoArtista").value = data.correoArtista || "";
        document.getElementById("tarifaBase").value = data.tarifaBase || "";

    }
}

artistForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
        userId: user.id,
        artistName: document.getElementById("artistName").value,
        generoMusical: document.getElementById("genre").value,
        estiloMusical: document.getElementById("estiloMusical").value,
        bio: document.getElementById("bio").value,
        provincia: document.getElementById("provincia").value,
        distrito: document.getElementById("distrito").value,
        telefonoArtista: document.getElementById("telefonoArtista").value,
        correoArtista: document.getElementById("correoArtista").value,
        tarifaBase: document.getElementById("tarifaBase").value,
        instagram: document.getElementById("instagram").value,
    };


    // Check if exists
    const check = await fetch(`http://localhost:4000/api/artist/${user.id}`);
    const exists = await check.json();

    if (exists) {
        await fetch(`http://localhost:4000/api/artist/${user.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
    } else {
        await fetch("http://localhost:4000/api/artist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
    }

    alert("Perfil guardado ✔️");
});

// logout
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "index.html";
});

// Load initial profile
loadProfile();
