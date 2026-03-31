// pages/cultes/[slug].jsx — PAGE INDIVIDUELLE D'UN CULTE — BILINGUE FR/EN
import Layout from "../../components/Layout";
import cultes from "../../data/cultes";
import leaders from "../../data/leaders";
import Link from "next/link";
import { ClockIcon, MapPinIcon, UserIcon, LightBulbIcon } from '@heroicons/react/24/outline';

const TEXTES = {
  fr: {
    retour:       "← Retour au programme",
    heure:        "Heure",
    lieu:         "Lieu",
    responsable:  "Responsable",
    rejoindre:    "REJOINDRE LE CULTE",
    btnMeet:      "Ouvrir Google Meet",
    verset:       "Verset du culte",
    description:  "À propos de ce culte",
    notes:        "Note",
  },
  en: {
    retour:       "← Back to schedule",
    heure:        "Time",
    lieu:         "Location",
    responsable:  "Led by",
    rejoindre:    "JOIN THE SERVICE",
    btnMeet:      "Open Google Meet",
    verset:       "Scripture",
    description:  "About this service",
    notes:        "Note",
  },
};

export async function getStaticPaths() {
  const locales = ["fr", "en"];
  const paths = [];
  cultes.forEach(c => {
    locales.forEach(locale => {
      paths.push({ params: { slug: c.slug }, locale });
    });
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale }) {
  const culte = cultes.find(c => c.slug === params.slug) || null;
  return { props: { culte, locale: locale || "fr" } };
}

export default function CultePage({ culte, locale }) {
  const t = TEXTES[locale] || TEXTES.fr;
  if (!culte) return null;

  const type        = locale === "en" && culte.type_en        ? culte.type_en        : culte.type;
  const lieu        = locale === "en" && culte.lieu_en        ? culte.lieu_en        : culte.lieu;
  const description = locale === "en" && culte.description_en ? culte.description_en : culte.description;
  const verset      = locale === "en" && culte.verset_en      ? culte.verset_en      : culte.verset;
  const notes       = locale === "en" && culte.notes_en       ? culte.notes_en       : culte.notes;
  const responsable = locale === "en" && culte.responsable_en ? culte.responsable_en : culte.responsable;

  // Trouve le leader responsable
  const leaderData = leaders.find(l => l.nom === culte.responsable || l.nom_en === culte.responsable);

  return (
    <Layout title={type}>

      {/* Retour */}
      <div className="max-w-5xl mx-auto px-6 pt-10">
        <Link href="/cultes" className="font-body text-gray-400 hover:text-ink text-xs tracking-widest uppercase transition-colors">
          {t.retour}
        </Link>
      </div>

      {/* Header avec photo */}
      <section className="py-16 px-6 relative"
        style={{ backgroundImage: `url('${culte.photo || "/images/culte.jpg"}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="font-body text-white/60 text-xs tracking-[0.4em] uppercase mb-4">
            {locale === "en" ? culte.jour === "Mardi" ? "Tuesday" : culte.jour : culte.jour}
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-white tracking-wider mb-4">{type}</h1>
          <p className="font-body text-white/70 text-lg">{culte.heure}</p>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Infos pratiques */}
          <div>
            <div className="space-y-6">

              {/* Heure - Version corrigée avec icône */}
              <div className="flex gap-5 items-start">
                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <ClockIcon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-body text-gray-400 text-xs tracking-widest uppercase mb-1">{t.heure}</p>
                  <p className="font-display text-xl text-ink">{culte.heure}</p>
                </div>
              </div>

              {/* Lieu - Version corrigée avec icône */}
              <div className="flex gap-5 items-start">
                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-body text-gray-400 text-xs tracking-widest uppercase mb-1">{t.lieu}</p>
                  <p className="font-body text-gray-700">{lieu}</p>
                </div>
              </div>

              {/* Responsable - Version corrigée avec icône */}
              <div className="flex gap-5 items-start">
                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <UserIcon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-body text-gray-400 text-xs tracking-widest uppercase mb-1">{t.responsable}</p>
                  {leaderData ? (
                    <Link href={`/leaders/${leaderData.slug}`}
                      className="font-body text-ink hover:text-gray-500 transition-colors border-b border-ink">
                      {responsable}
                    </Link>
                  ) : (
                    <p className="font-body text-gray-700">{responsable}</p>
                  )}
                </div>
              </div>

              {/* Note - Version corrigée avec icône */}
              {notes && (
                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <LightBulbIcon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-body text-gray-400 text-xs tracking-widest uppercase mb-1">{t.notes}</p>
                    <p className="font-body text-gray-600 text-sm italic">{notes}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bouton Google Meet */}
            {culte.lienMeet && (
              <div className="mt-10 p-6 bg-ash border border-gray-200">
                <h3 className="font-display text-2xl text-ink tracking-wider mb-4">{t.rejoindre}</h3>
                <a href={culte.lienMeet} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-ink text-white font-body font-semibold text-xs tracking-widest uppercase px-8 py-4 hover:bg-ink-light transition-all w-full justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff"/>
                  </svg>
                  {t.btnMeet}
                </a>
              </div>
            )}
          </div>

          {/* Description + Verset */}
          <div>
            {/* Description */}
            <h2 className="font-display text-2xl text-ink tracking-wider mb-4">{t.description}</h2>
            <div className="divider-left" />
            <p className="font-body text-gray-600 leading-relaxed mb-10">{description}</p>

            {/* Verset */}
            {verset && (
              <div className="bg-ink p-8">
                <p className="font-body text-white/50 text-xs tracking-[0.4em] uppercase mb-4">{t.verset}</p>
                <blockquote style={{color:"#980000"}}className="font-accent italic text-white/80 text-lg leading-relaxed">
                  {verset}
                </blockquote>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Retour */}
      <section className="py-12 px-6 text-center">
        <Link href="/cultes"
          className="border border-ink text-ink font-body text-xs tracking-widest uppercase px-8 py-3 hover:bg-ink hover:text-white transition-all">
          {t.retour}
        </Link>
      </section>

    </Layout>
  );
}