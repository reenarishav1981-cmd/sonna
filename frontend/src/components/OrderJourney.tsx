const steps = [
  { n: "01", title: "Book", desc: "Request a home visit." },
  { n: "02", title: "Explore", desc: "See physical sample designs." },
  { n: "03", title: "Understand", desc: "Receive a transparent price breakdown." },
  { n: "04", title: "Order", desc: "Confirm the selected jewellery through the partner fulfilment process." },
  { n: "05", title: "Receive", desc: "Verified jewellery is delivered to your doorstep." },
];

export default function OrderJourney() {
  return (
    <section className="bg-obsidian py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-antiquegold mb-3">How the order works</p>
        <h2 className="font-serif text-4xl md:text-5xl text-ivory mb-14">From sample to doorstep.</h2>
        <div className="grid md:grid-cols-5 gap-8 relative">
          <div className="hidden md:block absolute top-4 left-0 right-0 h-px bg-champagne/15" />
          {steps.map((s) => (
            <div key={s.n} className="relative">
              <div className="w-8 h-8 rounded-full bg-obsidian border border-antiquegold flex items-center justify-center text-xs text-highlightgold mb-4 relative z-10">
                {s.n}
              </div>
              <p className="font-serif text-xl text-ivory mb-1">{s.title}</p>
              <p className="text-sm text-parchment/60">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
