import mongoose from "mongoose";

// Demonstration-only price breakdowns. Never real quotes — clearly labeled to the frontend.
const priceExampleSchema = new mongoose.Schema(
  {
    label: { type: String, required: true }, // e.g. "22K Gold Ring — Example"
    goldValue: { type: Number, required: true },
    makingCharge: { type: Number, required: true },
    wastage: { type: Number, required: true },
    taxesAndCharges: { type: Number, required: true },
    advertisedPrice: { type: Number, required: true }, // what a typical ad might show
    isDemonstrationOnly: { type: Boolean, default: true },
  },
  { timestamps: true }
);

priceExampleSchema.virtual("estimatedTotal").get(function () {
  return this.goldValue + this.makingCharge + this.wastage + this.taxesAndCharges;
});
priceExampleSchema.set("toJSON", { virtuals: true });

export default mongoose.model("PriceExample", priceExampleSchema);
