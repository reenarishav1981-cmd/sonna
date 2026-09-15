const steps = [
  "Representative arrives",
  "Sample case opens",
  "Designs are explored",
  "Customer selects",
  "Actual jewellery is prepared later",
];

export default function PhysicalExperience() {
  return (
    <section className="bg-ivory text-obsidian py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-antiquegold mb-3">The physical experience</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-4 leading-tight">
            Jewellery shouldn't have to begin with a screen.
          </h2>
          <p className="text-obsidian/70 mb-10 max-w-md">Our experience begins in the real world.</p>
          <div className="space-y-5">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-4">
                <span className="w-7 h-7 rounded-full border border-antiquegold flex items-center justify-center text-xs text-antiquegold shrink-0">
                  {i + 1}
                </span>
                <p className="text-sm md:text-base">{s}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="aspect-[4/5] rounded-lg overflow-hidden border border-obsidian/10">
          <img
            src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900&q=80"
            alt="Hands exploring a jewellery sample design"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
