import React, { useState } from "react";
import Modal, { Field } from "./Modal.jsx";
import { WIDGET_TYPES } from "../data.js";
import { useStore } from "../store.js";
import { uid } from "../utils.js";

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function toLocalDateTimeInputValue(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(
    d.getMinutes()
  )}`;
}

// Shared add/edit widget form. In "add" mode you first pick a widget type
// from the library, then configure it. In "edit" mode the type is fixed
// and the form opens pre-filled with the widget's current values.
export default function WidgetModal({ mode = "add", widget = null, initialType = null, onClose }) {
  const addWidget = useStore((s) => s.addWidget);
  const updateWidget = useStore((s) => s.updateWidget);

  const typeDef =
    mode === "edit"
      ? WIDGET_TYPES.find((t) => t.type === widget.type)
      : initialType
      ? WIDGET_TYPES.find((t) => t.type === initialType)
      : null;
  const [selectedType, setSelectedType] = useState(typeDef || null);
  const [form, setForm] = useState(() => {
    if (mode === "edit") {
      return {
        title: widget.title || "",
        subtitle: widget.subtitle || "",
        icon: widget.icon || "",
        accent: widget.accent || "var(--accent)",
        size: widget.size || "md",
        ctaLabel: widget.ctaLabel || "",
        targetDateLocal: toLocalDateTimeInputValue(widget.targetDate),
        current: widget.current ?? "",
        target: widget.target ?? "",
        unit: widget.unit || "",
        extraLabel: widget.extraLabel || "",
        extraValue: widget.extraValue || "",
        extraSub: widget.extraSub || "",
        startDate: widget.startDate || "",
        totalDays: widget.totalDays ?? 90,
        text: widget.text || "",
        author: widget.author || "",
        imageUrl: widget.imageUrl || "",
      };
    }
    return {
      title: "",
      subtitle: "",
      icon: "",
      accent: "#22d3ee",
      size: "md",
      ctaLabel: "",
      targetDateLocal: "",
      current: "",
      target: "",
      unit: "",
      extraLabel: "",
      extraValue: "",
      extraSub: "",
      startDate: "",
      totalDays: 90,
      text: "",
      author: "",
      imageUrl: "",
    };
  });
  const [items, setItems] = useState(
    mode === "edit" && widget.items ? widget.items.map((i) => ({ ...i })) : []
  );
  const [newItemLabel, setNewItemLabel] = useState("");

  function pickType(def) {
    setSelectedType(def);
    setForm((f) => ({ ...f, title: f.title || def.label, icon: f.icon || def.icon, size: def.size }));
  }

  function patch(p) {
    setForm((f) => ({ ...f, ...p }));
  }

  function addItem() {
    if (!newItemLabel.trim()) return;
    setItems((its) => [...its, { id: uid(), label: newItemLabel.trim(), done: false }]);
    setNewItemLabel("");
  }
  function removeItem(id) {
    setItems((its) => its.filter((i) => i.id !== id));
  }
  function renameItem(id, label) {
    setItems((its) => its.map((i) => (i.id === id ? { ...i, label } : i)));
  }
  function toggleItem(id) {
    setItems((its) => its.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));
  }
  function moveItem(index, dir) {
    setItems((its) => {
      const next = [...its];
      const target = index + dir;
      if (target < 0 || target >= next.length) return its;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function onImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await readFileAsDataUrl(file);
    patch({ imageUrl: dataUrl });
  }

  function buildPayload() {
    const type = mode === "edit" ? widget.type : selectedType.type;
    const payload = {
      type,
      title: form.title || selectedType?.label || widget?.title,
      subtitle: form.subtitle || undefined,
      icon: form.icon || selectedType?.icon,
      accent: form.accent,
      size: form.size,
    };
    if (type === "countdown") {
      payload.targetDate = form.targetDateLocal ? new Date(form.targetDateLocal).toISOString() : widget?.targetDate;
      payload.ctaLabel = form.ctaLabel || undefined;
      if (form.current !== "" && form.target !== "") {
        payload.current = Number(form.current);
        payload.target = Number(form.target);
        payload.extraLabel = form.extraLabel || undefined;
      }
    }
    if (["progress", "savings", "reading", "study"].includes(type)) {
      payload.current = Number(form.current) || 0;
      payload.target = Number(form.target) || 0;
      payload.unit = form.unit || undefined;
      payload.extraLabel = form.extraLabel || undefined;
      payload.extraValue = form.extraValue || undefined;
      payload.extraSub = form.extraSub || undefined;
    }
    if (type === "ninetyday") {
      payload.startDate = form.startDate || widget?.startDate;
      payload.totalDays = Number(form.totalDays) || 90;
    }
    if (type === "checklist") {
      payload.items = items;
    }
    if (type === "quote" || type === "text") {
      payload.text = form.text;
      if (type === "quote") payload.author = form.author || undefined;
    }
    if (type === "image") {
      payload.imageUrl = form.imageUrl;
    }
    if (type === "clock") {
      payload.text = form.text || undefined;
      payload.extraValue = form.extraValue || undefined;
    }
    return payload;
  }

  function handleSave() {
    const payload = buildPayload();
    if (mode === "edit") {
      updateWidget(widget.id, payload);
    } else {
      addWidget(payload);
    }
    onClose();
  }

  const type = mode === "edit" ? widget.type : selectedType?.type;
  const showPicker = mode === "add" && !selectedType;

  return (
    <Modal title={mode === "edit" ? `Edit: ${widget.title}` : selectedType ? `Configure: ${selectedType.label}` : "Add Widget"} onClose={onClose} width={640}>
      {showPicker && (
        <div className="widget-type-grid">
          {WIDGET_TYPES.map((t) => (
            <button key={t.type} className="widget-type-card" onClick={() => pickType(t)}>
              <div className="icon">{t.icon}</div>
              <div className="label">{t.label}</div>
              <div className="desc">{t.description}</div>
            </button>
          ))}
        </div>
      )}

      {!showPicker && (
        <div>
          <Field label="Title">
            <input type="text" value={form.title} onChange={(e) => patch({ title: e.target.value })} />
          </Field>
          <Field label="Subtitle (optional)">
            <input type="text" value={form.subtitle} onChange={(e) => patch({ subtitle: e.target.value })} />
          </Field>
          <div className="field-row">
            <Field label="Icon (emoji)">
              <input type="text" value={form.icon} onChange={(e) => patch({ icon: e.target.value })} />
            </Field>
            <Field label="Accent color">
              <input
                type="color"
                value={/^#/.test(form.accent) ? form.accent : "#22d3ee"}
                onChange={(e) => patch({ accent: e.target.value })}
              />
            </Field>
          </div>

          {type === "countdown" && (
            <>
              <Field label="Target date & time">
                <input
                  type="datetime-local"
                  value={form.targetDateLocal}
                  onChange={(e) => patch({ targetDateLocal: e.target.value })}
                />
              </Field>
              <Field label="Call-to-action label (optional)">
                <input type="text" value={form.ctaLabel} onChange={(e) => patch({ ctaLabel: e.target.value })} />
              </Field>
              <div className="field-row">
                <Field label="Progress current (optional)">
                  <input type="number" value={form.current} onChange={(e) => patch({ current: e.target.value })} />
                </Field>
                <Field label="Progress target (optional)">
                  <input type="number" value={form.target} onChange={(e) => patch({ target: e.target.value })} />
                </Field>
              </div>
            </>
          )}

          {["progress", "savings", "reading", "study"].includes(type) && (
            <>
              <div className="field-row-3">
                <Field label="Current">
                  <input type="number" value={form.current} onChange={(e) => patch({ current: e.target.value })} />
                </Field>
                <Field label="Target">
                  <input type="number" value={form.target} onChange={(e) => patch({ target: e.target.value })} />
                </Field>
                <Field label="Unit label">
                  <input
                    type="text"
                    placeholder={type === "savings" ? "$" : "Books, hours, etc."}
                    value={form.unit}
                    onChange={(e) => patch({ unit: e.target.value })}
                  />
                </Field>
              </div>
              <div className="field-row">
                <Field label="Extra label (optional)">
                  <input type="text" value={form.extraLabel} onChange={(e) => patch({ extraLabel: e.target.value })} />
                </Field>
                <Field label="Extra value (optional)">
                  <input type="text" value={form.extraValue} onChange={(e) => patch({ extraValue: e.target.value })} />
                </Field>
              </div>
              <Field label="Extra sub-text (optional)">
                <input type="text" value={form.extraSub} onChange={(e) => patch({ extraSub: e.target.value })} />
              </Field>
            </>
          )}

          {type === "ninetyday" && (
            <div className="field-row">
              <Field label="Start date">
                <input type="date" value={form.startDate} onChange={(e) => patch({ startDate: e.target.value })} />
              </Field>
              <Field label="Total days">
                <input type="number" value={form.totalDays} onChange={(e) => patch({ totalDays: e.target.value })} />
              </Field>
            </div>
          )}

          {type === "checklist" && (
            <Field label="Items">
              <div className="checklist-editor">
                {items.map((item, idx) => (
                  <div className="checklist-editor-row" key={item.id}>
                    <button
                      type="button"
                      className={"checklist-check" + (item.done ? " done" : "")}
                      style={{ "--w-accent": form.accent }}
                      onClick={() => toggleItem(item.id)}
                      title="Toggle done"
                    >
                      {item.done ? "✓" : ""}
                    </button>
                    <input type="text" value={item.label} onChange={(e) => renameItem(item.id, e.target.value)} />
                    <button type="button" className="btn-icon" onClick={() => moveItem(idx, -1)} title="Move up">
                      ↑
                    </button>
                    <button type="button" className="btn-icon" onClick={() => moveItem(idx, 1)} title="Move down">
                      ↓
                    </button>
                    <button type="button" className="btn-icon danger" onClick={() => removeItem(item.id)} title="Remove">
                      ×
                    </button>
                  </div>
                ))}
                <div className="checklist-editor-row">
                  <input
                    type="text"
                    placeholder="Add a new item…"
                    value={newItemLabel}
                    onChange={(e) => setNewItemLabel(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addItem())}
                  />
                  <button type="button" className="btn" onClick={addItem}>
                    + Add
                  </button>
                </div>
              </div>
            </Field>
          )}

          {(type === "quote" || type === "text") && (
            <Field label={type === "quote" ? "Quote text" : "Body text"}>
              <textarea rows={3} value={form.text} onChange={(e) => patch({ text: e.target.value })} />
            </Field>
          )}
          {type === "quote" && (
            <Field label="Author (optional)">
              <input type="text" value={form.author} onChange={(e) => patch({ author: e.target.value })} />
            </Field>
          )}

          {type === "image" && (
            <Field label="Upload image">
              <input type="file" accept="image/*" onChange={onImageChange} />
              {form.imageUrl && (
                <img
                  src={form.imageUrl}
                  alt=""
                  style={{ marginTop: 8, maxHeight: 120, borderRadius: 8 }}
                />
              )}
            </Field>
          )}

          {type === "clock" && (
            <div className="field-row">
              <Field label="Caption (optional)">
                <input type="text" value={form.text} onChange={(e) => patch({ text: e.target.value })} />
              </Field>
              <Field label="Caption sub-text (optional)">
                <input type="text" value={form.extraValue} onChange={(e) => patch({ extraValue: e.target.value })} />
              </Field>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 8 }}>
            {mode === "add" ? (
              <button className="btn" onClick={() => setSelectedType(null)}>
                ← Back
              </button>
            ) : (
              <span />
            )}
            <button className="btn-solid" onClick={handleSave} disabled={!form.title}>
              {mode === "edit" ? "Save Changes" : "+ Add to Dashboard"}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
