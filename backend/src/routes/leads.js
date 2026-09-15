import { Router } from "express";
import { z } from "zod";
import Lead from "../models/Lead.js";
import { requireAdmin } from "../middleware/adminAuth.js";
import { notify } from "../lib/notify.js";
import { asyncHandler } from "../lib/asyncHandler.js";

const router = Router();

const leadSchema = z.object({
  name: z.string().min(2),
  mobile: z.string().min(8).max(15),
  area: z.string().min(2),
  jewelleryType: z.enum([
    "Rings", "Chains", "Earrings", "Bangles", "Necklaces",
    "Bridal", "Daily Wear", "Occasion Wear", "Not sure yet",
  ]),
  approxBudget: z.string().optional(),
  preferredDate: z.string(),
  preferredTime: z.string(),
  interestedDesignIds: z.array(z.string()).optional(),
});

// POST /api/leads — Book a Home Visit form submits here
router.post("/", asyncHandler(async (req, res) => {
  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
  }
  const lead = await Lead.create(parsed.data);
  notify("lead.created", { leadId: lead._id, mobile: lead.mobile, name: lead.name }).catch(() => {});
  res.status(201).json(lead);
}));

// GET /api/leads — admin listing, requires x-admin-key header
router.get("/", requireAdmin, asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const leads = await Lead.find(filter).sort({ createdAt: -1 }).limit(200);
  res.json(leads);
}));

// PATCH /api/leads/:id/status — requires x-admin-key header
router.patch("/:id/status", requireAdmin, asyncHandler(async (req, res) => {
  const { status } = req.body;
  const allowed = ["new", "confirmed", "visited", "converted", "closed"];
  if (!allowed.includes(status)) return res.status(400).json({ error: "Invalid status" });
  const lead = await Lead.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!lead) return res.status(404).json({ error: "Lead not found" });
  res.json(lead);
}));

export default router;
