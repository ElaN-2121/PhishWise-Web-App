import mongoose from "mongoose";

const attemptSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    question: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
    isCorrect: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now }
  }
);

export default mongoose.model("Attempt", attemptSchema);
