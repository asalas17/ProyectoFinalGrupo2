import Bookings from "../models/Booking.js";

//INSERT
export const createBooking = async (req, res) => {
  try {
    const booking = await Bookings.create(req.body);
    return res.json(booking);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Error", error });
  }
};

//GET
export const getBookingsByArtist = async (req, res) => {
  try {
    const bookings = await Bookings.find({ artistId: req.params.artistId });
    return res.json(bookings);
  } catch (error) {
    return res.status(500).json({ message: "Error", error });
  }
};

//GET
export const getBookingsByVenue = async (req, res) => {
  try {
    const bookings = await Bookings.find({ venueId: req.params.venueId });
    return res.json(bookings);
  } catch (error) {
    return res.status(500).json({ message: "Error", error });
  }
};

//UPDATE
export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Bookings.findById(req.params.bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking no encontrado" });
    }

    booking.status = req.body.status;
    await booking.save();

    return res.json({ message: "Estado actualizado", booking });
  } catch (error) {
    return res.status(500).json({ message: "Error", error });
  }
};

//GET
export const getBookingById = async (req, res) => {
  try {
    const booking = await Bookings.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking no encontrado" });
    }

    return res.json(booking);

  } catch (err) {
    return res.status(500).json({
      message: "Error",
      error: err.message
    });
  }
};

