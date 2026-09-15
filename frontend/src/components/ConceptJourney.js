import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const traditional = ["Customer", "Jeweller Shop", "Designs", "Negotiation", "Purchase"];
const sona = [
    "Customer Home",
    "Physical Sample Experience",
    "Design Selection",
    "Transparent Quote",
    "Trusted Partner Jeweller",
    "Verification",
    "Secure Home Delivery",
];
function Flow({ steps, dim }) {
    return (_jsx("div", { className: "flex flex-col gap-3", children: steps.map((s, i) => (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: `text-xs font-mono ${dim ? "text-champagne/30" : "text-highlightgold"}`, children: String(i + 1).padStart(2, "0") }), _jsx("span", { className: `text-sm md:text-base ${dim ? "text-parchment/40 line-through" : "text-ivory"}`, children: s })] }, s))) }));
}
export default function ConceptJourney() {
    return (_jsx("section", { id: "how-it-works", className: "bg-obsidian py-24 px-6", children: _jsxs("div", { className: "max-w-5xl mx-auto", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-antiquegold mb-3", children: "The concept" }), _jsx("h2", { className: "font-serif text-4xl md:text-5xl text-ivory mb-14", children: "Not another jewellery store." }), _jsxs("div", { className: "grid md:grid-cols-2 gap-14", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs uppercase tracking-wide text-parchment/50 mb-5", children: "Traditional model" }), _jsx(Flow, { steps: traditional, dim: true })] }), _jsxs("div", { className: "border-l border-antiquegold/20 pl-10", children: [_jsx("p", { className: "text-xs uppercase tracking-wide text-highlightgold mb-5", children: "The SONA way" }), _jsx(Flow, { steps: sona })] })] })] }) }));
}
