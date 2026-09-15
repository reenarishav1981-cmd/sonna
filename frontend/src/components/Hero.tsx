import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STAGES = ["SAMPLE", "SELECTED", "PRICE", "VERIFIED", "DELIVERED"];

export default function Hero() {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStageIndex((i) => (i + 1) % STAGES.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="min-h-screen flex items-center pt-24 pb-12 px-6 bg-obsidian">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center w-full">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-antiquegold mb-6">Jewellery, reimagined</p>
          <h1 className="font-serif text-5xl md:text-7xl leading-[0.98] text-ivory mb-6">
            See it.
            <br />
            Trust it.
            <br />
            Bring it home.
          </h1>
          <p className="text-parchment/80 text-base md:text-lg max-w-md mb-8 leading-relaxed">
            Discover jewellery designs from the comfort of your home. Explore physical samples,
            understand the complete price, and order through trusted jewellery partners.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#book-a-visit"
              className="bg-antiquegold text-obsidian px-6 py-3 text-sm uppercase tracking-wide rounded hover:bg-highlightgold transition-colors"
            >
              Book a Home Jewellery Visit
            </a>
            <a
              href="#how-it-works"
              className="border border-champagne/40 text-champagne px-6 py-3 text-sm uppercase tracking-wide rounded hover:border-highlightgold hover:text-highlightgold transition-colors"
            >
              See How It Works
            </a>
          </div>
        </div>

        <div className="relative h-[420px] flex items-center justify-center">
          <div className="w-72 h-96 rounded-lg border border-champagne/20 bg-espresso relative overflow-hidden flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={STAGES[stageIndex]}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5 }}
                className="text-center px-6"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-antiquegold/60 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-highlightgold" />
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-highlightgold mb-2">
                  Stage {stageIndex + 1} / {STAGES.length}
                </p>
                <p className="font-serif text-2xl text-ivory">{STAGES[stageIndex]}</p>
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-6 flex gap-1.5">
              {STAGES.map((s, i) => (
                <span
                  key={s}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === stageIndex ? "w-6 bg-highlightgold" : "w-1.5 bg-champagne/25"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
