import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  artistId: String,
  venueId: String,
  eventDate: Date,
  eventLocation: String,
  eventType: String,
  hoursDuration: Number,
  payment: Number,
  status: {
    type: String,
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},
{ collection: "Bookings" }
);

export default mongoose.model("Bookings", BookingSchema);
