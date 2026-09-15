import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import ConceptJourney from "./components/ConceptJourney";
import PhysicalExperience from "./components/PhysicalExperience";
import TrustSection from "./components/TrustSection";
import PriceTransparency from "./components/PriceTransparency";
import DesignExplorer from "./components/DesignExplorer";
import OrderJourney from "./components/OrderJourney";
import HomeVisitForm from "./components/HomeVisitForm";
import FutureVision from "./components/FutureVision";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import OrderTrack from "./components/OrderTrack";
function useHashRoute() {
    const [hash, setHash] = useState(window.location.hash);
    useEffect(() => {
        const onChange = () => setHash(window.location.hash);
        window.addEventListener("hashchange", onChange);
        return () => window.removeEventListener("hashchange", onChange);
    }, []);
    return hash;
}
function MainSite() {
    const [selectedDesign, setSelectedDesign] = useState(null);
    return (_jsxs("div", { className: "font-sans", children: [_jsx(Navbar, {}), _jsx(Hero, {}), _jsx(TrustStrip, {}), _jsx(ConceptJourney, {}), _jsx(PhysicalExperience, {}), _jsx(TrustSection, {}), _jsx(PriceTransparency, {}), _jsx(DesignExplorer, { onRequestDesign: (d) => {
                    setSelectedDesign(d);
                    document.getElementById("book-a-visit")?.scrollIntoView({ behavior: "smooth" });
                } }), _jsx(OrderJourney, {}), _jsx(HomeVisitForm, { prefillDesign: selectedDesign }), _jsx(FutureVision, {}), _jsx(Footer, {})] }));
}
export default function App() {
    const hash = useHashRoute();
    if (hash.startsWith("#/admin"))
        return _jsx(AdminDashboard, {});
    if (hash.startsWith("#/track"))
        return _jsx(OrderTrack, {});
    return _jsx(MainSite, {});
}
