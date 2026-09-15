import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

export async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("[db] MONGO_URI is missing");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log("[db] connected to MongoDB Atlas");
  } catch (err) {
    console.error("[db] connection failed:", err.message);
    process.exit(1);
  }
}