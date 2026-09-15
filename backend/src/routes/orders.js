import { Router } from "express";
import Order, { ORDER_STAGES } from "../models/Order.js";
import Lead from "../models/Lead.js";
import { requireAdmin } from "../middleware/adminAuth.js";
import { asyncHandler } from "../lib/asyncHandler.js";

const router = Router();

// POST /api/orders — create from a lead (admin/internal action, requires x-admin-key)
router.post("/", requireAdmin, asyncHandler(async (req, res) => {
  const { leadId, designId } = req.body;
  const lead = await Lead.findById(leadId);
  if (!lead) return res.status(404).json({ error: "Lead not found" });
  const order = await Order.create({
    lead: leadId,
    design: designId || undefined,
    stage: "SAMPLE",
    stageHistory: [{ stage: "SAMPLE" }],
  });
  res.status(201).json(order);
}));

// GET /api/orders/:id — public order tracking. Only safe fields returned
// (no lead contact details), so a customer can check status with just the
// order id you give them.
router.get("/:id", asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("design", "title designId category imageUrl");
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json({
    _id: order._id,
    stage: order.stage,
    stageHistory: order.stageHistory,
    design: order.design,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  });
}));

// PATCH /api/orders/:id/advance — admin action, requires x-admin-key
router.patch("/:id/advance", requireAdmin, asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  order.advanceStage();
  await order.save();
  res.json(order);
}));

// GET /api/orders — admin listing, requires x-admin-key
router.get("/", requireAdmin, asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("lead", "name mobile area").populate("design", "title designId").sort({ createdAt: -1 }).limit(200);
  res.json(orders);
}));

router.get("/meta/stages", (req, res) => res.json(ORDER_STAGES));

export default router;
