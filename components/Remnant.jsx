// components/Remnant.jsx
// Motif signature du site : 7 traits verticaux, un seul marqué en rouge.
// Les 7000 qui n'ont pas fléchi le genou (1 Rois 19:18).
// Rendu en <span> car il est utilisé à l'intérieur de paragraphes : un élément
// de bloc y serait déplacé par le navigateur et casserait l'hydratation.
const ACCENT = "#980000";

export default function Remnant({ marked = 4, tone = "light", className = "" }) {
  const dim = tone === "light" ? "bg-white/25" : "bg-black/20";

  return (
    <span
      className={`inline-flex items-end align-middle gap-[3px] h-4 shrink-0 ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: 7 }).map((_, i) => (
        <span
          key={i}
          className={i === marked ? "w-[3px] rounded-full" : `w-[3px] rounded-full ${dim}`}
          style={
            i === marked
              ? { height: "100%", backgroundColor: ACCENT }
              : { height: `${38 + i * 9}%` }
          }
        />
      ))}
    </span>
  );
}
