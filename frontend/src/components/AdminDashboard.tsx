import { useEffect, useState } from "react";
import { api, Lead, AdminOrder } from "../lib/api";

const statuses = ["new", "confirmed", "visited", "converted", "closed"];

export default function AdminDashboard() {
  const [adminKey, setAdminKey] = useState(localStorage_getKey());
  const [keyInput, setKeyInput] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [tab, setTab] = useState<"leads" | "orders">("leads");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function localStorage_getKey() {
    try {
      return sessionStorage.getItem("sona_admin_key") || "";
    } catch {
      return "";
    }
  }

  const load = async (key: string) => {
    setLoading(true);
    setError("");
    try {
      const [l, o] = await Promise.all([api.adminListLeads(key), api.adminListOrders(key)]);
      setLeads(l);
      setOrders(o);
      setAdminKey(key);
      sessionStorage.setItem("sona_admin_key", key);
    } catch (e: any) {
      setError(e.message || "Could not authenticate. Check the admin key.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminKey) load(adminKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const updated = await api.adminUpdateLeadStatus(adminKey, id, status);
    setLeads((ls) => ls.map((l) => (l._id === id ? updated : l)));
  };

  const createOrderFromLead = async (leadId: string) => {
    const order = await api.adminCreateOrder(adminKey, leadId);
    setOrders((os) => [order, ...os]);
  };

  const advanceOrder = async (id: string) => {
    const updated = await api.adminAdvanceOrder(adminKey, id);
    setOrders((os) => os.map((o) => (o._id === id ? updated : o)));
  };

  if (!adminKey) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center px-6">
        <div className="max-w-sm w-full">
          <h1 className="font-serif text-3xl text-ivory mb-6">SONA Admin</h1>
          <input
            type="password"
            placeholder="Admin key"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            className="w-full border border-champagne/20 bg-espresso text-ivory rounded px-3 py-2 text-sm mb-3"
          />
          <button
            onClick={() => load(keyInput)}
            disabled={loading || !keyInput}
            className="w-full bg-antiquegold text-obsidian py-2.5 rounded text-sm uppercase tracking-wide disabled:opacity-50"
          >
            {loading ? "Checking…" : "Enter"}
          </button>
          {error && <p className="text-red-400 text-xs mt-3">{error}</p>}
          <p className="text-parchment/40 text-xs mt-4">
            This is the ADMIN_KEY set in backend/.env — not a real login system, swap for
            proper auth before deploying.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl text-ivory">SONA Admin</h1>
          <button
            onClick={() => {
              sessionStorage.removeItem("sona_admin_key");
              setAdminKey("");
            }}
            className="text-xs text-parchment/50 underline"
          >
            Log out
          </button>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setTab("leads")}
            className={`text-sm px-4 py-2 rounded ${tab === "leads" ? "bg-antiquegold text-obsidian" : "text-parchment/60 border border-champagne/20"}`}
          >
            Leads ({leads.length})
          </button>
          <button
            onClick={() => setTab("orders")}
            className={`text-sm px-4 py-2 rounded ${tab === "orders" ? "bg-antiquegold text-obsidian" : "text-parchment/60 border border-champagne/20"}`}
          >
            Orders ({orders.length})
          </button>
        </div>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        {tab === "leads" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-parchment/80">
              <thead className="text-xs uppercase text-parchment/40 border-b border-champagne/10">
                <tr>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Mobile</th>
                  <th className="py-2 pr-4">Area</th>
                  <th className="py-2 pr-4">Type</th>
                  <th className="py-2 pr-4">Preferred</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Convert</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l._id} className="border-b border-champagne/5">
                    <td className="py-2 pr-4">{l.name}</td>
                    <td className="py-2 pr-4">{l.mobile}</td>
                    <td className="py-2 pr-4">{l.area}</td>
                    <td className="py-2 pr-4">{l.jewelleryType}</td>
                    <td className="py-2 pr-4">{l.preferredDate?.slice(0, 10)} · {l.preferredTime}</td>
                    <td className="py-2 pr-4">
                      <select
                        value={l.status}
                        onChange={(e) => updateStatus(l._id, e.target.value)}
                        className="bg-espresso border border-champagne/20 rounded px-2 py-1 text-xs"
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2 pr-4">
                      <button
                        onClick={() => createOrderFromLead(l._id)}
                        className="text-xs text-antiquegold underline"
                      >
                        Create order
                      </button>
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr><td colSpan={7} className="py-6 text-center text-parchment/40">No leads yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {tab === "orders" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-parchment/80">
              <thead className="text-xs uppercase text-parchment/40 border-b border-champagne/10">
                <tr>
                  <th className="py-2 pr-4">Order ID</th>
                  <th className="py-2 pr-4">Customer</th>
                  <th className="py-2 pr-4">Stage</th>
                  <th className="py-2 pr-4">Advance</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id} className="border-b border-champagne/5">
                    <td className="py-2 pr-4 font-mono text-xs">{o._id}</td>
                    <td className="py-2 pr-4">{o.lead?.name} · {o.lead?.mobile}</td>
                    <td className="py-2 pr-4 text-highlightgold">{o.stage}</td>
                    <td className="py-2 pr-4">
                      {o.stage !== "DELIVERED" && (
                        <button onClick={() => advanceOrder(o._id)} className="text-xs text-antiquegold underline">
                          Advance stage
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr><td colSpan={4} className="py-6 text-center text-parchment/40">No orders yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
