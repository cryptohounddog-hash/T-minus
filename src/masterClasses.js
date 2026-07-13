// Deterministic equivalent of the original masterpiece enhancer script,
// which scanned rendered innerText with a MutationObserver to guess which
// decorative CSS class a widget should get. We have real widget.type/title
// data now, so we can assign the same classes directly and reliably.
export function getMasterWidgetClass(widget) {
  const title = (widget.title || "").toLowerCase();

  if (widget.type === "countdown") {
    if (title.includes("preaching at joshua")) return "master-countdown master-joshua";
    if (title.includes("preaching at taylortown")) return "master-countdown master-taylortown";
    if (title.includes("math exam")) return "master-countdown master-math";
    if (title.includes("youth choir")) return "master-countdown master-choir";
    if (title.includes("graduation")) return "master-countdown master-graduation";
    if (title.includes("birthday")) return "master-countdown master-birthday";
    if (title.includes("christmas")) return "master-countdown master-christmas";
    if (title.includes("course launch")) return "master-countdown master-launch";
    return "master-countdown";
  }
  if (widget.type === "ninetyday") return "master-run master-compact";
  if (widget.type === "reading") return "master-reading master-compact";
  if (widget.type === "savings") return "master-savings master-compact";
  if (widget.type === "study") return "master-study master-compact";
  if (widget.type === "checklist") {
    if (title.includes("homework progress")) return "master-homework master-compact";
    return "master-checklist master-compact";
  }
  if (widget.type === "clock") return "master-clock";
  if (widget.type === "calendar") return "master-calendar";
  return "";
}
