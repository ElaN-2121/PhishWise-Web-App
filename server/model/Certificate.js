import mongoose from "mongoose";

const certificateSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    certificateId: { type: String, required: true, unique: true },
    level: { type: String, enum: ["Intermediate", "Expert"], required: true },
    percentage: { type: Number, required: true },
    issuedAt: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now }
  }
);

export default mongoose.model("Certificate", certificateSchema);
