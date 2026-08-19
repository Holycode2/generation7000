// pages/apropos.jsx — VISION — BILINGUE FR/EN
import Link from "next/link";
import Layout from "../components/Layout";
import Remnant from "../components/Remnant";
import { useTranslation } from "../hooks/useTranslation";
import {
  AcademicCapIcon,
  FireIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const ACCENT = "#980000";

const VALEURS = {
  fr: [
    {
      titre: "Consécration",
      texte: "Une vie entièrement tournée vers Dieu et Son Royaume.",
      Icone: FireIcon,
    },
    {
      titre: "Formation",
      texte: "Des ouvriers équipés pour servir avec excellence.",
      Icone: AcademicCapIcon,
    },
    {
      titre: "Communauté",
      texte: "Un corps uni, où chacun trouve sa place.",
      Icone: UserGroupIcon,
    },
  ],
  en: [
    {
      titre: "Consecration",
      texte: "A life fully turned toward God and His Kingdom.",
      Icone: FireIcon,
    },
    {
      titre: "Training",
      texte: "Workers equipped to serve with excellence.",
      Icone: AcademicCapIcon,
    },
    {
      titre: "Community",
      texte: "One united body where everyone finds their place.",
      Icone: UserGroupIcon,
    },
  ],
};

const VERSET = {
  fr: {
    verset:    "« Mais je laisserai en Israël sept mille hommes, tous ceux qui n'ont point fléchi les genoux devant Baal, et dont la bouche ne l'a point baisé. »",
    versetRef: "1 Rois 19:18",
  },
  en: {
    verset:    "\"Yet I have left me seven thousand in Israel, all the knees which have not bowed unto Baal, and every mouth which hath not kissed him.\"",
    versetRef: "1 Kings 19:18",
  },
};

export default function Apropos() {
  const { t, locale } = useTranslation();
  const a = t.apropos;
  const valeurs = VALEURS[locale] || VALEURS.fr;
  const verset = VERSET[locale] || VERSET.fr;

  return (
    <Layout
      title={a.title}
      description={t.meta.aproposDesc}
      image="/images/IMG_4731.png"
      url="https://g7kministries.online/apropos"
    >

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[78vh] flex items-end overflow-hidden">
        <img
          src="/images/vision.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.target.src = "/images/IMG_4731.png"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/25" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-28 pb-16 md:pb-20">
          <p className="flex items-center gap-3 font-body text-white/60 text-xs tracking-[0.4em] uppercase mb-6">
            <Remnant tone="light" />
            {a.tag}
          </p>
          <h1 className="font-display text-6xl md:text-8xl text-white tracking-wider leading-none mb-6">
            {a.title}
          </h1>
          <p className="font-accent italic text-white/75 text-xl md:text-2xl max-w-xl">
            {a.nombreLegende}
          </p>
        </div>
      </section>

      {/* ── CHIFFRE SIGNATURE ────────────────────────────── */}
      <section className="border-b border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-10 md:py-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-display text-6xl md:text-7xl leading-none tracking-wider" style={{ color: ACCENT }}>
              {a.nombre}
            </p>
            <p className="font-body text-gray-500 text-xs tracking-[0.3em] uppercase mt-3">
              {verset.versetRef}
            </p>
          </div>
          <p className="font-body text-gray-500 text-sm md:text-base leading-relaxed max-w-md md:text-right">
            {a.nombreLegende}
          </p>
        </div>
      </section>

      {/* ── PRÉSENTATION ─────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[14rem_1fr] gap-10 lg:gap-16">
          <div>
            <p className="flex items-center gap-3 font-body text-gray-400 text-[10px] tracking-[0.35em] uppercase mb-3">
              <Remnant tone="dark" />
              {a.tag}
            </p>
            <h2 className="font-display text-3xl text-ink tracking-wider">{a.title}</h2>
            <span className="block w-10 h-px mt-5" style={{ backgroundColor: ACCENT }} />
          </div>
          <p className="font-body text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl">
            {a.intro}
          </p>
        </div>
      </section>

      {/* ── MISSION ──────────────────────────────────────── */}
      <section className="relative py-24 md:py-28 px-6 overflow-hidden">
        <img
          src="/images/vision2.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.target.src = "/images/IMG_4734.png"; }}
        />
        <div className="absolute inset-0 bg-ink/85" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="font-body text-white/45 text-[10px] tracking-[0.4em] uppercase mb-4">
            {a.missionTag}
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-white tracking-wider mb-8">
            {a.missionTitle}
          </h2>
          <p className="font-body text-white/80 text-xl md:text-2xl leading-relaxed max-w-2xl">
            {a.missionText}
          </p>
        </div>
      </section>

      {/* ── VALEURS ──────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 bg-ash">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 md:mb-16">
            <p className="font-body text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: ACCENT }}>
              {a.valuesTag}
            </p>
            <h2 className="font-display text-4xl md:text-6xl text-ink tracking-wider">
              {a.valuesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {valeurs.map((v, i) => (
              <article
                key={v.titre}
                className="group bg-white p-8 md:p-10 card-shadow hover:card-shadow-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-8">
                  <span
                    className="w-11 h-11 flex items-center justify-center text-white"
                    style={{ backgroundColor: ACCENT }}
                  >
                    <v.Icone className="w-5 h-5" />
                  </span>
                  <span className="font-display text-4xl text-gray-200 group-hover:text-gray-300 transition-colors leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <span className="block h-0.5 w-8 mb-6 group-hover:w-14 transition-all duration-500" style={{ backgroundColor: ACCENT }} />
                <h3 className="font-display text-2xl text-ink tracking-wider mb-3">{v.titre}</h3>
                <p className="font-body text-gray-500 text-sm leading-relaxed">{v.texte}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── VERSET ───────────────────────────────────────── */}
      <section className="py-24 md:py-28 px-6 bg-ink text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-10">
            <Remnant tone="light" />
          </div>
          <blockquote className="font-accent italic text-white/80 text-2xl md:text-3xl leading-relaxed mb-6">
            {verset.verset}
          </blockquote>
          <p className="font-body text-xs tracking-[0.35em] uppercase" style={{ color: ACCENT }}>
            {verset.versetRef}
          </p>
          <div className="flex justify-center mt-10">
            <Remnant tone="light" marked={2} />
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl text-ink tracking-wider mb-4">{a.ctaTitre}</h2>
          <div className="w-12 h-px bg-ink mx-auto mb-6" />
          <p className="font-body text-gray-500 leading-relaxed mb-10 max-w-md mx-auto">{a.ctaTexte}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-[#980000] text-white font-body font-semibold text-xs tracking-widest uppercase px-8 py-4 hover:bg-ink transition-colors"
            >
              {a.ctaBtn}
            </Link>
            <Link
              href="/g7k-united"
              className="border border-ink text-ink font-body text-xs tracking-widest uppercase px-8 py-4 hover:bg-ink hover:text-white transition-all"
            >
              {a.ctaUnited}
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
}
