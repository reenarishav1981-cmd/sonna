import "dotenv/config";
import { connectDB } from "./config/db.js";
import DesignSample from "./models/DesignSample.js";
import PriceExample from "./models/PriceExample.js";
import mongoose from "mongoose";

const designs = [
  { designId: "SN-RG-014", title: "Kundan Trellis Ring", category: "Rings", imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e", description: "Sample design — 22K reference finish." },
  { designId: "SN-CH-022", title: "Fine Rope Chain", category: "Chains", imageUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a", description: "Sample design — daily wear weight class." },
  { designId: "SN-ER-009", title: "Petal Drop Earrings", category: "Earrings", imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908", description: "Sample design — occasion wear." },
  { designId: "SN-BG-031", title: "Antique Bangle Pair", category: "Bangles", imageUrl: "https://images.unsplash.com/photo-1611652022419-a9419f74343d", description: "Sample design — traditional motif." },
  { designId: "SN-NK-005", title: "Layered Temple Necklace", category: "Necklaces", imageUrl: "https://images.unsplash.com/photo-1599459183200-59c7687a0275", description: "Sample design — bridal weight class." },
  { designId: "SN-BR-002", title: "Heritage Bridal Set", category: "Bridal", imageUrl: "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5", description: "Sample design — full bridal reference set." },
];

const priceExamples = [
  {
    label: "22K Gold Ring — Example",
    goldValue: 80000,
    makingCharge: 3500,
    wastage: 1600,
    taxesAndCharges: 2450,
    advertisedPrice: 82000,
  },
  {
    label: "22K Gold Chain — Example",
    goldValue: 145000,
    makingCharge: 5200,
    wastage: 2900,
    taxesAndCharges: 4380,
    advertisedPrice: 148000,
  },
];

async function run() {
  await connectDB();
  await DesignSample.deleteMany({});
  await PriceExample.deleteMany({});
  await DesignSample.insertMany(designs);
  await PriceExample.insertMany(priceExamples);
  console.log("[seed] done:", designs.length, "designs,", priceExamples.length, "price examples");
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
