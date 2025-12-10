import express from "express";
import cors from "cors";

import "./db/connection.js";
import authRoutes from "./routes/authRoutes.js";
import artistRoutes from "./routes/artistRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import venueRoutes from "./routes/venueRoutes.js";

const app = express();
const PORT = 4000;   

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API encendida");
});

app.listen(PORT, () => {
  console.log(`Corriendo en http://localhost:${PORT}`);
});

app.use("/api/auth", authRoutes);
app.use("/api/artist", artistRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/venues", venueRoutes)
