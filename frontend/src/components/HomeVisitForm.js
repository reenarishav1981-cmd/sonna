import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { api } from "../lib/api";
const jewelleryTypes = [
    "Rings", "Chains", "Earrings", "Bangles", "Necklaces", "Bridal", "Daily Wear", "Occasion Wear", "Not sure yet",
];
export default function HomeVisitForm({ prefillDesign }) {
    const [step, setStep] = useState(1);
    const [status, setStatus] = useState("idle");
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
    const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
    const submit = async () => {
        setStatus("submitting");
        setErrorMsg("");
        try {
            await api.createLead(form);
            setStatus("done");
        }
        catch (err) {
            setStatus("error");
            setErrorMsg(err.message || "Something went wrong. Please try again.");
        }
    };
    if (status === "done") {
        return (_jsx("section", { id: "book-a-visit", className: "bg-ivory text-obsidian py-24 px-6", children: _jsxs("div", { className: "max-w-lg mx-auto text-center", children: [_jsx("h2", { className: "font-serif text-3xl mb-4", children: "Request received." }), _jsx("p", { className: "text-obsidian/70", children: "We've noted your preferred date and time. A representative will reach out to confirm your home visit." })] }) }));
    }
    return (_jsx("section", { id: "book-a-visit", className: "bg-ivory text-obsidian py-24 px-6", children: _jsxs("div", { className: "max-w-lg mx-auto", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-antiquegold mb-3", children: "Book a home visit" }), _jsx("h2", { className: "font-serif text-4xl mb-2", children: "Bring the jewellery experience home." }), _jsx("p", { className: "text-obsidian/60 text-sm mb-10", children: "No purchase is required during the visit." }), _jsxs("div", { className: "space-y-5", children: [step === 1 && (_jsxs(_Fragment, { children: [_jsx(Field, { label: "Name", value: form.name, onChange: (v) => update("name", v) }), _jsx(Field, { label: "Mobile Number", value: form.mobile, onChange: (v) => update("mobile", v) }), _jsx(Field, { label: "Village / Area", value: form.area, onChange: (v) => update("area", v) })] })), step === 2 && (_jsxs(_Fragment, { children: [_jsxs("div", { children: [_jsx("label", { className: "text-xs uppercase tracking-wide text-obsidian/60 mb-2 block", children: "Jewellery Type" }), _jsxs("select", { value: form.jewelleryType, onChange: (e) => update("jewelleryType", e.target.value), className: "w-full border border-obsidian/20 rounded px-3 py-2 bg-white/60 text-sm", children: [_jsx("option", { value: "", children: "Select type" }), jewelleryTypes.map((t) => (_jsx("option", { value: t, children: t }, t)))] })] }), _jsx(Field, { label: "Approximate Budget", value: form.approxBudget, onChange: (v) => update("approxBudget", v), placeholder: "e.g. 50,000 - 80,000" })] })), step === 3 && (_jsxs(_Fragment, { children: [_jsx(Field, { label: "Preferred Date", value: form.preferredDate, onChange: (v) => update("preferredDate", v), type: "date" }), _jsx(Field, { label: "Preferred Time", value: form.preferredTime, onChange: (v) => update("preferredTime", v), placeholder: "e.g. Evening, or 4:00 PM" })] })), status === "error" && _jsx("p", { className: "text-sm text-red-700", children: errorMsg }), _jsxs("div", { className: "flex justify-between pt-4", children: [step > 1 ? (_jsx("button", { onClick: () => setStep((s) => s - 1), className: "text-sm text-obsidian/60 underline", children: "Back" })) : _jsx("span", {}), step < 3 ? (_jsx("button", { onClick: () => setStep((s) => s + 1), className: "bg-obsidian text-ivory px-6 py-2.5 text-sm uppercase tracking-wide rounded", children: "Continue" })) : (_jsx("button", { onClick: submit, disabled: status === "submitting", className: "bg-antiquegold text-obsidian px-6 py-2.5 text-sm uppercase tracking-wide rounded disabled:opacity-60", children: status === "submitting" ? "Sending…" : "Request a Visit" }))] })] })] }) }));
}
function Field({ label, value, onChange, type = "text", placeholder, }) {
    return (_jsxs("div", { children: [_jsx("label", { className: "text-xs uppercase tracking-wide text-obsidian/60 mb-2 block", children: label }), _jsx("input", { type: type, value: value, placeholder: placeholder, onChange: (e) => onChange(e.target.value), className: "w-full border border-obsidian/20 rounded px-3 py-2 bg-white/60 text-sm" })] }));
}
