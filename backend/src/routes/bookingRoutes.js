import express from "express";
import {
  createBooking,
  getBookingsByArtist,
  getBookingsByVenue
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/artist/:artistId", getBookingsByArtist);
router.get("/venue/:venueId", getBookingsByVenue);
router.put("/:bookingId", updateBookingStatus);


export default router;
