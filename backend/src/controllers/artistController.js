import Artists from "../models/Artist.js";

export const getArtist = async (req, res) => {
  try {
    let artist = await Artists.findOne({ userId: req.params.userId });

    // Si no lo encuentra por userId, intenta por _id
    if (!artist) {
      artist = await Artists.findById(req.params.userId);
    }

    if (!artist) {
      return res.status(404).json({ message: "Artista no encontrado" });
    }

    return res.json(artist);
  } catch (error) {
    console.error("Error getArtist:", error);
    return res.status(500).json({ message: "Error", error });
  }
};


export const createArtist = async (req, res) => {
    try {
        const { userId } = req.body;

        const exist = await Artists.findOne({ userId });
        if (exist) {
            return res.status(400).json({ message: "Este perfil ya existe" });
        }

        const artist = await Artists.create(req.body);
        res.json({ message: "Perfil creado ✔️", artist });

    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message });
    }
};

export const updateArtist = async (req, res) => {
    try {
        const { userId } = req.params;
        const updated = await Artists.findOneAndUpdate(
            { userId },
            { ...req.body, updatedAt: new Date() },
            { new: true }
        );
        res.json({ message: "Perfil actualizado ✔️", updated });
    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message });
    }
};

export const getAllArtists = async (req, res) => {
  try {
    console.log("Buscando artistas con filters:", req.query);

    const query = {};

    if (req.query.provincia) query["location.provincia"] = req.query.provincia;
    if (req.query.genre) query.genre = req.query.genre;
    if (req.query.maxPrice) query.tarifaBase = { $lte: req.query.maxPrice };

    const artists = await Artists.find(query);

    console.log("Artistas encontrados:", artists.length);

    return res.json(artists);
  } catch (err) {
    console.error("Error getAllArtists:", err);
    return res.status(500).json({ message: "Error", error: err });
  }
};

