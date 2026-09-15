const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export interface Design {
  _id: string;
  designId: string;
  title: string;
  category: string;
  metalPurityPlaceholder: string;
  sampleAvailable: boolean;
  imageUrl: string;
  description?: string;
}

export interface PriceExample {
  _id: string;
  label: string;
  goldValue: number;
  makingCharge: number;
  wastage: number;
  taxesAndCharges: number;
  advertisedPrice: number;
  estimatedTotal: number;
  isDemonstrationOnly: boolean;
}

export interface LeadInput {
  name: string;
  mobile: string;
  area: string;
  jewelleryType: string;
  approxBudget?: string;
  preferredDate: string;
  preferredTime: string;
}

export interface Lead extends LeadInput {
  _id: string;
  status: "new" | "confirmed" | "visited" | "converted" | "closed";
  createdAt: string;
}

export interface OrderTracking {
  _id: string;
  stage: string;
  stageHistory: { stage: string; at: string }[];
  design?: { title: string; designId: string; category: string; imageUrl: string };
  createdAt: string;
  updatedAt: string;
}

export interface AdminOrder extends OrderTracking {
  lead?: { name: string; mobile: string; area: string };
}

export const api = {
  getDesigns: (category?: string) =>
    request<Design[]>(`/designs${category && category !== "All" ? `?category=${encodeURIComponent(category)}` : ""}`),
  getPriceExamples: () => request<PriceExample[]>("/pricing/examples"),
  createLead: (data: LeadInput) =>
    request<{ _id: string }>("/leads", { method: "POST", body: JSON.stringify(data) }),
  health: () => request<{ ok: boolean }>("/health"),

  // Admin — requires an x-admin-key header (see backend .env ADMIN_KEY)
  adminListLeads: (adminKey: string, status?: string) =>
    request<Lead[]>(`/leads${status ? `?status=${status}` : ""}`, { headers: { "x-admin-key": adminKey } }),
  adminUpdateLeadStatus: (adminKey: string, id: string, status: string) =>
    request<Lead>(`/leads/${id}/status`, {
      method: "PATCH",
      headers: { "x-admin-key": adminKey },
      body: JSON.stringify({ status }),
    }),
  adminListOrders: (adminKey: string) =>
    request<AdminOrder[]>("/orders", { headers: { "x-admin-key": adminKey } }),
  adminCreateOrder: (adminKey: string, leadId: string, designId?: string) =>
    request<AdminOrder>("/orders", {
      method: "POST",
      headers: { "x-admin-key": adminKey },
      body: JSON.stringify({ leadId, designId }),
    }),
  adminAdvanceOrder: (adminKey: string, id: string) =>
    request<AdminOrder>(`/orders/${id}/advance`, { method: "PATCH", headers: { "x-admin-key": adminKey } }),

  // Public order tracking — no auth needed, just the order id
  trackOrder: (id: string) => request<OrderTracking>(`/orders/${id}`),
};

