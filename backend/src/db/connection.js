import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://administrador:proyectofinal2@proyectofinalgrupo2.hxdfyc1.mongodb.net/?retryWrites=true&w=majority",
  {
    dbName: "VenueBooker"
  }
)
.then(() => console.log("Mongo DB conectado ✔️"))
.catch((err) => console.error("Error conectando MongoDB:", err));
