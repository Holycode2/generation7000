// pages/g7k-united/index.jsx — LES PÔLES DE TALENTS — BILINGUE FR/EN
import Layout from "../../components/Layout";
import talents from "../../data/talents";
import siteConfig from "../../data/siteConfig";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  SparklesIcon,
  MicrophoneIcon,
  MusicalNoteIcon,
  PaintBrushIcon,
  TicketIcon,
  TrophyIcon,
  VideoCameraIcon,
  PencilIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const ACCENT = "#980000";

// Clés utilisables dans le champ `icone` de data/talents.js
const ICONES = {
  danse:    SparklesIcon,
  chant:    MicrophoneIcon,
  musique:  MusicalNoteIcon,
  dessin:   PaintBrushIcon,
  theatre:  TicketIcon,
  sport:    TrophyIcon,
  medias:   VideoCameraIcon,
  ecriture: PencilIcon,
};

const TEXTES = {
  fr: {
    tag:        "Les talents",
    titre:      "G7K UNITED",
    accroche:   "Nous formons des ouvriers pour la moisson et développons leurs talents avec soin.",
    introTag:   "Un corps, plusieurs membres",
    introTitre: "TROUVE TA PLACE",
    introTexte: " Tu n'as pas besoin d'être un expert, viens avec ce que tu as.",
    decouvrir:  "Découvrir les departement→",
    membres:    (n) => (n > 1 ? `${n} membres` : `${n} membre`),
    ctaTitre:   "REJOINDRE UN PÔLE",
    ctaTexte:   "Dis-nous quel talent tu veux mettre au service de la maison, nous te mettrons en lien avec le responsable du departement.",
    ctaBtn:     "Nous contacter",
    empty:      "Les pôles seront bientôt annoncés.",
  },
  en: {
    tag:        "The talents",
    titre:      "G7K UNITED",
    accroche:   "We train workers for the harvest and carefully develop their gifts.",
    introTag:   "One body, many members",
    introTitre: "FIND YOUR PLACE",
    introTexte: " You don't need to be an expert: come as you are.",
    decouvrir:  "Discover this team →",
    membres:    (n) => (n > 1 ? `${n} members` : `${n} member`),
    ctaTitre:   "JOIN A TEAM",
    ctaTexte:   "Tell us which talent you would like to put at the service of the house, and we will connect you with the team lead.",
    ctaBtn:     "Contact us",
    empty:      "The teams will be announced soon.",
  },
};

export default function G7kUnited() {
  const { locale } = useRouter();
  const t = TEXTES[locale] || TEXTES.fr;
  const isEn = locale === "en";

  return (
    <Layout
      title={t.titre}
      description={t.accroche.replace("[Texte à remplacer] ", "").replace("[Text to replace] ", "")}
      image="/images/IMG_4731.png"
      url="https://g7kministries.online/g7k-united"
    >

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="py-28 px-6 relative"
        style={{
          backgroundImage:    "url('/images/IMG_4733.png')", // [Image à remplacer]
          backgroundSize:     "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="font-body text-white text-xs tracking-[0.4em] uppercase mb-4">{t.tag}</p>
          <h1 className="font-display text-6xl md:text-8xl text-white tracking-wider mb-6">{t.titre}</h1>
          <p className="font-body text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">
            {t.accroche}
          </p>
        </div>
      </section>

      {/* ── INTRO ────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-body text-gray-400 text-xs tracking-[0.4em] uppercase mb-4">{t.introTag}</p>
          <h2 style={{ color: ACCENT }} className="font-display text-4xl md:text-5xl tracking-wider">
            {t.introTitre}
          </h2>
          <div className="divider-ink" />
          <p className="font-body text-gray-600 leading-relaxed text-lg">{t.introTexte}</p>
        </div>
      </section>

      {/* ── GRILLE DES PÔLES ─────────────────────────────── */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {talents.length === 0 ? (
            <p className="text-center text-gray-400 font-body py-20">{t.empty}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {talents.map((pole) => {
                const Icone       = ICONES[pole.icone] || StarIcon;
                const nom         = isEn && pole.nom_en         ? pole.nom_en         : pole.nom;
                const categorie   = isEn && pole.categorie_en   ? pole.categorie_en   : pole.categorie;
                const description = isEn && pole.description_en ? pole.description_en : pole.description;
                const nbMembres   = pole.artistes?.length || 0;

                return (
                  <Link
                    key={pole.id}
                    href={`/g7k-united/${pole.slug}`}
                    className="flex flex-col bg-white border border-gray-100 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 group overflow-hidden"
                  >
                    {/* Visuel + icône */}
                    <div className="relative h-52 bg-ash-dark overflow-hidden">
                      {pole.image && (
                        <img
                          src={pole.image}
                          alt={nom}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div
                        className="absolute top-4 left-4 w-11 h-11 flex items-center justify-center backdrop-blur-sm"
                        style={{ backgroundColor: ACCENT }}
                      >
                        <Icone className="w-5 h-5 text-white" />
                      </div>
                      {categorie && (
                        <p className="absolute bottom-4 left-5 font-body text-white/80 text-xs tracking-[0.3em] uppercase">
                          {categorie}
                        </p>
                      )}
                    </div>

                    {/* Contenu */}
                    <div className="p-7 flex flex-col flex-1">
                      <h3 className="font-display text-2xl text-ink tracking-wide mb-3 group-hover:text-ink-soft transition-colors">
                        {nom}
                      </h3>
                      <p className="font-body text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                        {description}
                      </p>

                      <div className="flex items-center justify-between gap-4">
                        <span
                          style={{ color: ACCENT }}
                          className="font-body text-xs tracking-widest uppercase border-b border-gray-200 group-hover:border-current pb-0.5 transition-colors"
                        >
                          {t.decouvrir}
                        </span>
                        {nbMembres > 0 && (
                          <span className="font-body text-gray-400 text-xs">{t.membres(nbMembres)}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-ink text-center">
        <div className="max-w-xl mx-auto">
          <h3 className="font-display text-4xl text-white tracking-wider mb-4">{t.ctaTitre}</h3>
          <p className="font-body text-gray-400 leading-relaxed mb-8">{t.ctaTexte}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-[#980000] text-white font-body font-semibold text-xs tracking-widest uppercase px-8 py-4 hover:bg-ink-light transition-all"
            >
              {t.ctaBtn}
            </Link>
            <a
              href={siteConfig.reseaux.instagram2.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/30 text-white font-body text-xs tracking-widest uppercase px-8 py-4 hover:bg-white hover:text-ink transition-all"
            >
              @g7k_united
            </a>
          </div>
        </div>
      </section>

    </Layout>
  );
}
