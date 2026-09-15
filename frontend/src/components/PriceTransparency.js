import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
const rupee = (n) => `₹${n.toLocaleString("en-IN")}`;
export default function PriceTransparency() {
    const [examples, setExamples] = useState([]);
    const [active, setActive] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAdvertised, setShowAdvertised] = useState(true);
    useEffect(() => {
        api
            .getPriceExamples()
            .then((data) => setExamples(data))
            .catch(() => setError("Couldn't load pricing examples right now."))
            .finally(() => setLoading(false));
    }, []);
    const current = examples[active];
    return (_jsx("section", { id: "price", className: "bg-ivory text-obsidian py-24 px-6", children: _jsxs("div", { className: "max-w-3xl mx-auto", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-antiquegold mb-3", children: "Price transparency" }), _jsx("h2", { className: "font-serif text-4xl md:text-5xl mb-4", children: "Know what you're paying for." }), _jsx("p", { className: "text-obsidian/70 mb-10", children: "Making charge alone doesn't tell the full story." }), loading && _jsx("p", { className: "text-sm text-obsidian/50", children: "Loading example pricing\u2026" }), error && _jsx("p", { className: "text-sm text-red-700", children: error }), current && (_jsxs("div", { className: "border border-obsidian/10 rounded-lg overflow-hidden bg-white/40", children: [_jsx("div", { className: "flex gap-2 p-4 border-b border-obsidian/10 flex-wrap", children: examples.map((ex, i) => (_jsx("button", { onClick: () => setActive(i), className: `text-xs px-3 py-1.5 rounded-full border transition-colors ${i === active
                                    ? "bg-antiquegold text-obsidian border-antiquegold"
                                    : "border-obsidian/20 text-obsidian/70 hover:border-antiquegold"}`, children: ex.label }, ex._id))) }), _jsxs("div", { className: "p-6 space-y-3", children: [[
                                    ["Gold Value", current.goldValue],
                                    ["Making Charge", current.makingCharge],
                                    ["Wastage", current.wastage],
                                    ["Applicable Taxes / Charges", current.taxesAndCharges],
                                ].map(([label, value]) => (_jsxs("div", { className: "flex justify-between text-sm md:text-base", children: [_jsx("span", { className: "text-obsidian/70", children: label }), _jsx("span", { className: "font-medium", children: rupee(value) })] }, label))), _jsxs("div", { className: "flex justify-between pt-3 border-t border-obsidian/10 font-serif text-xl", children: [_jsx("span", { children: "Estimated Total" }), _jsx("span", { children: rupee(current.estimatedTotal) })] })] }), _jsxs("div", { className: "px-6 pb-6", children: [_jsxs("button", { onClick: () => setShowAdvertised((v) => !v), className: "text-xs uppercase tracking-wide text-antiquegold underline mb-3", children: [showAdvertised ? "Hide" : "Show", " advertised price comparison"] }), showAdvertised && (_jsxs("div", { className: "flex gap-6 text-sm", children: [_jsxs("div", { children: [_jsx("p", { className: "text-obsidian/50 text-xs uppercase mb-1", children: "Advertisement price" }), _jsx("p", { className: "font-medium", children: rupee(current.advertisedPrice) })] }), _jsxs("div", { children: [_jsx("p", { className: "text-obsidian/50 text-xs uppercase mb-1", children: "Actual payable price" }), _jsx("p", { className: "font-medium", children: rupee(current.estimatedTotal) })] })] }))] }), _jsx("p", { className: "text-[11px] text-obsidian/40 px-6 pb-4", children: "Example pricing \u2014 for demonstration only." })] }))] }) }));
}
