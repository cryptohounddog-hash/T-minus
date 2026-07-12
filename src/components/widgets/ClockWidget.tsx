import { useNow } from '../../hooks/useNow';
import type { Widget } from '../../types';

const HOUR_MARKS = Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => {
  const angle = (hour / 12) * 2 * Math.PI - Math.PI / 2;
  const r = 38;
  return { hour, x: 50 + r * Math.cos(angle), y: 50 + r * Math.sin(angle) };
});

export default function ClockWidget({ widget }: { widget: Widget }) {
  const now = useNow();
  const d = new Date(now);
  const h24 = d.getHours();
  const m = d.getMinutes();
  const s = d.getSeconds();
  const h12 = h24 % 12;

  const hourAngle = (h12 + m / 60) * 30;
  const minAngle = (m + s / 60) * 6;

  const timeStr = d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
  const [time, ampm] = timeStr.split(' ');

  return (
    <div className="h-full flex flex-col items-center justify-center gap-3 px-3 py-2">
      <div
        className="relative rounded-full flex items-center justify-center shrink-0"
        style={{
          width: 'min(200px, 92%)',
          aspectRatio: '1/1',
          background: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.04), transparent 70%)',
          border: '2px solid color-mix(in srgb, var(--accent) 55%, transparent)',
          boxShadow: '0 0 30px -6px color-mix(in srgb, var(--accent) 55%, transparent), inset 0 0 20px -8px color-mix(in srgb, var(--accent-3) 60%, transparent)',
        }}
      >
        <div
          className="absolute top-[6px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
          style={{ background: 'var(--accent-2)', boxShadow: '0 0 8px var(--accent-2)' }}
        />
        {HOUR_MARKS.map(({ hour, x, y }) => (
          <div
            key={hour}
            className="absolute text-[10px] text-white/55 font-display font-semibold"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%,-50%)',
            }}
          >
            {hour}
          </div>
        ))}
        {/* hour hand */}
        <div
          className="absolute bottom-1/2 left-1/2 origin-bottom rounded-full"
          style={{
            width: 3,
            height: '24%',
            background: 'var(--accent-2)',
            transform: `translateX(-50%) rotate(${hourAngle}deg)`,
            boxShadow: '0 0 6px var(--accent-2)',
          }}
        />
        {/* minute hand */}
        <div
          className="absolute bottom-1/2 left-1/2 origin-bottom rounded-full"
          style={{
            width: 2,
            height: '33%',
            background: 'var(--accent)',
            transform: `translateX(-50%) rotate(${minAngle}deg)`,
            boxShadow: '0 0 6px var(--accent)',
          }}
        />
        <div className="w-2 h-2 rounded-full z-10" style={{ background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }} />
      </div>

      <div className="text-center">
        <div className="font-display font-black tabular text-[19px] glow-text" style={{ color: 'var(--accent)' }}>
          {time} <span className="text-[11px] text-white/50">{ampm}</span>
        </div>
      </div>

      {widget.text && (
        <div className="text-center px-2">
          <div className="text-[11px] font-display font-bold tracking-wide" style={{ color: 'var(--accent-2)' }}>
            ✦ {widget.text} ✦
          </div>
          {widget.extraValue && <div className="text-[10px] text-white/40 mt-0.5">{widget.extraValue}</div>}
        </div>
      )}
    </div>
  );
}
