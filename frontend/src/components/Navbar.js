import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
const links = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Designs", href: "#designs" },
    { label: "Price Transparency", href: "#price" },
    { label: "Trust", href: "#trust" },
];
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (_jsx("header", { className: `fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-obsidian/90 backdrop-blur border-b border-champagne/10 py-3" : "py-6"}`, children: _jsxs("div", { className: "max-w-7xl mx-auto px-6 flex items-center justify-between", children: [_jsxs("a", { href: "#", className: "flex items-center gap-2 font-serif text-2xl tracking-wide text-ivory", children: [_jsxs("svg", { width: "22", height: "22", viewBox: "0 0 22 22", fill: "none", children: [_jsx("circle", { cx: "8", cy: "8", r: "6.5", stroke: "#C9A45C", strokeWidth: "1.4" }), _jsx("circle", { cx: "14", cy: "14", r: "6.5", stroke: "#C9A45C", strokeWidth: "1.4" })] }), "SONA"] }), _jsx("nav", { className: "hidden md:flex items-center gap-8 text-sm text-parchment/90", children: links.map((l) => (_jsx("a", { href: l.href, className: "hover:text-highlightgold transition-colors", children: l.label }, l.label))) }), _jsx("a", { href: "#book-a-visit", className: "text-xs md:text-sm uppercase tracking-wider border border-antiquegold/60 text-champagne px-4 py-2 rounded hover:bg-antiquegold hover:text-obsidian transition-colors", children: "Book a Home Visit" })] }) }));
}
