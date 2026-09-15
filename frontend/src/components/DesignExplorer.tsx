import { useEffect, useState } from "react";
import { api, Design } from "../lib/api";

const categories = [
  "All", "Rings", "Chains", "Earrings", "Bangles", "Necklaces", "Bridal", "Daily Wear", "Occasion Wear",
];

export default function DesignExplorer({ onRequestDesign }: { onRequestDesign?: (d: Design) => void }) {
  const [category, setCategory] = useState("All");
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .getDesigns(category)
      .then(setDesigns)
      .catch(() => setDesigns([]))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <section id="designs" className="bg-obsidian py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-antiquegold mb-3">Design discovery</p>
        <h2 className="font-serif text-4xl md:text-5xl text-ivory mb-10">Sample designs, catalogued.</h2>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                c === category
                  ? "bg-antiquegold text-obsidian border-antiquegold"
                  : "border-champagne/25 text-parchment/70 hover:border-antiquegold"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading && <p className="text-parchment/50 text-sm">Loading designs…</p>}
        {!loading && designs.length === 0 && (
          <p className="text-parchment/50 text-sm">No sample designs in this category yet.</p>
        )}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {designs.map((d) => (
            <div key={d._id} className="group border border-champagne/10 rounded-lg overflow-hidden">
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src={`${d.imageUrl}?w=700&q=80`}
                  alt={d.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wide bg-obsidian/70 text-champagne px-2 py-1 rounded">
                  Sample Design
                </span>
              </div>
              <div className="p-4">
                <p className="font-serif text-lg text-ivory mb-1">{d.title}</p>
                <p className="text-xs text-parchment/50 mb-1">{d.designId} · {d.metalPurityPlaceholder}</p>
                <p className="text-xs text-parchment/40 mb-4">
                  {d.sampleAvailable ? "Sample available" : "Sample currently unavailable"}
                </p>
                <button
                  onClick={() => onRequestDesign?.(d)}
                  className="text-xs uppercase tracking-wide text-antiquegold border-b border-antiquegold/40 hover:border-antiquegold"
                >
                  Request this design
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
