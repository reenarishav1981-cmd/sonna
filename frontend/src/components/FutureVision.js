import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const cols = [
    { label: "Today", items: ["Representative", "Physical Samples", "Home Visits"] },
    { label: "Tomorrow", items: ["Website", "Appointments", "Digital Catalogue", "Price Comparison", "Order Tracking", "Partner Network"] },
    { label: "Future", items: ["Multi-city Network", "Trained Representatives", "Partner Jewellers", "Technology Platform"] },
];
export default function FutureVision() {
    return (_jsx("section", { className: "bg-ivory text-obsidian py-24 px-6", children: _jsxs("div", { className: "max-w-5xl mx-auto", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-antiquegold mb-3", children: "The future platform" }), _jsx("h2", { className: "font-serif text-4xl md:text-5xl mb-14", children: "Premium service shouldn't depend on where you live." }), _jsx("div", { className: "grid md:grid-cols-3 gap-10", children: cols.map((c) => (_jsxs("div", { children: [_jsx("p", { className: "text-xs uppercase tracking-wide text-antiquegold mb-4", children: c.label }), _jsx("ul", { className: "space-y-2", children: c.items.map((i) => (_jsx("li", { className: "text-sm border-b border-obsidian/10 pb-2", children: i }, i))) })] }, c.label))) })] }) }));
}
