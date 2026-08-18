// pages/medias.jsx — MÉDIAS & RÉSEAUX — BILINGUE FR/EN
import Link from "next/link";
import Layout from "../components/Layout";
import IconeReseau from "../components/IconeReseau";
import Remnant from "../components/Remnant";
import { comptesParPlateforme, comptesVedettes, tousLesComptes } from "../data/medias";
import { useTranslation } from "../hooks/useTranslation";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

const ACCENT = "#980000";

const PLATEFORMES = {
  instagram: {
    titreKey: "instagram",
    ctaKey:   "suivre",
    accent:   "from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]",
    fond:     "bg-gradient-to-br from-[#833AB4]/10 via-[#FD1D1D]/5 to-[#FCAF45]/10",
    bordure:  "group-hover:border-[#833AB4]/30",
  },
  youtube: {
    titreKey: "youtube",
    ctaKey:   "abonner",
    accent:   "from-[#FF0000] to-[#CC0000]",
    fond:     "bg-red-50",
    bordure:  "group-hover:border-red-200",
  },
  facebook: {
    titreKey: "facebook",
    ctaKey:   "suivre",
    accent:   "from-[#1877F2] to-[#0d65d9]",
    fond:     "bg-blue-50",
    bordure:  "group-hover:border-blue-200",
  },
};

function comptesSection(liste) {
  return liste.filter((c) => !c.featured);
}

function texte(compte, isEn, champ) {
  const cle = isEn ? `${champ}_en` : champ;
  return compte[cle] || compte[champ] || "";
}

function CarteVedette({ compte, cta, isEn }) {
  const style = PLATEFORMES[compte.plateforme] || PLATEFORMES.instagram;
  const role = texte(compte, isEn, "role");
  const description = texte(compte, isEn, "description");

  return (
    <a
      href={compte.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col md:flex-row overflow-hidden bg-white border border-gray-100 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 ${style.bordure}`}
    >
      {/* Bandeau latéral avec dégradé de la plateforme */}
      <div className={`relative md:w-44 lg:w-52 shrink-0 ${style.fond} flex items-center justify-center p-10 md:p-8`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${style.accent} opacity-[0.08] group-hover:opacity-[0.14] transition-opacity`} />
        <div className="relative w-16 h-16 rounded-2xl bg-ink text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
          <IconeReseau nom={compte.plateforme} className="w-8 h-8" />
        </div>
      </div>

      <div className="flex flex-col flex-1 p-8 md:p-10">
        {role && (
          <p className="font-body text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: ACCENT }}>
            {role}
          </p>
        )}
        <h3 className="font-display text-3xl md:text-4xl text-ink tracking-wide mb-3 group-hover:text-ink-soft transition-colors">
          {compte.label}
        </h3>
        {description && (
          <p className="font-body text-gray-500 text-sm leading-relaxed flex-1 mb-6 max-w-lg">
            {description}
          </p>
        )}
        <span className="inline-flex items-center gap-2 font-body font-semibold text-xs tracking-widest uppercase text-ink group-hover:gap-3 transition-all">
          {cta}
          <ArrowUpRightIcon className="w-4 h-4" style={{ color: ACCENT }} />
        </span>
      </div>
    </a>
  );
}

function CarteCompte({ compte, cta, isEn }) {
  const style = PLATEFORMES[compte.plateforme] || PLATEFORMES.instagram;
  const role = texte(compte, isEn, "role");
  const description = texte(compte, isEn, "description");

  return (
    <a
      href={compte.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col h-full bg-white border border-gray-100 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden ${style.bordure}`}
    >
      {/* Fine barre de couleur en haut */}
      <div className={`h-1 w-full bg-gradient-to-r ${style.accent}`} />

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="w-11 h-11 rounded-xl bg-ash flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-white transition-colors duration-300">
            <IconeReseau nom={compte.plateforme} className="w-5 h-5" />
          </div>
          <ArrowUpRightIcon className="w-4 h-4 text-gray-300 group-hover:text-ink transition-colors shrink-0 mt-1" />
        </div>

        {role && (
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-2">
            {role}
          </p>
        )}
        <h3 className="font-display text-2xl text-ink tracking-wide mb-3 leading-none">
          {compte.label}
        </h3>
        {description && (
          <p className="font-body text-gray-500 text-sm leading-relaxed flex-1 mb-6">
            {description}
          </p>
        )}

        <span
          className="inline-flex items-center gap-1.5 font-body font-semibold text-[11px] tracking-widest uppercase mt-auto"
          style={{ color: ACCENT }}
        >
          {cta}
          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </span>
      </div>
    </a>
  );
}

function SectionPlateforme({ plateforme, comptes, t, isEn }) {
  if (!comptes.length) return null;

  const style = PLATEFORMES[plateforme];
  const titre = t.medias[style.titreKey];
  const cta = t.medias[style.ctaKey];

  return (
    <section aria-labelledby={`section-${plateforme}`}>
      <div className="flex items-end justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${style.accent} text-white flex items-center justify-center shadow-sm`}>
            <IconeReseau nom={plateforme} className="w-6 h-6" />
          </div>
          <div>
            <h2 id={`section-${plateforme}`} className="font-display text-3xl text-ink tracking-wider">
              {titre.toUpperCase()}
            </h2>
            <p className="font-body text-gray-400 text-xs tracking-widest uppercase mt-1">
              {comptes.length} {comptes.length > 1 ? (isEn ? "accounts" : "comptes") : (isEn ? "account" : "compte")}
            </p>
          </div>
        </div>
        <div className="hidden sm:block flex-1 h-px bg-gray-100 mb-3" />
      </div>

      <div className={`grid gap-5 ${
        comptes.length === 1
          ? "grid-cols-1 max-w-md"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      }`}>
        {comptes.map((compte) => (
          <CarteCompte key={compte.cle} compte={compte} cta={cta} isEn={isEn} />
        ))}
      </div>
    </section>
  );
}

