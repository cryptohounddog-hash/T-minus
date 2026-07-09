import type { Widget } from '../../types';
import CountdownWidget from './CountdownWidget';
import ClockWidget from './ClockWidget';
import CalendarWidget from './CalendarWidget';
import ProgressWidget from './ProgressWidget';
import NinetyDayWidget from './NinetyDayWidget';
import ChecklistWidget from './ChecklistWidget';
import { QuoteWidget, TextWidget, ImageWidget } from './MiscWidgets';

export default function WidgetRenderer({ widget }: { widget: Widget }) {
  switch (widget.type) {
    case 'countdown':
      return <CountdownWidget widget={widget} />;
    case 'clock':
      return <ClockWidget widget={widget} />;
    case 'calendar':
      return <CalendarWidget widget={widget} />;
    case 'progress':
    case 'savings':
    case 'reading':
    case 'study':
      return <ProgressWidget widget={widget} />;
    case 'ninetyday':
      return <NinetyDayWidget widget={widget} />;
    case 'checklist':
      return <ChecklistWidget widget={widget} />;
    case 'quote':
      return <QuoteWidget widget={widget} />;
    case 'text':
      return <TextWidget widget={widget} />;
    case 'image':
      return <ImageWidget widget={widget} />;
    default:
      return null;
  }
}
