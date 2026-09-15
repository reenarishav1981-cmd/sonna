const traditional = ["Customer", "Jeweller Shop", "Designs", "Negotiation", "Purchase"];
const sona = [
  "Customer Home",
  "Physical Sample Experience",
  "Design Selection",
  "Transparent Quote",
  "Trusted Partner Jeweller",
  "Verification",
  "Secure Home Delivery",
];

function Flow({ steps, dim }: { steps: string[]; dim?: boolean }) {
  return (
    <div className="flex flex-col gap-3">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-3">
          <span className={`text-xs font-mono ${dim ? "text-champagne/30" : "text-highlightgold"}`}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className={`text-sm md:text-base ${dim ? "text-parchment/40 line-through" : "text-ivory"}`}>{s}</span>
        </div>
      ))}
    </div>
  );
}

export default function ConceptJourney() {
  return (
    <section id="how-it-works" className="bg-obsidian py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-antiquegold mb-3">The concept</p>
        <h2 className="font-serif text-4xl md:text-5xl text-ivory mb-14">Not another jewellery store.</h2>
        <div className="grid md:grid-cols-2 gap-14">
          <div>
            <p className="text-xs uppercase tracking-wide text-parchment/50 mb-5">Traditional model</p>
            <Flow steps={traditional} dim />
          </div>
          <div className="border-l border-antiquegold/20 pl-10">
            <p className="text-xs uppercase tracking-wide text-highlightgold mb-5">The SONA way</p>
            <Flow steps={sona} />
          </div>
        </div>
      </div>
    </section>
  );
}
