import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
const statuses = ["new", "confirmed", "visited", "converted", "closed"];
export default function AdminDashboard() {
    const [adminKey, setAdminKey] = useState(localStorage_getKey());
    const [keyInput, setKeyInput] = useState("");
    const [leads, setLeads] = useState([]);
    const [orders, setOrders] = useState([]);
    const [tab, setTab] = useState("leads");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    function localStorage_getKey() {
        try {
            return sessionStorage.getItem("sona_admin_key") || "";
        }
        catch {
            return "";
        }
    }
    const load = async (key) => {
        setLoading(true);
        setError("");
        try {
            const [l, o] = await Promise.all([api.adminListLeads(key), api.adminListOrders(key)]);
            setLeads(l);
            setOrders(o);
            setAdminKey(key);
            sessionStorage.setItem("sona_admin_key", key);
        }
        catch (e) {
            setError(e.message || "Could not authenticate. Check the admin key.");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (adminKey)
            load(adminKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const updateStatus = async (id, status) => {
        const updated = await api.adminUpdateLeadStatus(adminKey, id, status);
        setLeads((ls) => ls.map((l) => (l._id === id ? updated : l)));
    };
    const createOrderFromLead = async (leadId) => {
        const order = await api.adminCreateOrder(adminKey, leadId);
        setOrders((os) => [order, ...os]);
    };
    const advanceOrder = async (id) => {
        const updated = await api.adminAdvanceOrder(adminKey, id);
        setOrders((os) => os.map((o) => (o._id === id ? updated : o)));
    };
    if (!adminKey) {
        return (_jsx("div", { className: "min-h-screen bg-obsidian flex items-center justify-center px-6", children: _jsxs("div", { className: "max-w-sm w-full", children: [_jsx("h1", { className: "font-serif text-3xl text-ivory mb-6", children: "SONA Admin" }), _jsx("input", { type: "password", placeholder: "Admin key", value: keyInput, onChange: (e) => setKeyInput(e.target.value), className: "w-full border border-champagne/20 bg-espresso text-ivory rounded px-3 py-2 text-sm mb-3" }), _jsx("button", { onClick: () => load(keyInput), disabled: loading || !keyInput, className: "w-full bg-antiquegold text-obsidian py-2.5 rounded text-sm uppercase tracking-wide disabled:opacity-50", children: loading ? "Checking…" : "Enter" }), error && _jsx("p", { className: "text-red-400 text-xs mt-3", children: error }), _jsx("p", { className: "text-parchment/40 text-xs mt-4", children: "This is the ADMIN_KEY set in backend/.env \u2014 not a real login system, swap for proper auth before deploying." })] }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-obsidian px-6 py-10", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsx("h1", { className: "font-serif text-3xl text-ivory", children: "SONA Admin" }), _jsx("button", { onClick: () => {
                                sessionStorage.removeItem("sona_admin_key");
                                setAdminKey("");
                            }, className: "text-xs text-parchment/50 underline", children: "Log out" })] }), _jsxs("div", { className: "flex gap-4 mb-8", children: [_jsxs("button", { onClick: () => setTab("leads"), className: `text-sm px-4 py-2 rounded ${tab === "leads" ? "bg-antiquegold text-obsidian" : "text-parchment/60 border border-champagne/20"}`, children: ["Leads (", leads.length, ")"] }), _jsxs("button", { onClick: () => setTab("orders"), className: `text-sm px-4 py-2 rounded ${tab === "orders" ? "bg-antiquegold text-obsidian" : "text-parchment/60 border border-champagne/20"}`, children: ["Orders (", orders.length, ")"] })] }), error && _jsx("p", { className: "text-red-400 text-sm mb-4", children: error }), tab === "leads" && (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm text-left text-parchment/80", children: [_jsx("thead", { className: "text-xs uppercase text-parchment/40 border-b border-champagne/10", children: _jsxs("tr", { children: [_jsx("th", { className: "py-2 pr-4", children: "Name" }), _jsx("th", { className: "py-2 pr-4", children: "Mobile" }), _jsx("th", { className: "py-2 pr-4", children: "Area" }), _jsx("th", { className: "py-2 pr-4", children: "Type" }), _jsx("th", { className: "py-2 pr-4", children: "Preferred" }), _jsx("th", { className: "py-2 pr-4", children: "Status" }), _jsx("th", { className: "py-2 pr-4", children: "Convert" })] }) }), _jsxs("tbody", { children: [leads.map((l) => (_jsxs("tr", { className: "border-b border-champagne/5", children: [_jsx("td", { className: "py-2 pr-4", children: l.name }), _jsx("td", { className: "py-2 pr-4", children: l.mobile }), _jsx("td", { className: "py-2 pr-4", children: l.area }), _jsx("td", { className: "py-2 pr-4", children: l.jewelleryType }), _jsxs("td", { className: "py-2 pr-4", children: [l.preferredDate?.slice(0, 10), " \u00B7 ", l.preferredTime] }), _jsx("td", { className: "py-2 pr-4", children: _jsx("select", { value: l.status, onChange: (e) => updateStatus(l._id, e.target.value), className: "bg-espresso border border-champagne/20 rounded px-2 py-1 text-xs", children: statuses.map((s) => (_jsx("option", { value: s, children: s }, s))) }) }), _jsx("td", { className: "py-2 pr-4", children: _jsx("button", { onClick: () => createOrderFromLead(l._id), className: "text-xs text-antiquegold underline", children: "Create order" }) })] }, l._id))), leads.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 7, className: "py-6 text-center text-parchment/40", children: "No leads yet." }) }))] })] }) })), tab === "orders" && (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm text-left text-parchment/80", children: [_jsx("thead", { className: "text-xs uppercase text-parchment/40 border-b border-champagne/10", children: _jsxs("tr", { children: [_jsx("th", { className: "py-2 pr-4", children: "Order ID" }), _jsx("th", { className: "py-2 pr-4", children: "Customer" }), _jsx("th", { className: "py-2 pr-4", children: "Stage" }), _jsx("th", { className: "py-2 pr-4", children: "Advance" })] }) }), _jsxs("tbody", { children: [orders.map((o) => (_jsxs("tr", { className: "border-b border-champagne/5", children: [_jsx("td", { className: "py-2 pr-4 font-mono text-xs", children: o._id }), _jsxs("td", { className: "py-2 pr-4", children: [o.lead?.name, " \u00B7 ", o.lead?.mobile] }), _jsx("td", { className: "py-2 pr-4 text-highlightgold", children: o.stage }), _jsx("td", { className: "py-2 pr-4", children: o.stage !== "DELIVERED" && (_jsx("button", { onClick: () => advanceOrder(o._id), className: "text-xs text-antiquegold underline", children: "Advance stage" })) })] }, o._id))), orders.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 4, className: "py-6 text-center text-parchment/40", children: "No orders yet." }) }))] })] }) }))] }) }));
}
