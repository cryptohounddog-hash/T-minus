import React from "react";
import CountdownWidget from "./widgets/CountdownWidget.jsx";
import ClockWidget from "./widgets/ClockWidget.jsx";
import CalendarWidget from "./widgets/CalendarWidget.jsx";
import ProgressWidget from "./widgets/ProgressWidget.jsx";
import NinetyDayWidget from "./widgets/NinetyDayWidget.jsx";
import ChecklistWidget from "./widgets/ChecklistWidget.jsx";
import { QuoteWidget, TextWidget, ImageWidget } from "./widgets/MiscWidgets.jsx";

export const HEADERLESS_TYPES = new Set(["clock", "quote", "image"]);

export default function WidgetRenderer({ widget }) {
  switch (widget.type) {
    case "countdown":
      return <CountdownWidget widget={widget} />;
    case "clock":
      return <ClockWidget widget={widget} />;
    case "calendar":
      return <CalendarWidget widget={widget} />;
    case "progress":
    case "savings":
    case "reading":
    case "study":
      return <ProgressWidget widget={widget} />;
    case "ninetyday":
      return <NinetyDayWidget widget={widget} />;
    case "checklist":
      return <ChecklistWidget widget={widget} />;
    case "quote":
      return <QuoteWidget widget={widget} />;
    case "text":
      return <TextWidget widget={widget} />;
    case "image":
      return <ImageWidget widget={widget} />;
    default:
      return null;
  }
}
