const API_BASE = "http://localhost:4000/api";

const storedUser = localStorage.getItem("user");
if (!storedUser) {
  window.location.href = "index.html";
}

const user = JSON.parse(storedUser);
// solo permitir artista
if (user.userType !== "artist") {
  window.location.href = "dashboard.html";
}

const artistForm = document.getElementById("artistForm");
const $ = (id) => document.getElementById(id);

async function loadProfile() {
  // si el usuario no tiene perfil artista, no hace req
  if (!user.artistId) {
    console.log("Este usuario aún no tiene perfil artístico.");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/artist/${user.artistId}`);
    if (!res.ok) {
      console.warn("No se pudo cargar el perfil artístico:", await res.text());
      return;
    }

    const data = await res.json();
    console.log("Perfil artístico cargado:", data);
    $("artistName").value = data.artistName || "";
    $("genre").value = data.generoMusical || "";
    $("bio").value = data.bio || "";
    $("instagram").value = data.instagram || "";
    $("estiloMusical").value = data.estiloMusical || "";
    $("provincia").value = data.provincia || "";
    $("distrito").value = data.distrito || "";
    $("telefonoArtista").value = data.telefonoArtista || "";
    $("correoArtista").value = data.correoArtista || "";
    $("tarifaBase").value = data.tarifaBase ?? "";
  } catch (err) {
    console.error("Error cargando perfil artista:", err);
  }
}

artistForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    userId: user.id,
    artistName: $("artistName").value.trim(),
    generoMusical: $("genre").value.trim(), 
    bio: $("bio").value.trim(),
    instagram: $("instagram").value.trim(),
    estiloMusical: $("estiloMusical").value.trim(),
    provincia: $("provincia").value,
    distrito: $("distrito").value.trim(),
    telefonoArtista: $("telefonoArtista").value.trim(),
    correoArtista: $("correoArtista").value.trim(),
    tarifaBase: Number($("tarifaBase").value) || 0,
  };

  try {
    let res;

    if (user.artistId) {
      res = await fetch(`${API_BASE}/artist/${user.artistId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      res = await fetch(`${API_BASE}/artist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    if (!res.ok) {
      const errText = await res.text();
      console.error("Error guardando perfil:", errText);
      alert("No se pudo guardar el perfil. Revisa la consola para más detalle.");
      return;
    }

    const data = await res.json();
    console.log("Respuesta guardado perfil:", data);

    const artistDoc = data.artist || data;

    if (!user.artistId && artistDoc && artistDoc._id) {
      user.artistId = artistDoc._id;
      localStorage.setItem("user", JSON.stringify(user));
      console.log("artistId actualizado en localStorage:", user.artistId);
    }

    alert("Perfil guardado  ");
  } catch (err) {
    console.error("Error guardando perfil:", err);
    alert("Ocurrió un error al guardar el perfil.");
  }
});

loadProfile();
