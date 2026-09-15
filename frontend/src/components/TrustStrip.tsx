import { useState } from "react";

const items = [
  { label: "Physical Design Experience", detail: "See and hold sample designs at your own home, in person." },
  { label: "Transparent Pricing", detail: "Every charge shown clearly before you decide anything." },
  { label: "Partner Jeweller Fulfilment", detail: "Actual gold jewellery is sourced through trusted partners." },
  { label: "Verification", detail: "Purity, HUID and invoice information accompany your order." },
  { label: "Home Delivery", detail: "Final jewellery delivered securely with an inspection process." },
];

export default function TrustStrip() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="bg-ivory text-obsidian py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-10 gap-y-6">
        {items.map((item, i) => (
          <div
            key={item.label}
            className="relative text-center cursor-default"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <p className="text-xs md:text-sm uppercase tracking-wide font-medium">{item.label}</p>
            {active === i && (
              <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-56 bg-obsidian text-parchment text-xs rounded px-3 py-2 shadow-lg z-10">
                {item.detail}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
