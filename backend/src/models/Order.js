import mongoose from "mongoose";

const STAGES = ["SAMPLE", "SELECTED", "PRICE", "VERIFIED", "DELIVERED"];

const orderSchema = new mongoose.Schema(
  {
    lead: { type: mongoose.Schema.Types.ObjectId, ref: "Lead", required: true },
    design: { type: mongoose.Schema.Types.ObjectId, ref: "DesignSample" },
    stage: { type: String, enum: STAGES, default: "SAMPLE" },
    stageHistory: [
      {
        stage: { type: String, enum: STAGES },
        at: { type: Date, default: Date.now },
      },
    ],
    partnerJewellerNote: { type: String, trim: true }, // no fake names — free text placeholder
  },
  { timestamps: true }
);

orderSchema.methods.advanceStage = function () {
  const idx = STAGES.indexOf(this.stage);
  if (idx < STAGES.length - 1) {
    this.stage = STAGES[idx + 1];
    this.stageHistory.push({ stage: this.stage });
  }
  return this;
};

export const ORDER_STAGES = STAGES;
export default mongoose.model("Order", orderSchema);
