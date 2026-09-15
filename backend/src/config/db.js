import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/sona";
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
    console.log("[db] connected:", uri);
  } catch (err) {
    console.error("[db] connection failed:", err.message);
    process.exit(1);
  }
}
