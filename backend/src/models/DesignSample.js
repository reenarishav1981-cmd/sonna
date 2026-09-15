import mongoose from "mongoose";

const designSchema = new mongoose.Schema(
  {
    designId: { type: String, required: true, unique: true }, // e.g. SN-RG-014
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["Rings", "Chains", "Earrings", "Bangles", "Necklaces", "Bridal", "Daily Wear", "Occasion Wear"],
      required: true,
    },
    metalPurityPlaceholder: { type: String, default: "22K Gold (indicative)" },
    sampleAvailable: { type: Boolean, default: true },
    imageUrl: { type: String, required: true },
    description: { type: String, trim: true },
    isSampleDesign: { type: Boolean, default: true }, // always true — artificial sample, never actual gold
  },
  { timestamps: true }
);

export default mongoose.model("DesignSample", designSchema);
