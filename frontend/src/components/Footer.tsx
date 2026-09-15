export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-champagne/10 py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 text-sm text-parchment/60">
        <div>
          <p className="font-serif text-xl text-ivory mb-3">SONA</p>
          <p className="text-xs">The jewellery store that comes to you.</p>
        </div>
        <div className="space-y-2">
          <p className="text-ivory/80 text-xs uppercase tracking-wide mb-2">Concept</p>
          <p>About the concept</p>
          <p>How it works</p>
        </div>
        <div className="space-y-2">
          <p className="text-ivory/80 text-xs uppercase tracking-wide mb-2">Trust</p>
          <p>Trust & Verification</p>
          <p>Book a Visit</p>
        </div>
        <div className="space-y-2">
          <p className="text-ivory/80 text-xs uppercase tracking-wide mb-2">Legal</p>
          <p>Privacy</p>
          <p>Terms</p>
        </div>
      </div>
      <p className="max-w-7xl mx-auto text-[11px] text-parchment/30 mt-12 pt-6 border-t border-champagne/5">
        Concept prototype — partner availability, pricing, delivery and policies are subject to validation.
      </p>
    </footer>
  );
}
