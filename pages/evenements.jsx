// pages/evenements.jsx — BILINGUE FR/EN (version finale avec traductions complètes)
import Layout from "../components/Layout";
import evenements from "../data/evenements";
import { useRouter } from "next/router";

// ── TEXTES FR / EN ──────────────────────────────────────────────────────────
const TEXTES = {
  fr: {
    tag:     "Agenda",
    titre:   "ÉVÉNEMENTS",
    empty:   "Aucun événement pour le moment.",
    suivre:  "Suivre",
  },
  en: {
    tag:     "Schedule",
    titre:   "EVENTS",
    empty:   "No events at the moment.",
    suivre:  "Follow",
  },
};

export default function Evenements() {
  const { locale } = useRouter();
  const t = TEXTES[locale] || TEXTES.fr;

  return (
    <Layout title={t.titre} description="Prochains événements de Génération 7000.">

      {/* En-tête avec photo de fond */}
      <section className="py-28 px-6 relative"
        style={{
          backgroundImage:    "url('/images/empowher.jpg')",
          backgroundSize:     "cover",
          backgroundPosition: "center",
        }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="font-body text-white text-xs tracking-[0.4em] uppercase mb-4">{t.tag}</p>
          <h1 className="font-display text-6xl md:text-8xl text-white tracking-wider">{t.titre}</h1>
        </div>
      </section>

      {/* Liste des événements */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="space-y-6">
          {evenements.map((evt) => (
            <article key={evt.id}
              className="flex flex-col md:flex-row bg-white border border-gray-100 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-0.5 group">

              {/* Bande date */}
              <div className="bg-ink text-white flex flex-col items-center justify-center px-10 py-8 min-w-[130px]">
                <span className="font-display text-4xl leading-none">
                  {new Date(evt.date).getDate()}
                </span>
                <span className="font-body text-gray-400 text-xs tracking-widest uppercase mt-1">
                  {new Date(evt.date).toLocaleDateString(
                    locale === "en" ? "en-US" : "fr-FR",
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
                  alt={locale === "en" && evt.titre_en ? evt.titre_en : evt.titre}
                  className="w-full md:w-48 h-52 object-cover"
                />
              )}

              {/* Contenu */}
              <div className="p-8 flex-1">
                <div className="flex flex-wrap gap-4 mb-3 text-xs font-body tracking-wider text-gray-400 uppercase">
                  <span>⏰ {evt.heure}</span>
                  <span>📍 {locale === "en" && evt.lieu_en ? evt.lieu_en : evt.lieu}</span>
                </div>

                <h2 className="font-display text-2xl md:text-3xl text-ink tracking-wide mb-4 group-hover:text-ink-soft transition-colors">
                  {locale === "en" && evt.titre_en ? evt.titre_en : evt.titre}
                </h2>

                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {locale === "en" && evt.description_en ? evt.description_en : evt.description}
                </p>

                {evt.lienInscription && evt.lienInscription !== "#" && (
                  <a
                    href={evt.lienInscription}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-ink text-white font-body font-semibold text-xs tracking-widest uppercase px-6 py-3 hover:bg-ink-light transition-all">
                    {t.suivre}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {evenements.length === 0 && (
          <p className="text-center text-gray-400 font-body py-20">{t.empty}</p>
        )}
      </section>
    </Layout>
  );
}