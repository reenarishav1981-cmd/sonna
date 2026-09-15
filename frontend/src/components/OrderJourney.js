import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const steps = [
    { n: "01", title: "Book", desc: "Request a home visit." },
    { n: "02", title: "Explore", desc: "See physical sample designs." },
    { n: "03", title: "Understand", desc: "Receive a transparent price breakdown." },
    { n: "04", title: "Order", desc: "Confirm the selected jewellery through the partner fulfilment process." },
    { n: "05", title: "Receive", desc: "Verified jewellery is delivered to your doorstep." },
];
export default function OrderJourney() {
    return (_jsx("section", { className: "bg-obsidian py-24 px-6", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-antiquegold mb-3", children: "How the order works" }), _jsx("h2", { className: "font-serif text-4xl md:text-5xl text-ivory mb-14", children: "From sample to doorstep." }), _jsxs("div", { className: "grid md:grid-cols-5 gap-8 relative", children: [_jsx("div", { className: "hidden md:block absolute top-4 left-0 right-0 h-px bg-champagne/15" }), steps.map((s) => (_jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-obsidian border border-antiquegold flex items-center justify-center text-xs text-highlightgold mb-4 relative z-10", children: s.n }), _jsx("p", { className: "font-serif text-xl text-ivory mb-1", children: s.title }), _jsx("p", { className: "text-sm text-parchment/60", children: s.desc })] }, s.n)))] })] }) }));
}
