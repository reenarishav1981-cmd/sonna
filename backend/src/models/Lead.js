import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    area: { type: String, required: true, trim: true }, // village / area
    jewelleryType: {
      type: String,
      enum: ["Rings", "Chains", "Earrings", "Bangles", "Necklaces", "Bridal", "Daily Wear", "Occasion Wear", "Not sure yet"],
      required: true,
    },
    approxBudget: { type: String, trim: true }, // free text range, e.g. "50k-80k"
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String, required: true }, // e.g. "Morning", "Evening", or HH:mm
    status: {
      type: String,
      enum: ["new", "confirmed", "visited", "converted", "closed"],
      default: "new",
    },
    interestedDesignIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "DesignSample" }],
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
