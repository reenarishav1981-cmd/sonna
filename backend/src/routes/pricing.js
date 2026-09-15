import { Router } from "express";
import PriceExample from "../models/PriceExample.js";
import { asyncHandler } from "../lib/asyncHandler.js";

const router = Router();

// GET /api/pricing/examples — always clearly demonstration-only
router.get("/examples", asyncHandler(async (req, res) => {
  const examples = await PriceExample.find().sort({ createdAt: 1 });
  res.json(examples);
}));

export default router;
