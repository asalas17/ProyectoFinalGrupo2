import Reviews from "../models/Review.js";

export const getReviews = async (req, res) => {
  try {
    const { artistId } = req.params;
    const reviews = await Reviews.find({ artistId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const review = await Reviews.create(req.body);
    res.json({ message: "Review agregada ✔️", review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
