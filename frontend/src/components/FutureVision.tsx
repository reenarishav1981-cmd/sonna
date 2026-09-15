const cols = [
  { label: "Today", items: ["Representative", "Physical Samples", "Home Visits"] },
  { label: "Tomorrow", items: ["Website", "Appointments", "Digital Catalogue", "Price Comparison", "Order Tracking", "Partner Network"] },
  { label: "Future", items: ["Multi-city Network", "Trained Representatives", "Partner Jewellers", "Technology Platform"] },
];

export default function FutureVision() {
  return (
    <section className="bg-ivory text-obsidian py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-antiquegold mb-3">The future platform</p>
        <h2 className="font-serif text-4xl md:text-5xl mb-14">Premium service shouldn't depend on where you live.</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {cols.map((c) => (
            <div key={c.label}>
              <p className="text-xs uppercase tracking-wide text-antiquegold mb-4">{c.label}</p>
              <ul className="space-y-2">
                {c.items.map((i) => (
                  <li key={i} className="text-sm border-b border-obsidian/10 pb-2">{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
