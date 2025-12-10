import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://administrador:proyectofinal2@proyectofinalgrupo2.hxdfyc1.mongodb.net/?retryWrites=true&w=majority",
  {
    dbName: "VenueBooker"
  }
)
  .then(() => console.log("DB conectada"))
  .catch((err) => console.error("Error conectando a DB:", err));
