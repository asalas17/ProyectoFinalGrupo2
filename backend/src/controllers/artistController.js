import Artists from "../models/Artist.js";

//GET
export const getArtist = async (req, res) => {
  try {
    let artist = await Artists.findOne({ userId: req.params.userId });

    //Si no encuentra por userId, intenta por _id
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

//INSERT
export const createArtist = async (req, res) => {
  try {
    const { userId } = req.body;

    // validacion si existe el artista
    const exist = await Artists.findOne({ userId });
    if (exist) {
      return res.status(400).json({ message: "Este perfil ya existe" });
    }

    // crear artista
    const artist = await Artists.create(req.body);
    console.log("REQ.BODY:", req.body);

    // actualizar artistId en Users
    console.log("ACTUALIZANDO USER:", userId, "CON ARTIST:", artist._id);
    await Users.findByIdAndUpdate(userId, {
      artistId: artist._id
    });


    // se retorna artistid
    return res.json({
      message: "Perfil creado  ",
      artistId: artist._id
    });


  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

//UPDATE
export const updateArtist = async (req, res) => {
  try {
    const { userId } = req.params;
    const updated = await Artists.findOneAndUpdate(
      { userId },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    res.json({ message: "Perfil actualizado", updated });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

//GET
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

