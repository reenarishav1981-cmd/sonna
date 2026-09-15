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
import { Design } from "./lib/api";

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
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);

  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <TrustStrip />
      <ConceptJourney />
      <PhysicalExperience />
      <TrustSection />
      <PriceTransparency />
      <DesignExplorer
        onRequestDesign={(d) => {
          setSelectedDesign(d);
          document.getElementById("book-a-visit")?.scrollIntoView({ behavior: "smooth" });
        }}
      />
      <OrderJourney />
      <HomeVisitForm prefillDesign={selectedDesign} />
      <FutureVision />
      <Footer />
    </div>
  );
}

export default function App() {
  const hash = useHashRoute();

  if (hash.startsWith("#/admin")) return <AdminDashboard />;
  if (hash.startsWith("#/track")) return <OrderTrack />;
  return <MainSite />;
}
