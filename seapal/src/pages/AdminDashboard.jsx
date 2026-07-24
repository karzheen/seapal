import { useState, useMemo } from "react";
import picsData from "../data/picData.json";
import ArtworkFormPanel, { SUBJECTS } from "../component/ArtworkFormPanel";

const DEFAULT_ACCORDION = {
  rarity: "One-of-a-kind Artwork",
  readyToHang: "Yes",
  framed: "Yes",
  authenticity: "Certificate is Included",
  packaging: "Framed & Protected",
  deliveryCost: "Shipping is included in price.",
  deliveryTime: "Typically 5-7 business days.",
  returns: "Free returns within 14 days of delivery.",
  handling: "Delivered framed and protected for transit.",
  shipsFrom: "Erbil, Iraq.",
};

const c = {
  sand: "#EDE5D6", ink: "#2B2521", inkSoft: "#6B6154", teal: "#1E4A42",
  tealDeep: "#123832", clay: "#B23A2E", sage: "#7C8F6E", white: "#FBF8F2", line: "#D8CCB5",
};

export default function AdminDashboard() {
  const [works, setWorks] = useState(picsData);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingWork, setEditingWork] = useState(null); // null = "add" mode
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved | error

  const totals = useMemo(() => {
    const total = works.length;
    const sold = works.filter((w) => w.sold).length;
    const available = total - sold;
    const value = works.filter((w) => !w.sold).reduce((s, w) => s + (w.price || 0), 0);
    const soldValue = works.filter((w) => w.sold).reduce((s, w) => s + (w.price || 0), 0);
    return { total, sold, available, value, soldValue };
  }, [works]);

  const rows = useMemo(
    () =>
      works.filter(
        (w) =>
          (activeFilter === "All" || w.subject === activeFilter) &&
          (w.alt || "").toLowerCase().includes(query.toLowerCase())
      ),
    [works, activeFilter, query]
  );

  async function persist(nextWorks) {
    setSaveState("saving");
    try {
      const res = await fetch("/api/save-pic-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nextWorks),
      });
      if (!res.ok) throw new Error("save failed");
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 1800);
    } catch (err) {
      console.error(err);
      setSaveState("error");
    }
  }

  function openAdd() {
    setEditingWork(null);
    setPanelOpen(true);
  }

  function openEdit(w) {
    setEditingWork(w);
    setPanelOpen(true);
  }

  function closePanel() {
    setPanelOpen(false);
  }

  function handleSave(patch) {
    let next;
    if (editingWork) {
      next = works.map((w) => (w.id === editingWork.id ? { ...w, ...patch } : w));
    } else {
      const newId = works.length ? Math.max(...works.map((w) => w.id)) + 1 : 1;
      next = [...works, { id: newId, padding: "18.03px", ...patch, ...DEFAULT_ACCORDION }];
    }
    setWorks(next);
    persist(next);
    setPanelOpen(false);
  }

  function toggleSold(id) {
    const next = works.map((w) => (w.id === id ? { ...w, sold: !w.sold } : w));
    setWorks(next);
    persist(next);
  }

  function deleteWork(id) {
    const next = works.filter((w) => w.id !== id);
    setWorks(next);
    persist(next);
  }

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: c.sand, color: c.ink, minHeight: "100%" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');
        .adls-serif{font-family:'Fraunces',serif;}
        .adls-row:hover{background:#F7F2E8;}
        .adls-input:focus, .adls-select:focus{outline:2px solid ${c.teal};outline-offset:1px;background:${c.white};}
        .adls-icon-btn:hover{border-color:${c.teal} !important;color:${c.teal} !important;}
        .adls-add:hover{background:${c.tealDeep} !important;}
        .adls-status-pill{cursor:pointer;}
      `}</style>

      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 36px", borderBottom: `1px solid ${c.line}`, background: c.white }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
            <path d="M4 24c4-6 10-6 14 0s10 6 14 0" stroke={c.teal} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M4 18c4-6 10-6 14 0s10 6 14 0" stroke={c.clay} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          </svg>
          <span className="adls-serif" style={{ fontSize: 20 }}>
            Art<em style={{ color: c.clay, fontStyle: "italic" }}>De</em>LaSea{" "}
            <span style={{ fontSize: 12, color: c.inkSoft, fontFamily: "'Inter'", fontWeight: 600, letterSpacing: 1 }}>STUDIO</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <SaveIndicator state={saveState} />
          <button type="button" className="adls-add" onClick={openAdd} style={{ background: c.teal, color: c.white, border: "none", padding: "11px 20px", borderRadius: 3, fontWeight: 600, fontSize: 13.5, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
            Add artwork
          </button>
        </div>
      </header>

      <main style={{ padding: "32px 36px 80px", maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14, marginBottom: 32 }}>
          {[
            { n: totals.total, l: "Total works", accent: c.teal },
            { n: totals.available, l: "Available", accent: c.sage },
            { n: totals.sold, l: "Sold", accent: c.clay },
            { n: `$${totals.value.toLocaleString()}`, l: "Available value", accent: c.teal },
            { n: `$${totals.soldValue.toLocaleString()}`, l: "Sold value", accent: c.clay },
          ].map((s, i) => (
            <div key={i} style={{ background: c.white, border: `1px solid ${c.line}`, borderRadius: 4, padding: "18px 20px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: s.accent }} />
              <div className="adls-serif" style={{ fontSize: 28, fontWeight: 500 }}>{s.n}</div>
              <div style={{ fontSize: 12, color: c.inkSoft, textTransform: "uppercase", letterSpacing: 0.6, marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 16, flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 220, maxWidth: 340 }}>
            <svg style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, stroke: c.inkSoft }} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
            <input placeholder="Search by title…" value={query} onChange={(e) => setQuery(e.target.value)} style={{ width: "100%", padding: "10px 14px 10px 34px", border: `1px solid ${c.line}`, borderRadius: 3, background: c.white, fontSize: 16, color: c.ink }} />
          </div>

          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            style={{ padding: "10px 14px", border: `1px solid ${c.line}`, borderRadius: 3, background: c.white, fontSize: 14, color: c.ink, fontWeight: 500, minWidth: 180 }}
          >
            <option value="All">All subjects</option>
            {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div style={{ background: c.white, border: `1px solid ${c.line}`, borderRadius: 4, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Artwork", "Subject", "Price", "Status", ""].map((h, i) => (
                  <th key={i} style={{ textAlign: i === 4 ? "right" : "left", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.7, color: c.inkSoft, padding: "14px 16px", borderBottom: `1px solid ${c.line}`, fontWeight: 600, width: i === 0 ? "38%" : undefined }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: "center", padding: 40, color: c.inkSoft }}>No works match — try a different search or filter.</td></tr>
              )}
              {rows.map((w) => (
                <tr key={w.id} className="adls-row" style={{ borderBottom: `1px solid ${c.line}` }}>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <img
                        src={w.src}
                        alt={w.alt}
                        style={{ width: 44, height: 44, borderRadius: 3, flexShrink: 0, objectFit: "cover", boxShadow: "0 1px 2px rgba(0,0,0,0.15)", background: "linear-gradient(135deg,#B8D4E8,#E8A87C)" }}
                        onError={(e) => { e.target.style.background = "linear-gradient(135deg,#B8D4E8,#E8A87C)"; e.target.src = ""; }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13.5 }}>{w.alt}</div>
                        <div style={{ fontSize: 11.5, color: c.inkSoft, marginTop: 1 }}>{w.size} cm</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 13.5 }}>{w.subject}</td>
                  <td className="adls-serif" style={{ padding: "12px 16px", fontWeight: 500 }}>${(w.price || 0).toLocaleString()}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span
                      className="adls-status-pill"
                      onClick={() => toggleSold(w.id)}
                      title="Click to toggle"
                      style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 20, fontSize: 11.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.4, background: w.sold ? "#F5E3E0" : "#E7EEE4", color: w.sold ? c.clay : c.sage }}
                    >
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }} />
                      {w.sold ? "Sold" : "Available"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                      <div className="adls-icon-btn" onClick={() => openEdit(w)} style={{ width: 30, height: 30, borderRadius: 3, border: `1px solid ${c.line}`, background: c.white, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: c.inkSoft }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                      </div>
                      <div className="adls-icon-btn" onClick={() => deleteWork(w.id)} style={{ width: 30, height: 30, borderRadius: 3, border: `1px solid ${c.line}`, background: c.white, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: c.inkSoft }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" /></svg>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <ArtworkFormPanel
        open={panelOpen}
        work={editingWork}
        onClose={closePanel}
        onSave={handleSave}
      />
    </div>
  );
}

function SaveIndicator({ state }) {
  if (state === "idle") return null;
  const map = {
    saving: { text: "Saving…", color: c.inkSoft },
    saved: { text: "Saved", color: c.sage },
    error: { text: "Save failed — is the dev server running?", color: c.clay },
  };
  const cfg = map[state];
  return <span style={{ fontSize: 12, fontWeight: 600, color: cfg.color }}>{cfg.text}</span>;
}