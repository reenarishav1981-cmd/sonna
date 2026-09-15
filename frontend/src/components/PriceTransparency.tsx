import { useEffect, useState } from "react";
import { api, PriceExample } from "../lib/api";

const rupee = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function PriceTransparency() {
  const [examples, setExamples] = useState<PriceExample[]>([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAdvertised, setShowAdvertised] = useState(true);

  useEffect(() => {
    api
      .getPriceExamples()
      .then((data) => setExamples(data))
      .catch(() => setError("Couldn't load pricing examples right now."))
      .finally(() => setLoading(false));
  }, []);

  const current = examples[active];

  return (
    <section id="price" className="bg-ivory text-obsidian py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-antiquegold mb-3">Price transparency</p>
        <h2 className="font-serif text-4xl md:text-5xl mb-4">Know what you're paying for.</h2>
        <p className="text-obsidian/70 mb-10">Making charge alone doesn't tell the full story.</p>

        {loading && <p className="text-sm text-obsidian/50">Loading example pricing…</p>}
        {error && <p className="text-sm text-red-700">{error}</p>}

        {current && (
          <div className="border border-obsidian/10 rounded-lg overflow-hidden bg-white/40">
            <div className="flex gap-2 p-4 border-b border-obsidian/10 flex-wrap">
              {examples.map((ex, i) => (
                <button
                  key={ex._id}
                  onClick={() => setActive(i)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    i === active
                      ? "bg-antiquegold text-obsidian border-antiquegold"
                      : "border-obsidian/20 text-obsidian/70 hover:border-antiquegold"
                  }`}
                >
                  {ex.label}
                </button>
              ))}
            </div>

            <div className="p-6 space-y-3">
              {[
                ["Gold Value", current.goldValue],
                ["Making Charge", current.makingCharge],
                ["Wastage", current.wastage],
                ["Applicable Taxes / Charges", current.taxesAndCharges],
              ].map(([label, value]) => (
                <div key={label as string} className="flex justify-between text-sm md:text-base">
                  <span className="text-obsidian/70">{label}</span>
                  <span className="font-medium">{rupee(value as number)}</span>
                </div>
              ))}
              <div className="flex justify-between pt-3 border-t border-obsidian/10 font-serif text-xl">
                <span>Estimated Total</span>
                <span>{rupee(current.estimatedTotal)}</span>
              </div>
            </div>

            <div className="px-6 pb-6">
              <button
                onClick={() => setShowAdvertised((v) => !v)}
                className="text-xs uppercase tracking-wide text-antiquegold underline mb-3"
              >
                {showAdvertised ? "Hide" : "Show"} advertised price comparison
              </button>
              {showAdvertised && (
                <div className="flex gap-6 text-sm">
                  <div>
                    <p className="text-obsidian/50 text-xs uppercase mb-1">Advertisement price</p>
                    <p className="font-medium">{rupee(current.advertisedPrice)}</p>
                  </div>
                  <div>
                    <p className="text-obsidian/50 text-xs uppercase mb-1">Actual payable price</p>
                    <p className="font-medium">{rupee(current.estimatedTotal)}</p>
                  </div>
                </div>
              )}
            </div>

            <p className="text-[11px] text-obsidian/40 px-6 pb-4">
              Example pricing — for demonstration only.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
