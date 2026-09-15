const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
async function request(path, options) {
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
export const api = {
    getDesigns: (category) => request(`/designs${category && category !== "All" ? `?category=${encodeURIComponent(category)}` : ""}`),
    getPriceExamples: () => request("/pricing/examples"),
    createLead: (data) => request("/leads", { method: "POST", body: JSON.stringify(data) }),
    health: () => request("/health"),
    // Admin — requires an x-admin-key header (see backend .env ADMIN_KEY)
    adminListLeads: (adminKey, status) => request(`/leads${status ? `?status=${status}` : ""}`, { headers: { "x-admin-key": adminKey } }),
    adminUpdateLeadStatus: (adminKey, id, status) => request(`/leads/${id}/status`, {
        method: "PATCH",
        headers: { "x-admin-key": adminKey },
        body: JSON.stringify({ status }),
    }),
    adminListOrders: (adminKey) => request("/orders", { headers: { "x-admin-key": adminKey } }),
    adminCreateOrder: (adminKey, leadId, designId) => request("/orders", {
        method: "POST",
        headers: { "x-admin-key": adminKey },
        body: JSON.stringify({ leadId, designId }),
    }),
    adminAdvanceOrder: (adminKey, id) => request(`/orders/${id}/advance`, { method: "PATCH", headers: { "x-admin-key": adminKey } }),
    // Public order tracking — no auth needed, just the order id
    trackOrder: (id) => request(`/orders/${id}`),
};
