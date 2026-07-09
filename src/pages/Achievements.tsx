import { useStore } from '../store/useStore';
import { formatFriendlyDate } from '../utils/date';

export default function Achievements() {
  const { achievements } = useStore();
  const unlocked = achievements.filter((a) => a.unlocked);
  const locked = achievements.filter((a) => !a.unlocked);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2 text-[12.5px] text-white/55">
        <span className="font-display font-bold" style={{ color: 'var(--accent)' }}>
          {unlocked.length}/{achievements.length}
        </span>
        unlocked
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))' }}>
        {[...unlocked, ...locked].map((a) => (
          <div
            key={a.id}
            className="panel rounded-2xl p-4 flex flex-col gap-2"
            style={{ opacity: a.unlocked ? 1 : 0.45, borderColor: a.unlocked ? 'color-mix(in srgb, var(--accent) 45%, transparent)' : undefined }}
          >
            <div className="text-2xl">{a.unlocked ? a.icon : '🔒'}</div>
            <div className="text-[13px] font-display font-bold">{a.title}</div>
            <div className="text-[11px] text-white/45 leading-snug">{a.description}</div>
            {a.unlocked && a.date && <div className="text-[10px] text-white/30 mt-auto pt-1">Unlocked {formatFriendlyDate(a.date)}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
