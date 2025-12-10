import Users from "../models/User.js";
import Artists from "../models/Artist.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, phone, userType } = req.body;

    // Validar campos vacios
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    // Revisar dup
    const exist = await Users.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email ya registrado" });
    }

    //encripta la contra
    const hashedPass = await bcrypt.hash(password, 10);

    //crear user
    const user = await Users.create({
      fullName,
      email,
      password: hashedPass,
      phone,
      userType,
      lastLogin: new Date()
    });

    let artistId = null;

    //si es artista crea el perfil
    if (userType === "artist") {
      const newArtist = await Artists.create({
        userId: user._id,
        artistName: fullName,
        genre: "",
        bio: "",
        phone: phone || "",
        rating: 0,
        isAvailable: true,
      });

      artistId = newArtist._id;

      await Users.findByIdAndUpdate(user._id, {
        artistId
      });
    }

    //respuesta al usuario
    res.json({
      message: "Usuario registrado correctamente",
      user: {
        id: user._id,
        fullName,
        email,
        userType,
        artistId
      }
    });

  } catch (err) {
    res.status(500).json({
      message: "Error del servidor",
      error: err.message
    });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validacion
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    //validar pass
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    //actualizar last login
    user.lastLogin = new Date();
    await user.save();

    //respuesta
    res.json({
      message: "Login correcto",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        userType: user.userType,
        artistId: user.artistId || null
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Error del servidor", error: err.message });
  }
};

