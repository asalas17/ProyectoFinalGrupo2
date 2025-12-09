import express from "express";
import { getArtist, createArtist, updateArtist, getAllArtists } from "../controllers/artistController.js";

const router = express.Router();

router.get("/all", getAllArtists);
router.get("/:userId", getArtist);
router.post("/", createArtist);
router.put("/:userId", updateArtist);



export default router;
