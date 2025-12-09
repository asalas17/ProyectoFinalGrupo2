import express from "express";
import cors from "cors";

import "./db/connection.js";
import authRoutes from "./routes/authRoutes.js";
import artistRoutes from "./routes/artistRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();
const PORT = 4000;   

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API VenueBooker funcionando! 🎸");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.use("/api/artist", artistRoutes);

app.use("/api/reviews", reviewRoutes);
