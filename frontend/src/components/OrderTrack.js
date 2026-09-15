import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { api } from "../lib/api";
const STAGES = ["SAMPLE", "SELECTED", "PRICE", "VERIFIED", "DELIVERED"];
export default function OrderTrack() {
    const [id, setId] = useState("");
    const [order, setOrder] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const lookup = async () => {
        setLoading(true);
        setError("");
        setOrder(null);
        try {
            const o = await api.trackOrder(id.trim());
            setOrder(o);
        }
        catch (e) {
            setError(e.message || "Order not found.");
        }
        finally {
            setLoading(false);
        }
    };
    const currentIndex = order ? STAGES.indexOf(order.stage) : -1;
    return (_jsx("div", { className: "min-h-screen bg-obsidian px-6 py-16", children: _jsxs("div", { className: "max-w-lg mx-auto", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-antiquegold mb-3", children: "Track your order" }), _jsx("h1", { className: "font-serif text-4xl text-ivory mb-8", children: "From sample to doorstep." }), _jsxs("div", { className: "flex gap-3 mb-8", children: [_jsx("input", { value: id, onChange: (e) => setId(e.target.value), placeholder: "Enter your order ID", className: "flex-1 border border-champagne/20 bg-espresso text-ivory rounded px-3 py-2 text-sm" }), _jsx("button", { onClick: lookup, disabled: loading || !id.trim(), className: "bg-antiquegold text-obsidian px-5 py-2 text-sm uppercase tracking-wide rounded disabled:opacity-50", children: loading ? "Checking…" : "Track" })] }), error && _jsx("p", { className: "text-red-400 text-sm mb-6", children: error }), order && (_jsxs("div", { className: "border border-champagne/15 rounded-lg p-6", children: [order.design && (_jsxs("p", { className: "text-parchment/70 text-sm mb-6", children: [order.design.title, " \u00B7 ", order.design.designId] })), _jsx("div", { className: "space-y-4", children: STAGES.map((s, i) => (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: `w-3 h-3 rounded-full border ${i <= currentIndex ? "bg-highlightgold border-highlightgold" : "border-champagne/30"}` }), _jsx("span", { className: i <= currentIndex ? "text-ivory" : "text-parchment/40", children: s })] }, s))) })] }))] }) }));
}
