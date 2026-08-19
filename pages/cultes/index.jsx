// pages/cultes/index.jsx — PROGRAMME DES CULTES — BILINGUE FR/EN
import Link from "next/link";
import Layout from "../../components/Layout";
import Remnant from "../../components/Remnant";
import cultes from "../../data/cultes";
import siteConfig from "../../data/siteConfig";
import { useTranslation } from "../../hooks/useTranslation";
import {
  ArrowRightIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const ACCENT = "#980000";
const ORDRE = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const PHOTO = "/images/culte.jpg";
const PHOTO_FALLBACK = "/images/IMG_4733.png";

function champ(item, isEn, nom) {
  return isEn && item[`${nom}_en`] ? item[`${nom}_en`] : item[nom];
}

export default function Cultes() {
  const { t, locale } = useTranslation();
  const c = t.cultes;
  const isEn = locale === "en";

  const parJour = ORDRE.reduce((acc, jour) => {
    const items = cultes.filter((item) => item.jour === jour);
    if (items.length) acc[jour] = items;
    return acc;
  }, {});

  const nbJours = Object.keys(parJour).length;

  return (
    <Layout
      title={c.title.replace("\n", " ")}
      description={t.meta.cultesDesc}
      image={PHOTO_FALLBACK}
      url="https://g7kministries.online/cultes"
    >

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <img
          src={PHOTO}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.target.src = PHOTO_FALLBACK; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/25" />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-28 pb-16 md:pb-20">
          <p className="flex items-center gap-3 font-body text-white/60 text-xs tracking-[0.4em] uppercase mb-5">
            <Remnant tone="light" />
            {c.tag}
          </p>
          <h1
            className="font-display text-6xl md:text-8xl text-white tracking-wider leading-none mb-6"
            style={{ whiteSpace: "pre-line" }}
          >
            {c.title}
          </h1>
          <p className="font-body text-white/70 text-base md:text-lg leading-relaxed max-w-xl">
            {c.subtitle}
          </p>
        </div>
      </section>

      {/* ── CHIFFRES ─────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <p className="font-display text-4xl text-ink leading-none">{cultes.length}</p>
            <p className="font-body text-gray-500 text-xs tracking-widest uppercase mt-2">{c.parSemaine}</p>
          </div>
          <div>
            <p className="font-display text-4xl leading-none" style={{ color: ACCENT }}>{nbJours}</p>
            <p className="font-body text-gray-500 text-xs tracking-widest uppercase mt-2">{c.joursActifs}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-4xl text-ink leading-none">21h</p>
            <p className="font-body text-gray-500 text-xs tracking-widest uppercase mt-2">{c.enLigne}</p>
          </div>
        </div>
      </section>

      {/* ── PROGRAMME ────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="font-body text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: ACCENT }}>
            {c.programme}
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-ink tracking-wider mb-12">
            {c.title.replace("\n", " ")}
          </h2>

          <div className="space-y-10">
            {Object.entries(parJour).map(([jour, items]) => (
              <div key={jour}>
                <div className="flex items-end gap-5 mb-5">
                  <h3 className="font-display text-2xl md:text-3xl text-ink tracking-wider">
                    {(c.jours[jour] || jour).toUpperCase()}
                  </h3>
                  <div className="flex-1 h-px bg-gray-200 mb-2" />
                </div>

                <div className="space-y-4">
                  {items.map((culte) => (
                    <Link
                      key={culte.id}
                      href={`/cultes/${culte.slug}`}
                      className="group grid grid-cols-1 sm:grid-cols-[8.5rem_1fr] bg-white border border-gray-100 overflow-hidden card-shadow hover:card-shadow-hover hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="bg-ink text-white flex flex-col justify-center px-6 py-5 sm:py-8">
                        <p className="font-body text-white/40 text-[10px] tracking-[0.28em] uppercase mb-1">
                          {c.jours[jour] || jour}
                        </p>
                        <p className="font-display text-xl md:text-2xl leading-tight">
                          {champ(culte, isEn, "heure")}
                        </p>
                      </div>

                      <div className="p-6 md:px-8 md:py-7 flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display text-2xl text-ink tracking-wide mb-2 group-hover:text-ink-soft transition-colors">
                            {champ(culte, isEn, "type")}
                          </h4>
                          <div className="flex flex-wrap gap-x-5 gap-y-1 font-body text-gray-400 text-xs">
                            <span className="inline-flex items-center gap-1.5">
                              <ClockIcon className="w-3.5 h-3.5" />
                              {champ(culte, isEn, "heure")}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <MapPinIcon className="w-3.5 h-3.5" />
                              {champ(culte, isEn, "lieu")}
                            </span>
                          </div>
                          {champ(culte, isEn, "notes") && (
                            <p className="font-body text-gray-400 text-xs mt-2 italic">
                              {champ(culte, isEn, "notes")}
                            </p>
                          )}
                        </div>
                        <span className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-ink shrink-0 group-hover:gap-3 transition-all">
                          {c.voir}
                          <ArrowRightIcon className="w-3.5 h-3.5" style={{ color: ACCENT }} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREMIÈRE VISITE ──────────────────────────────── */}
      <section className="bg-ink text-white py-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <p className="flex items-center justify-center gap-3 font-body text-white/40 text-[10px] tracking-[0.4em] uppercase mb-6">
            <Remnant tone="light" />
            G7K
          </p>
          <h3 className="font-display text-4xl md:text-5xl tracking-wider mb-5">{c.firstVisit}</h3>
          <div className="w-12 h-px bg-white/30 mx-auto mb-6" />
          <p className="font-body text-white/60 leading-relaxed mb-10">{c.firstText}</p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-block bg-[#980000] text-white font-body font-semibold text-xs tracking-widest uppercase px-8 py-4 hover:bg-[#b00000] transition-colors"
          >
            {c.btnContact}
          </a>
        </div>
      </section>
    </Layout>
  );
}
