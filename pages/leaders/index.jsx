// pages/leaders/index.jsx — ORGANIGRAMME BILINGUE FR/EN
import Layout from "../../components/Layout";
import leaders from "../../data/leaders";
import Link from "next/link";
import { useTranslation } from "../../hooks/useTranslation";

const ACCENT = "#980000";

const COULEUR_NIVEAU = { 1: ACCENT, 2: "#011224", 3: "#D1D5DB" };
const couleurDe = (niveau) => COULEUR_NIVEAU[niveau] || "#D1D5DB";

const niveauxPresents = [...new Set(leaders.map((l) => l.niveau || 99))].sort((a, b) => a - b);

function LeaderCard({ leader, taille = "small", locale, t }) {
  const nom  = locale === "en" && leader.nom_en  ? leader.nom_en  : leader.nom;
  const role = locale === "en" && leader.role_en ? leader.role_en : leader.role;

  const dimensions = {
    large:  "w-32 h-32 md:w-36 md:h-36",
    medium: "w-24 h-24 md:w-28 md:h-28",
    small:  "w-20 h-20 md:w-24 md:h-24",
  }[taille];

  const tailleNom = {
    large:  "text-lg md:text-xl",
    medium: "text-base md:text-lg",
    small:  "text-sm md:text-base",
  }[taille];

  const couleur = couleurDe(leader.niveau);

  return (
    <Link
      href={`/leaders/${leader.slug}`}
      className="group flex flex-row md:flex-col items-center gap-5 md:gap-0 md:text-center bg-white border border-gray-100 md:border-0 p-4 md:p-0 card-shadow md:shadow-none transition-transform duration-300 md:hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      style={{ outlineColor: couleur }}
    >
      <span
        className={`relative shrink-0 rounded-full overflow-hidden bg-ash-dark ${dimensions} md:mb-5`}
        style={{ boxShadow: `0 0 0 2px #fff, 0 0 0 4px ${couleur}` }}
      >
        {leader.photo ? (
          <img
            src={leader.photo}
            alt={nom}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center font-display text-2xl text-gray-400">
            {nom.split(" ").map((w) => w[0]).join("").slice(0, 2)}
          </span>
        )}
      </span>

      <span className="block">
        <span className={`block font-display text-ink tracking-wider leading-tight mb-1 ${tailleNom}`}>
          {nom.toUpperCase()}
        </span>
        <span className="block font-accent italic text-gray-500 text-xs md:text-sm">{role}</span>
        <span
          className="hidden md:block font-body text-[10px] tracking-[0.2em] uppercase mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: couleur }}
        >
          {t.leaders.bio}
        </span>
      </span>
    </Link>
  );
}

function Rangee({ items, taille, locale, t, label, premiere }) {
  const n = items.length;
  const inset = `${100 / (2 * n)}%`;

  return (
    <div>
      {!premiere && (
        <div aria-hidden="true">
          <span className="block w-px h-10 bg-gray-200 mx-auto" />
          {n > 1 && (
            <div className="relative hidden md:block h-10">
              <span className="absolute top-0 h-px bg-gray-200" style={{ left: inset, right: inset }} />
              <div className="absolute inset-0 flex">
                {items.map((l) => (
                  <span key={l.slug} className="flex-1 basis-0 flex justify-center">
                    <span className="w-px h-full bg-gray-200" />
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {label && (
        <p className="font-body text-gray-400 text-[10px] tracking-[0.35em] uppercase text-center mb-6">
          {label}
        </p>
      )}

      <ul role="list" className="flex flex-col md:flex-row gap-4 md:gap-6">
        {items.map((l) => (
          <li key={l.slug} className="md:flex-1 md:basis-0 flex md:justify-center">
            <LeaderCard leader={l} taille={taille} locale={locale} t={t} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Leaders() {
  const { t, locale } = useTranslation();
  const l = t.leaders;

  return (
    <Layout title={l.title} description={t.meta.leadersDesc}>

      <section className="py-28 px-6 relative"
        style={{
          backgroundImage:    "url('/images/w.jpg')",
          backgroundSize:     "cover",
          backgroundPosition: "center",
        }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="font-body text-white text-xs tracking-[0.4em] uppercase mb-4">{l.tag}</p>
          <h1 className="font-display text-6xl md:text-8xl text-white tracking-wider mb-5">{l.title}</h1>
          <p className="font-body text-white/70 text-base leading-relaxed max-w-xl">{l.intro}</p>
        </div>
      </section>

      <section className="py-20 px-6 max-w-5xl mx-auto">
        {niveauxPresents.map((niveau, i) => (
          <Rangee
            key={niveau}
            items={leaders.filter((item) => (item.niveau || 99) === niveau)}
            taille={i === 0 ? "large" : i === 1 ? "medium" : "small"}
            locale={locale}
            t={t}
            label={l.niveaux[niveau]}
            premiere={i === 0}
          />
        ))}

        <div className="mt-20 pt-10 border-t border-gray-100 flex flex-wrap gap-8 justify-center">
          {niveauxPresents.map((niveau) => (
            <span key={niveau} className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: couleurDe(niveau) }} />
              <span className="font-body text-gray-500 text-xs tracking-wide">
                {l.niveaux[niveau] || t.common.level(niveau)}
              </span>
            </span>
          ))}
        </div>
      </section>
    </Layout>
  );
}
