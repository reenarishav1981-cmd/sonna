import { useState } from "react";
import { api, Design } from "../lib/api";

const jewelleryTypes = [
  "Rings", "Chains", "Earrings", "Bangles", "Necklaces", "Bridal", "Daily Wear", "Occasion Wear", "Not sure yet",
];

export default function HomeVisitForm({ prefillDesign }: { prefillDesign?: Design | null }) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    area: "",
    jewelleryType: prefillDesign?.category || "",
    approxBudget: "",
    preferredDate: "",
    preferredTime: "",
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    setStatus("submitting");
    setErrorMsg("");
    try {
      await api.createLead(form);
      setStatus("done");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  if (status === "done") {
    return (
      <section id="book-a-visit" className="bg-ivory text-obsidian py-24 px-6">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="font-serif text-3xl mb-4">Request received.</h2>
          <p className="text-obsidian/70">
            We've noted your preferred date and time. A representative will reach out to confirm your
            home visit.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="book-a-visit" className="bg-ivory text-obsidian py-24 px-6">
      <div className="max-w-lg mx-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-antiquegold mb-3">Book a home visit</p>
        <h2 className="font-serif text-4xl mb-2">Bring the jewellery experience home.</h2>
        <p className="text-obsidian/60 text-sm mb-10">No purchase is required during the visit.</p>

        <div className="space-y-5">
          {step === 1 && (
            <>
              <Field label="Name" value={form.name} onChange={(v) => update("name", v)} />
              <Field label="Mobile Number" value={form.mobile} onChange={(v) => update("mobile", v)} />
              <Field label="Village / Area" value={form.area} onChange={(v) => update("area", v)} />
            </>
          )}
          {step === 2 && (
            <>
              <div>
                <label className="text-xs uppercase tracking-wide text-obsidian/60 mb-2 block">
                  Jewellery Type
                </label>
                <select
                  value={form.jewelleryType}
                  onChange={(e) => update("jewelleryType", e.target.value)}
                  className="w-full border border-obsidian/20 rounded px-3 py-2 bg-white/60 text-sm"
                >
                  <option value="">Select type</option>
                  {jewelleryTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <Field label="Approximate Budget" value={form.approxBudget} onChange={(v) => update("approxBudget", v)} placeholder="e.g. 50,000 - 80,000" />
            </>
          )}
          {step === 3 && (
            <>
              <Field label="Preferred Date" value={form.preferredDate} onChange={(v) => update("preferredDate", v)} type="date" />
              <Field label="Preferred Time" value={form.preferredTime} onChange={(v) => update("preferredTime", v)} placeholder="e.g. Evening, or 4:00 PM" />
            </>
          )}

          {status === "error" && <p className="text-sm text-red-700">{errorMsg}</p>}

          <div className="flex justify-between pt-4">
            {step > 1 ? (
              <button onClick={() => setStep((s) => s - 1)} className="text-sm text-obsidian/60 underline">
                Back
              </button>
            ) : <span />}
            {step < 3 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                className="bg-obsidian text-ivory px-6 py-2.5 text-sm uppercase tracking-wide rounded"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={status === "submitting"}
                className="bg-antiquegold text-obsidian px-6 py-2.5 text-sm uppercase tracking-wide rounded disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Request a Visit"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, value, onChange, type = "text", placeholder,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wide text-obsidian/60 mb-2 block">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-obsidian/20 rounded px-3 py-2 bg-white/60 text-sm"
      />
    </div>
  );
}
