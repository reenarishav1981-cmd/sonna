import { Router } from "express";
import DesignSample from "../models/DesignSample.js";
import { asyncHandler } from "../lib/asyncHandler.js";

const router = Router();

// GET /api/designs?category=Rings
router.get("/", asyncHandler(async (req, res) => {
  const { category } = req.query;
  const filter = category && category !== "All" ? { category } : {};
  const designs = await DesignSample.find(filter).sort({ createdAt: -1 });
  res.json(designs);
}));

// GET /api/designs/:designId
router.get("/:designId", asyncHandler(async (req, res) => {
  const design = await DesignSample.findOne({ designId: req.params.designId });
  if (!design) return res.status(404).json({ error: "Design not found" });
  res.json(design);
}));

export default router;
