import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
const categories = [
    "All", "Rings", "Chains", "Earrings", "Bangles", "Necklaces", "Bridal", "Daily Wear", "Occasion Wear",
];
export default function DesignExplorer({ onRequestDesign }) {
    const [category, setCategory] = useState("All");
    const [designs, setDesigns] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        api
            .getDesigns(category)
            .then(setDesigns)
            .catch(() => setDesigns([]))
            .finally(() => setLoading(false));
    }, [category]);
    return (_jsx("section", { id: "designs", className: "bg-obsidian py-24 px-6", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-antiquegold mb-3", children: "Design discovery" }), _jsx("h2", { className: "font-serif text-4xl md:text-5xl text-ivory mb-10", children: "Sample designs, catalogued." }), _jsx("div", { className: "flex flex-wrap gap-2 mb-10", children: categories.map((c) => (_jsx("button", { onClick: () => setCategory(c), className: `text-xs px-3 py-1.5 rounded-full border transition-colors ${c === category
                            ? "bg-antiquegold text-obsidian border-antiquegold"
                            : "border-champagne/25 text-parchment/70 hover:border-antiquegold"}`, children: c }, c))) }), loading && _jsx("p", { className: "text-parchment/50 text-sm", children: "Loading designs\u2026" }), !loading && designs.length === 0 && (_jsx("p", { className: "text-parchment/50 text-sm", children: "No sample designs in this category yet." })), _jsx("div", { className: "grid sm:grid-cols-2 md:grid-cols-3 gap-8", children: designs.map((d) => (_jsxs("div", { className: "group border border-champagne/10 rounded-lg overflow-hidden", children: [_jsxs("div", { className: "aspect-[4/5] overflow-hidden relative", children: [_jsx("img", { src: `${d.imageUrl}?w=700&q=80`, alt: d.title, className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" }), _jsx("span", { className: "absolute top-3 left-3 text-[10px] uppercase tracking-wide bg-obsidian/70 text-champagne px-2 py-1 rounded", children: "Sample Design" })] }), _jsxs("div", { className: "p-4", children: [_jsx("p", { className: "font-serif text-lg text-ivory mb-1", children: d.title }), _jsxs("p", { className: "text-xs text-parchment/50 mb-1", children: [d.designId, " \u00B7 ", d.metalPurityPlaceholder] }), _jsx("p", { className: "text-xs text-parchment/40 mb-4", children: d.sampleAvailable ? "Sample available" : "Sample currently unavailable" }), _jsx("button", { onClick: () => onRequestDesign?.(d), className: "text-xs uppercase tracking-wide text-antiquegold border-b border-antiquegold/40 hover:border-antiquegold", children: "Request this design" })] })] }, d._id))) })] }) }));
}
