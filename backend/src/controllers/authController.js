import Users from "../models/User.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, phone, userType } = req.body;

    // Validar campos básicos
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    // Ver si ya existe
    const exist = await Users.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Este email ya está registrado" });
    }

    // Hash de contraseña
    const hashedPass = await bcrypt.hash(password, 10);

    const user = await Users.create({
      fullName,
      email,
      password: hashedPass,
      phone,
      userType,
      lastLogin: new Date()
    });


    res.json({
      message: "Usuario registrado correctamente",
      user: { id: user._id, fullName, email }
    });

  } catch (err) {
    res.status(500).json({ message: "Error del servidor", error: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    user.lastLogin = new Date();
    await user.save();

    res.json({
      message: "Login correcto",
      user: { 
        id: user._id, 
        fullName: user.fullName, 
        email: user.email,
        userType: user.userType
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Error del servidor", error: err.message });
  }
};

