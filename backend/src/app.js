import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";

// Fail fast instead of silently queueing ops for 10s when there's no live
// connection — queued ops throw outside the normal promise chain and can
// crash the process even with try/catch in place. Set here (not just in
// db.js) so it's guaranteed to apply no matter how the app is booted.
mongoose.set("bufferCommands", false);

import leadsRouter from "./routes/leads.js";
import designsRouter from "./routes/designs.js";
import pricingRouter from "./routes/pricing.js";
import ordersRouter from "./routes/orders.js";

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  })
);

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 });
app.use("/api", limiter);

app.get("/api/health", (req, res) => res.json({ ok: true, service: "sona-backend" }));

app.use("/api/leads", leadsRouter);
app.use("/api/designs", designsRouter);
app.use("/api/pricing", pricingRouter);
app.use("/api/orders", ordersRouter);

// 404
app.use("/api", (req, res) => res.status(404).json({ error: "Not found" }));

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

export default app;
