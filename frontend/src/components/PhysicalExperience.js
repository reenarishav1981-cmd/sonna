import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const steps = [
    "Representative arrives",
    "Sample case opens",
    "Designs are explored",
    "Customer selects",
    "Actual jewellery is prepared later",
];
export default function PhysicalExperience() {
    return (_jsx("section", { className: "bg-ivory text-obsidian py-24 px-6", children: _jsxs("div", { className: "max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-antiquegold mb-3", children: "The physical experience" }), _jsx("h2", { className: "font-serif text-4xl md:text-5xl mb-4 leading-tight", children: "Jewellery shouldn't have to begin with a screen." }), _jsx("p", { className: "text-obsidian/70 mb-10 max-w-md", children: "Our experience begins in the real world." }), _jsx("div", { className: "space-y-5", children: steps.map((s, i) => (_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("span", { className: "w-7 h-7 rounded-full border border-antiquegold flex items-center justify-center text-xs text-antiquegold shrink-0", children: i + 1 }), _jsx("p", { className: "text-sm md:text-base", children: s })] }, s))) })] }), _jsx("div", { className: "aspect-[4/5] rounded-lg overflow-hidden border border-obsidian/10", children: _jsx("img", { src: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900&q=80", alt: "Hands exploring a jewellery sample design", className: "w-full h-full object-cover" }) })] }) }));
}
