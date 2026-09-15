import { useState } from "react";
import { api, OrderTracking } from "../lib/api";

const STAGES = ["SAMPLE", "SELECTED", "PRICE", "VERIFIED", "DELIVERED"];

export default function OrderTrack() {
  const [id, setId] = useState("");
  const [order, setOrder] = useState<OrderTracking | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const lookup = async () => {
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const o = await api.trackOrder(id.trim());
      setOrder(o);
    } catch (e: any) {
      setError(e.message || "Order not found.");
    } finally {
      setLoading(false);
    }
  };

  const currentIndex = order ? STAGES.indexOf(order.stage) : -1;

  return (
    <div className="min-h-screen bg-obsidian px-6 py-16">
      <div className="max-w-lg mx-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-antiquegold mb-3">Track your order</p>
        <h1 className="font-serif text-4xl text-ivory mb-8">From sample to doorstep.</h1>

        <div className="flex gap-3 mb-8">
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter your order ID"
            className="flex-1 border border-champagne/20 bg-espresso text-ivory rounded px-3 py-2 text-sm"
          />
          <button
            onClick={lookup}
            disabled={loading || !id.trim()}
            className="bg-antiquegold text-obsidian px-5 py-2 text-sm uppercase tracking-wide rounded disabled:opacity-50"
          >
            {loading ? "Checking…" : "Track"}
          </button>
        </div>

        {error && <p className="text-red-400 text-sm mb-6">{error}</p>}

        {order && (
          <div className="border border-champagne/15 rounded-lg p-6">
            {order.design && (
              <p className="text-parchment/70 text-sm mb-6">{order.design.title} · {order.design.designId}</p>
            )}
            <div className="space-y-4">
              {STAGES.map((s, i) => (
                <div key={s} className="flex items-center gap-3">
                  <span
                    className={`w-3 h-3 rounded-full border ${
                      i <= currentIndex ? "bg-highlightgold border-highlightgold" : "border-champagne/30"
                    }`}
                  />
                  <span className={i <= currentIndex ? "text-ivory" : "text-parchment/40"}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
