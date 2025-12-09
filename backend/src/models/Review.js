import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    artistId: String,
    userName: String,
    rating: Number,
    comment: String,
    createdAt: { type: Date, default: Date.now }
  },
  { collection: "Reviews" }
);

export default mongoose.model("Reviews", ReviewSchema);
