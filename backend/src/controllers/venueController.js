import Venues from "../models/Venue.js";

//INSERT
export const createVenue = async (req, res) => {
  try {
    const venue = await Venues.create({
      userId: req.body.userId,
      venueName: req.body.venueName,
      venueType: req.body.venueType,
      description: req.body.description,
      capacity: req.body.capacity,
      phone: req.body.phone,

      location: {
        provincia: req.body.provincia,
        distrito: req.body.distrito
      },

      amenities: req.body.amenities || [],

      openingHours: req.body.openingHours || {},

      stripeAccountId: req.body.stripeAccountId || null,
      averageVenueRating: 0,
      totalEvents: 0,
      isActive: true
    });

    return res.json({ message: "Venue creado  ", venue });
  } catch (err) {
    return res.status(500).json({ message: "Error", error: err.message });
  }
};

//GET
export const getVenuesByUser = async (req, res) => {
  try {
    const venues = await Venues.find({ userId: req.params.userId });
    return res.json(venues);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

//GET
export const getVenue = async (req, res) => {
  try {
    const venue = await Venues.findById(req.params.id);
    if (!venue) return res.status(404).json({ message: "Venue no encontrado" });
    return res.json(venue);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

//DELETE
export const deleteVenue = async (req, res) => {
  try {
    const removed = await Venues.findByIdAndDelete(req.params.id);

    if (!removed) {
      return res.status(404).json({ message: "Venue no encontrado" });
    }

    return res.json({ message: "Venue eliminado  " });

  } catch (err) {
    return res.status(500).json({ message: "Error", error: err.message });
  }
};

//UPDATE
export const updateVenue = async (req, res) => {
  try {
    const updated = await Venues.findByIdAndUpdate(
      req.params.id,
      {
        venueName: req.body.venueName,
        venueType: req.body.venueType,
        description: req.body.description,
        capacity: req.body.capacity,
        phone: req.body.phone,

        location: {
          provincia: req.body.provincia,
          distrito: req.body.distrito
        },

        amenities: req.body.amenities,
        openingHours: req.body.openingHours
      },
      { new: true }
    );

    return res.json({ message: "Venue actualizado  ", updated });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

