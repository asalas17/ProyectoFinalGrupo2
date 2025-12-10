import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema({
  userId: String,
  artistName: String,
  phone: String,
  genre: String,
  bio: String,
  members: Number,
  yearsActive: Number,
  location: Object,
  socialMedia: Object,
  isAvailable: Boolean,
  averageArtistRating: Number,
  totalShows: Number,
  reviewsCount: Number,
  stripeAccountId: String,
  createdAt: Date
},
{ collection: "Artists" }
);


export default mongoose.model("Artists", ArtistSchema);
