import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const cards = [
    { n: "01", title: "Clear price breakdown" },
    { n: "02", title: "Proposed partner jeweller" },
    { n: "03", title: "Purity / HUID information" },
    { n: "04", title: "Proper invoice" },
    { n: "05", title: "Secure fulfilment" },
    { n: "06", title: "Customer inspection" },
];
export default function TrustSection() {
    return (_jsx("section", { id: "trust", className: "bg-obsidian py-24 px-6", children: _jsxs("div", { className: "max-w-5xl mx-auto", children: [_jsxs("h2", { className: "font-serif text-4xl md:text-5xl text-ivory mb-4 leading-tight", children: ["When the purchase is precious,", _jsx("br", {}), "trust cannot be optional."] }), _jsx("p", { className: "text-parchment/60 mb-14 max-w-xl", children: "These are the trust mechanisms we're building the concept around \u2014 proposed, not yet operating at scale." }), _jsx("div", { className: "grid sm:grid-cols-2 md:grid-cols-3 gap-6", children: cards.map((c) => (_jsxs("div", { className: "group border border-champagne/10 rounded-lg p-6 relative overflow-hidden hover:border-antiquegold/50 transition-colors", children: [_jsx("span", { className: "absolute top-0 left-0 h-0.5 w-0 bg-highlightgold group-hover:w-full transition-all duration-500" }), _jsx("p", { className: "text-highlightgold text-sm font-mono mb-4", children: c.n }), _jsx("p", { className: "text-ivory text-sm md:text-base", children: c.title })] }, c.n))) })] }) }));
}
