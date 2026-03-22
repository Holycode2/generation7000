// pages/leaders/index.jsx — ORGANIGRAMME BILINGUE FR/EN
import Layout from "../../components/Layout";
import leaders from "../../data/leaders";
import Link from "next/link";
import { useRouter } from "next/router";

// ── TEXTES FR / EN ──────────────────────────────────────────────────────────
const TEXTES = {
  fr: {
    tag:    "Structure du ministère",
    titre:  "NOS LEADERS",
    legende: [
      { label: "Berger Principal",        color: "bg-ink" },
      { label: "Administrateur Général",  color: "bg-gray-500" },
      { label: "Responsable département", color: "bg-gray-300" },
    ],
  },
  en: {
    tag:    "Ministry structure",
    titre:  "OUR LEADERS",
    legende: [
      { label: "Senior Pastor",         color: "bg-ink" },
      { label: "General Administrator", color: "bg-gray-500" },
      { label: "Department Head",       color: "bg-gray-300" },
    ],
  },
};

// Sépare les leaders par niveau
const niveau1 = leaders.filter(l => l.niveau === 1);
const niveau2 = leaders.filter(l => l.niveau === 2);
const niveau3 = leaders.filter(l => l.niveau === 3);

// Carte d'un leader
function LeaderCard({ leader, size = "normal", locale }) {
  const isLarge  = size === "large";
  const isMedium = size === "medium";

  // Utilise le nom/rôle en anglais si disponible
  const nom  = locale === "en" && leader.nom_en  ? leader.nom_en  : leader.nom;
  const role = locale === "en" && leader.role_en ? leader.role_en : leader.role;

  return (
    <Link href={`/leaders/${leader.slug}`}
      className="group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1">

      {/* Photo */}
      <div className={`
        overflow-hidden bg-gray-100 mb-4 border-2 border-transparent group-hover:border-ink transition-all duration-300
        ${isLarge ? "w-36 h-36 rounded-full" : isMedium ? "w-24 h-24 rounded-full" : "w-20 h-20 rounded-full"}
      `}>
        {leader.photo ? (
          <img src={leader.photo} alt={nom}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.style.display='none'; }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className={`font-display text-gray-400 ${isLarge ? "text-3xl" : "text-xl"}`}>
              {nom.split(" ").map(w => w[0]).join("").slice(0, 2)}
            </span>
          </div>
        )}
      </div>

      {/* Nom et rôle */}
      <p className={`font-display text-ink tracking-wider group-hover:text-ink-soft transition-colors leading-tight mb-1
        ${isLarge ? "text-xl" : isMedium ? "text-base" : "text-sm"}`}>
        {nom.toUpperCase()}
      </p>
      <p className={`font-body text-gray-400 italic ${isLarge ? "text-sm" : "text-xs"}`}>
        {role}
      </p>
    </Link>
  );
}

export default function Leaders() {
  const { locale } = useRouter();
  const t = TEXTES[locale] || TEXTES.fr;

  return (
    <Layout title={t.titre} description="Organigramme de Génération 7000.">

      {/* En-tête avec photo de fond */}
      <section className="py-28 px-6 relative"
        style={{
          backgroundImage:    "url('/images/w.jpg')",
          backgroundSize:     "cover",
          backgroundPosition: "center",
        }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="font-body text-white text-xs tracking-[0.4em] uppercase mb-4">{t.tag}</p>
          <h1 className="font-display text-6xl md:text-8xl text-white tracking-wider">{t.titre}</h1>
        </div>
      </section>

      {/* ORGANIGRAMME */}
      <section className="py-20 px-6 max-w-5xl mx-auto">

        {/* NIVEAU 1 */}
        <div className="flex flex-col items-center mb-0">
          {niveau1.map(l => (
            <LeaderCard key={l.slug} leader={l} size="large" locale={locale} />
          ))}
        </div>

        {/* Connecteur 1 → 2 */}
        <div className="flex flex-col items-center my-6">
          <div className="w-px h-12 bg-gray-300" />
          <div className="w-2 h-2 rounded-full bg-gray-400" />
        </div>

        {/* NIVEAU 2 */}
        <div className="flex justify-center mb-0">
          {niveau2.map(l => (
            <LeaderCard key={l.slug} leader={l} size="medium" locale={locale} />
          ))}
        </div>

        {/* Branches vers niveau 3 */}
        <div className="flex flex-col items-center my-6">
          <div className="w-px h-8 bg-gray-300" />
          <div className="relative w-full max-w-3xl">
            <div className="h-px bg-gray-300 w-full" />
            <div className="absolute top-0 left-0 w-full flex justify-around">
              {niveau3.map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-gray-400 -mt-1" />
                  <div className="w-px h-8 bg-gray-300" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-6" />

        {/* NIVEAU 3 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {niveau3.map(l => (
            <LeaderCard key={l.slug} leader={l} size="small" locale={locale} />
          ))}
        </div>

        {/* Légende */}
        <div className="mt-20 pt-10 border-t border-gray-100 flex flex-wrap gap-8 justify-center">
          {t.legende.map(({ label, color }) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${color}`} />
              <span className="font-body text-gray-500 text-xs tracking-wide">{label}</span>
            </div>
          ))}
        </div>

      </section>
    </Layout>
  );
}