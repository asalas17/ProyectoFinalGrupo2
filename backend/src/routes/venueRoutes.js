import express from "express";
import {
  createVenue,
  getVenuesByUser,
  getVenue,
  updateVenue,
  deleteVenue
} from "../controllers/venueController.js";

const router = express.Router();

router.post("/", createVenue);
router.get("/user/:userId", getVenuesByUser);
router.get("/:id", getVenue);
router.put("/:id", updateVenue);
router.delete("/:id", deleteVenue);

export default router;
