import React from "react";

export function QuoteWidget({ widget }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 12px", gap: 8 }}>
      <span style={{ fontSize: 22, color: "var(--accent)" }}>❝</span>
      <p style={{ fontSize: 13.5, fontStyle: "italic", color: "rgba(255,255,255,0.85)", lineHeight: 1.4 }}>{widget.text}</p>
      {widget.author && <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>— {widget.author}</p>}
    </div>
  );
}

export function TextWidget({ widget }) {
  return (
    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, whiteSpace: "pre-line" }}>
      {widget.text}
    </p>
  );
}

export function ImageWidget({ widget }) {
  if (!widget.imageUrl) {
    return (
      <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
        No image set
      </div>
    );
  }
  return <img src={widget.imageUrl} alt={widget.title} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12 }} />;
}
