import mongoose from "mongoose";

const VenueSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },

  venueName: String,
  venueType: String,
  description: String,
  capacity: Number,
  phone: String,

  location: {
    provincia: String,
    distrito: String
  },

  amenities: [String],

  openingHours: {
    lunes: String,
    martes: String,
    miércoles: String,
    jueves: String,
    viernes: String,
    sábado: String,
    domingo: String
  },

  stripeAccountId: String,
  averageVenueRating: Number,
  totalEvents: Number,

  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
},
{
  collection: "Venues"
});

export default mongoose.model("Venues", VenueSchema);
