import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
  {
    fullName: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    userType: { type: String, enum: ["artist", "venue", "consumer"], default: "consumer" },
    artistId: { type: mongoose.Schema.Types.ObjectId, ref: "Artists", default: null }, 
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    lastLogin: Date
  },
  {
    collection: "Users"
  }
);

export default mongoose.model("Users", UsersSchema);
