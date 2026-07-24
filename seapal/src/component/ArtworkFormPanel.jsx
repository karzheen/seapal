import { useState, useEffect } from "react";

export const SUBJECTS = [
  "Landscape", "Animal", "Portrait", "Abstract", "Nature", "Floral", "Beach",
  "Politics", "Seascape", "Water", "Still Life", "Calligraphy", "Food & Drink",
  "Graffiti", "Language", "Music", "Pop Culture/Celebrity",
];

const MAX_IMAGES = 7;

const c = {
  sand: "#EDE5D6", ink: "#2B2521", inkSoft: "#6B6154", teal: "#1E4A42",
  tealDeep: "#123832", clay: "#B23A2E", sage: "#7C8F6E", white: "#FBF8F2", line: "#D8CCB5",
};

function emptyForm() {
  return {
    alt: "",
    subject: "Landscape",
    mediums: "Oil, Canvas",
    size: "",
    price: "",
    date: new Date().toISOString().slice(0, 10),
    images: [""],
    sold: false,
  };
}

export default function ArtworkFormPanel({ open, work, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm());
  const [uploadingIdx, setUploadingIdx] = useState(null);

  // Reset form whenever the panel opens, or whenever the artwork being edited changes.
  useEffect(() => {
    if (!open) return;
    if (work) {
      setForm({
        alt: work.alt || "",
        subject: work.subject || "Landscape",
        mediums: work.mediums || "Oil, Canvas",
        size: work.size || "",
        price: work.price || "",
        date: work.date || new Date().toISOString().slice(0, 10),
        images: work.images && work.images.length ? work.images : [work.src || ""],
        sold: !!work.sold,
      });
    } else {
      setForm(emptyForm());
    }
  }, [open, work]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function addImageField() {
    if (form.images.length >= MAX_IMAGES) return;
    setForm((f) => ({ ...f, images: [...f.images, ""] }));
  }

  function removeImageField(idx) {
    if (form.images.length <= 1) return;
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));
  }

  function updateImageField(idx, value) {
    setForm((f) => {
      const next = [...f.images];
      next[idx] = value;
      return { ...f, images: next };
    });
  }

  async function handleFilePick(idx, file) {
    if (!file) return;
    setUploadingIdx(idx);
    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const res = await fetch("/api/upload-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, dataUrl }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "upload failed");
      updateImageField(idx, data.path);
    } catch (err) {
      console.error(err);
      alert("Upload failed — is the dev server running? (uploads only work with npm run dev, not on the live site)");
    } finally {
      setUploadingIdx(null);
    }
  }

  function handleSubmit(e) {
    e.preventDefault(); // critical: stops any native form submission / page reload
    if (!form.alt.trim()) return;
    const cleanedImages = form.images.map((i) => i.trim()).filter(Boolean);
    const patch = {
      alt: form.alt.trim(),
      subject: form.subject,
      mediums: form.mediums,
      size: form.size,
      price: Number(form.price) || 0,
      date: form.date,
      src: cleanedImages[0] || "",
      images: cleanedImages.length ? cleanedImages : [""],
      sold: form.sold,
    };
    onSave(patch);
  }

  return (
    <>
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(35,29,23,0.35)", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity .2s ease", zIndex: 10 }}
      />

      <form
        onSubmit={handleSubmit}
        style={{ position: "fixed", top: 0, right: open ? 0 : -420, width: 400, maxWidth: "90vw", height: "100%", background: c.white, boxShadow: "-6px 0 24px rgba(0,0,0,0.12)", transition: "right .25s ease", zIndex: 11, display: "flex", flexDirection: "column" }}
      >
        <div style={{ padding: "24px 26px", borderBottom: `1px solid ${c.line}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: `linear-gradient(135deg, ${c.teal}, ${c.tealDeep})`, color: c.white, position: "sticky", top: 0, zIndex: 2 }}>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 19, fontFamily: "'Fraunces',serif" }}>{work ? "Edit artwork" : "Add artwork"}</h2>
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", color: c.white, cursor: "pointer", opacity: 0.8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>

        <div style={{ padding: "22px 26px", overflowY: "auto", flex: 1 }}>
          <div style={{ height: 130, borderRadius: 4, marginBottom: 18, border: `1px solid ${c.line}`, background: form.images[0] ? `url(${form.images[0]}) center/cover` : "linear-gradient(135deg,#B8D4E8,#E8A87C)" }} />

          <Field label="Title">
            <input value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} placeholder="e.g. Blue Green Rhapsody" style={inputStyle} />
          </Field>

          <Field label={`Gallery images (${form.images.length}/${MAX_IMAGES})`}>
            {form.images.map((img, idx) => (
              <div key={idx} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <input
                  value={img}
                  onChange={(e) => updateImageField(idx, e.target.value)}
                  placeholder={idx === 0 ? "/seapal/filename.png (main image)" : "/seapal/filename.png"}
                  style={inputStyle}
                />
                <label
                  style={{ width: 38, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${c.line}`, borderRadius: 3, background: c.white, color: c.teal, cursor: "pointer" }}
                  title="Choose from files"
                >
                  {uploadingIdx === idx ? (
                    <span style={{ fontSize: 10 }}>…</span>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>
                  )}
                  <input type="file" accept="image/*" onChange={(e) => handleFilePick(idx, e.target.files[0])} style={{ display: "none" }} />
                </label>
                <button
                  type="button"
                  onClick={() => removeImageField(idx)}
                  disabled={form.images.length <= 1}
                  style={{ width: 38, flexShrink: 0, border: `1px solid ${c.line}`, borderRadius: 3, background: c.white, color: form.images.length <= 1 ? "#C9BFA9" : c.clay, cursor: form.images.length <= 1 ? "not-allowed" : "pointer" }}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addImageField}
              disabled={form.images.length >= MAX_IMAGES}
              style={{ width: "100%", padding: "9px 12px", border: `1px dashed ${c.line}`, borderRadius: 3, background: "none", color: form.images.length >= MAX_IMAGES ? "#C9BFA9" : c.teal, fontWeight: 600, fontSize: 13, cursor: form.images.length >= MAX_IMAGES ? "not-allowed" : "pointer" }}
            >
              + Add image
            </button>
          </Field>

          <Field label="Subject">
            <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} style={inputStyle}>
              {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>

          <div style={{ display: "flex", gap: 12 }}>
            <Field label="Price ($)" style={{ flex: 1 }}>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="450" style={inputStyle} />
            </Field>
            <Field label="Status" style={{ flex: 1 }}>
              <select value={form.sold ? "Sold" : "Available"} onChange={(e) => setForm({ ...form, sold: e.target.value === "Sold" })} style={inputStyle}>
                <option>Available</option>
                <option>Sold</option>
              </select>
            </Field>
          </div>

          <Field label="Size (e.g. 92 x 64)">
            <input value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} placeholder="92 x 64" style={inputStyle} />
          </Field>

          <div style={{ display: "flex", gap: 12 }}>
            <Field label="Medium" style={{ flex: 1 }}>
              <input value={form.mediums} onChange={(e) => setForm({ ...form, mediums: e.target.value })} style={inputStyle} />
            </Field>
            <Field label="Date" style={{ flex: 1 }}>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} style={inputStyle} />
            </Field>
          </div>
        </div>

        <div style={{ padding: "18px 26px", borderTop: `1px solid ${c.line}`, display: "flex", gap: 10 }}>
          <button type="button" onClick={onClose} style={{ background: "none", border: `1px solid ${c.line}`, color: c.inkSoft, padding: "11px 16px", borderRadius: 3, fontWeight: 600, fontSize: 13.5, cursor: "pointer" }}>Cancel</button>
          <button type="submit" style={{ flex: 1, background: c.teal, color: c.white, border: "none", padding: 11, borderRadius: 3, fontWeight: 600, fontSize: 13.5, cursor: "pointer" }}>Save artwork</button>
        </div>
      </form>
    </>
  );
}

function Field({ label, children, style }) {
  return (
    <div style={{ marginBottom: 16, ...style }}>
      <label style={{ display: "block", fontSize: 11.5, textTransform: "uppercase", letterSpacing: 0.5, color: c.inkSoft, fontWeight: 600, marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = { width: "100%", padding: "10px 12px", border: `1px solid ${c.line}`, borderRadius: 3, fontSize: 16, background: c.sand, fontFamily: "'Inter'" };