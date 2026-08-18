// pages/evenements/index.jsx — LISTE DES ÉVÉNEMENTS — BILINGUE FR/EN
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { tousTries } from "../../data/evenements";

// ── TEXTES FR / EN ──────────────────────────────────────────────────────────
const TEXTES = {
  fr: {
    tag:      "Agenda",
    titre:    "ÉVÉNEMENTS",
    intro:    "Chaque événement a sa page : programme, intervenants, enseignements et photos.",
    empty:    "Aucun événement pour le moment.",
    voir:     "Découvrir l'événement →",
    sessions: (n) => (n > 1 ? `${n} rendez-vous` : `${n} rendez-vous`),
  },
  en: {
    tag:      "Schedule",
    titre:    "EVENTS",
    intro:    "Every event has its own page: schedule, speakers, teachings and pictures.",
    empty:    "No events at the moment.",
    voir:     "Discover this event →",
    sessions: (n) => (n > 1 ? `${n} sessions` : `${n} session`),
  },
};

export default function Evenements() {
  const { locale } = useRouter();
  const t = TEXTES[locale] || TEXTES.fr;
  const isEn = locale === "en";

  // Une seule liste : les événements à venir en tête, puis les précédents.
  const liste = tousTries();

  return (
    <Layout title={t.titre} description="Prochains événements de Génération 7000.">

      {/* En-tête avec photo de fond */}
      <section className="py-28 px-6 relative"
        style={{
          backgroundImage:    "url('/images/IMG_4734.png')",
          backgroundSize:     "cover",
          backgroundPosition: "center",
        }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="font-body text-white text-xs tracking-[0.4em] uppercase mb-4">{t.tag}</p>
          <h1 className="font-display text-6xl md:text-8xl text-white tracking-wider mb-5">{t.titre}</h1>
          <p className="font-body text-white/70 text-base leading-relaxed max-w-xl">{t.intro}</p>
        </div>
      </section>

      {/* Liste des événements */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="space-y-6">
          {liste.map((evt) => (
            <Link key={evt.id} href={`/evenements/${evt.slug}`}
              className="flex flex-col md:flex-row bg-white border border-gray-100 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-0.5 group">

              {/* Bande date */}
              <div className="bg-ink text-white flex flex-col items-center justify-center px-10 py-8 min-w-[130px]">
                <span className="font-display text-4xl leading-none">
                  {new Date(evt.date).getDate()}
                </span>
                <span className="font-body text-gray-400 text-xs tracking-widest uppercase mt-1">
                  {new Date(evt.date).toLocaleDateString(
                    isEn ? "en-US" : "fr-FR",
                    { month: "short" }
                  )}
                </span>
                <span className="font-body text-gray-500 text-xs mt-1">
                  {new Date(evt.date).getFullYear()}
                </span>
              </div>

              {/* Affiche de l'événement */}
              {evt.image && (
                <img
                  src={evt.image}
                  alt={isEn && evt.titre_en ? evt.titre_en : evt.titre}
                  className="w-full md:w-48 h-52 object-cover"
                />
              )}

              {/* Contenu */}
              <div className="p-8 flex-1">
                <div className="flex flex-wrap gap-4 mb-3 text-xs font-body tracking-wider text-gray-400 uppercase">
                  {evt.heure && <span>⏰ {evt.heure}</span>}
                  <span>📍 {isEn && evt.lieu_en ? evt.lieu_en : evt.lieu}</span>
                  {(isEn && evt.theme_en ? evt.theme_en : evt.theme) && (
                    <span style={{ color: "#980000" }}>
                      ✦ {isEn && evt.theme_en ? evt.theme_en : evt.theme}
                    </span>
                  )}
                </div>

                <h2 className="font-display text-2xl md:text-3xl text-ink tracking-wide mb-4 group-hover:text-ink-soft transition-colors">
                  {isEn && evt.titre_en ? evt.titre_en : evt.titre}
                </h2>

                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {isEn && evt.description_en ? evt.description_en : evt.description}
                </p>

                <div className="flex flex-wrap items-center gap-5">
                  <span className="font-body text-gray-400 group-hover:text-ink text-xs tracking-widest uppercase transition-colors">
                    {t.voir}
                  </span>
                  {evt.sessions?.length > 0 && (
                    <span className="font-body text-gray-400 text-xs">
                      · {t.sessions(evt.sessions.length)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {liste.length === 0 && (
          <p className="text-center text-gray-400 font-body py-20">{t.empty}</p>
        )}
      </section>
    </Layout>
  );
}
