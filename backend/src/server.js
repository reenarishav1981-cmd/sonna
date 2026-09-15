import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

// Safety net: log and keep running instead of letting a stray rejection
// (e.g. a DB call outside asyncHandler) take the whole server down.
process.on("unhandledRejection", (err) => {
  console.error("[unhandledRejection]", err);
});
process.on("uncaughtException", (err) => {
  console.error("[uncaughtException]", err);
});

connectDB().then(() => {
  app.listen(PORT, () => console.log(`[server] SONA backend running on :${PORT}`));
});