export default function Medias() {
  const { t, locale } = useTranslation();
  const isEn = locale === "en";
  const m = t.medias;

  const comptes = tousLesComptes();
  const vedettes = comptesVedettes();
  const instagram = comptesSection(comptesParPlateforme("instagram"));
  const youtube = comptesSection(comptesParPlateforme("youtube"));
  const facebook = comptesSection(comptesParPlateforme("facebook"));
  const nbPlateformes = [instagram, youtube, facebook].filter((g) => g.length > 0).length;

  return (
    <Layout
      title={m.title.replace("\n", " ")}
      description={m.subtitle}
      image="/images/IMG_4731.png"
      url="https://g7kministries.online/medias"
    >

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="py-28 md:py-32 px-6 relative"
        style={{
          backgroundImage:    "url('/images/IMG_4731.png')",
          backgroundSize:     "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="flex items-center gap-3 font-body text-white/60 text-xs tracking-[0.4em] uppercase mb-5">
            <Remnant tone="light" />
            {m.tag}
          </p>
          <h1
            className="font-display text-6xl md:text-8xl text-white tracking-wider mb-5"
            style={{ whiteSpace: "pre-line" }}
          >
            {m.title}
          </h1>
          <p className="font-body text-white/70 text-base md:text-lg leading-relaxed max-w-xl">
            {m.subtitle}
          </p>
        </div>
      </section>

      {/* ── CHIFFRES CLÉS ────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-ash/40">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <p className="font-display text-4xl text-ink leading-none">{nbPlateformes}</p>
            <p className="font-body text-gray-500 text-xs tracking-widest uppercase mt-2">{m.plateformes}</p>
          </div>
          <div>
            <p className="font-display text-4xl text-ink leading-none">{comptes.length}</p>
            <p className="font-body text-gray-500 text-xs tracking-widest uppercase mt-2">{m.comptes}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-4xl leading-none" style={{ color: ACCENT }}>
              {comptesParPlateforme("instagram").length}
            </p>
            <p className="font-body text-gray-500 text-xs tracking-widest uppercase mt-2">
              {m.instagram}
            </p>
          </div>
        </div>
      </section>

      {/* ── COMPTES VEDETTES ─────────────────────────────── */}
      {vedettes.length > 0 && (
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="font-body text-[10px] tracking-[0.35em] uppercase mb-2" style={{ color: ACCENT }}>
              {m.vedette}
            </p>
            <h2 className="font-display text-4xl text-ink tracking-wider">
              {isEn ? "MAIN CHANNELS" : "COMPTES PRINCIPAUX"}
            </h2>
          </div>
          <div className="space-y-5">
            {vedettes.map((compte) => (
              <CarteVedette
                key={compte.cle}
                compte={compte}
                cta={t.medias[PLATEFORMES[compte.plateforme]?.ctaKey || "suivre"]}
                isEn={isEn}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── INSTAGRAM ────────────────────────────────────── */}
      <section className="py-20 px-6 max-w-5xl mx-auto border-t border-gray-100">
        <SectionPlateforme plateforme="instagram" comptes={instagram} t={t} isEn={isEn} />
      </section>

      {/* ── YOUTUBE & FACEBOOK ───────────────────────────── */}
      {(youtube.length > 0 || facebook.length > 0) && (
        <section className="py-20 px-6 max-w-5xl mx-auto border-t border-gray-100 space-y-20">
          {youtube.length > 0 && (
            <SectionPlateforme plateforme="youtube" comptes={youtube} t={t} isEn={isEn} />
          )}
          {facebook.length > 0 && (
            <SectionPlateforme plateforme="facebook" comptes={facebook} t={t} isEn={isEn} />
          )}
        </section>
      )}

      {/* ── APPEL À L'ACTION ─────────────────────────────── */}
      <section className="bg-ink text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="flex items-center justify-center gap-3 font-body text-white/40 text-[10px] tracking-[0.4em] uppercase mb-6">
            <Remnant tone="light" />
            G7K
          </p>
          <h2 className="font-display text-4xl md:text-5xl tracking-wider mb-5">{m.ctaTitre}</h2>
          <div className="w-12 h-px bg-white/30 mx-auto mb-6" />
          <p className="font-body text-white/60 text-sm leading-relaxed max-w-md mx-auto mb-10">
            {m.ctaTexte}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#980000] text-white font-body font-semibold text-xs tracking-widest uppercase px-8 py-4 hover:bg-[#b00000] transition-colors"
          >
            {m.ctaBtn}
          </Link>
        </div>
      </section>

    </Layout>
  );
}
