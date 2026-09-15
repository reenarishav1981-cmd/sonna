import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const items = [
    { label: "Physical Design Experience", detail: "See and hold sample designs at your own home, in person." },
    { label: "Transparent Pricing", detail: "Every charge shown clearly before you decide anything." },
    { label: "Partner Jeweller Fulfilment", detail: "Actual gold jewellery is sourced through trusted partners." },
    { label: "Verification", detail: "Purity, HUID and invoice information accompany your order." },
    { label: "Home Delivery", detail: "Final jewellery delivered securely with an inspection process." },
];
export default function TrustStrip() {
    const [active, setActive] = useState(null);
    return (_jsx("section", { className: "bg-ivory text-obsidian py-10 px-6", children: _jsx("div", { className: "max-w-7xl mx-auto flex flex-wrap justify-center gap-x-10 gap-y-6", children: items.map((item, i) => (_jsxs("div", { className: "relative text-center cursor-default", onMouseEnter: () => setActive(i), onMouseLeave: () => setActive(null), children: [_jsx("p", { className: "text-xs md:text-sm uppercase tracking-wide font-medium", children: item.label }), active === i && (_jsx("div", { className: "absolute top-full mt-3 left-1/2 -translate-x-1/2 w-56 bg-obsidian text-parchment text-xs rounded px-3 py-2 shadow-lg z-10", children: item.detail }))] }, item.label))) }) }));
}
