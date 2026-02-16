import mongoose from "mongoose";

const questionSchema = mongoose.Schema(
  {
    questionText: { type: String, required: true },
    type: { type: String, enum: ["knowledge", "realworld", "lab"], required: true },
    options: [{ type: String }],
    correctAnswer: { type: String, required: true },
    explanation: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
