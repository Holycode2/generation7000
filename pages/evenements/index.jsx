// pages/evenements/index.jsx — LISTE DES ÉVÉNEMENTS — BILINGUE FR/EN
import Link from "next/link";
import Layout from "../../components/Layout";
import Remnant from "../../components/Remnant";
import { tousTries, statutDe } from "../../data/evenements";
import { useTranslation } from "../../hooks/useTranslation";
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const ACCENT = "#980000";

function champ(evt, isEn, nom) {
  return isEn && evt[`${nom}_en`] ? evt[`${nom}_en`] : evt[nom];
}

function libelleStatut(statut, e) {
  if (statut === "encours") return e.encours;
  if (statut === "passe") return e.passe;
  return e.aVenir;
}

function BadgeStatut({ statut, e }) {
  const styles = {
    encours: "bg-[#980000] text-white",
    "a-venir": "bg-white text-ink",
    passe: "bg-white/15 text-white/80 border border-white/20",
  };
  return (
    <span className={`font-body text-[10px] tracking-[0.28em] uppercase px-3 py-1.5 ${styles[statut] || styles["a-venir"]}`}>
      {libelleStatut(statut, e)}
    </span>
  );
}

function CarteVedette({ evt, e, isEn }) {
  const statut = statutDe(evt);
  const titre = champ(evt, isEn, "titre");
  const theme = champ(evt, isEn, "theme");
  const lieu = champ(evt, isEn, "lieu");
  const description = champ(evt, isEn, "description");
  const date = new Date(evt.date);

  return (
    <Link
      href={`/evenements/${evt.slug}`}
      className="group relative block overflow-hidden bg-ink min-h-[28rem] md:min-h-[32rem] card-shadow hover:card-shadow-hover transition-shadow"
    >
      {evt.image && (
        <img
          src={evt.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />

      <div className="relative z-10 flex flex-col justify-end h-full min-h-[28rem] md:min-h-[32rem] p-8 md:p-12">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <BadgeStatut statut={statut} e={e} />
          {evt.sessions?.length > 0 && (
            <span className="font-body text-white/70 text-[10px] tracking-[0.28em] uppercase">
              {e.sessions(evt.sessions.length)}
            </span>
          )}
        </div>

        <p className="font-body text-white/50 text-[10px] tracking-[0.35em] uppercase mb-3">{e.aLaUne}</p>
        <h2 className="font-display text-4xl md:text-6xl text-white tracking-wider leading-none mb-4 max-w-3xl">
          {titre}
        </h2>
        {theme && (
          <p className="font-accent italic text-white/70 text-lg md:text-xl mb-6">« {theme} »</p>
        )}
        {description && (
          <p className="font-body text-white/65 text-sm md:text-base leading-relaxed max-w-xl mb-8 line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/70 text-xs font-body tracking-wide uppercase">
          <span className="flex items-center gap-2">
            <CalendarDaysIcon className="w-4 h-4" />
            {date.toLocaleDateString(isEn ? "en-US" : "fr-FR", { day: "numeric", month: "long", year: "numeric" })}
          </span>
          {evt.heure && (
            <span className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4" />
              {evt.heure}
            </span>
          )}
          <span className="flex items-center gap-2">
            <MapPinIcon className="w-4 h-4" />
            {lieu}
          </span>
        </div>

        <span
          className="inline-flex items-center gap-2 mt-8 font-body font-semibold text-xs tracking-widest uppercase text-white group-hover:gap-3 transition-all"
          style={{ color: ACCENT }}
        >
          <span className="text-white">{e.voir}</span>
          <ArrowRightIcon className="w-4 h-4 text-white" />
        </span>
      </div>
    </Link>
  );
}

function CarteListe({ evt, e, isEn }) {
  const statut = statutDe(evt);
  const titre = champ(evt, isEn, "titre");
  const theme = champ(evt, isEn, "theme");
  const lieu = champ(evt, isEn, "lieu");
  const description = champ(evt, isEn, "description");
  const date = new Date(evt.date);
  const badgeClair = {
    encours: "bg-[#980000] text-white",
    "a-venir": "bg-ink text-white",
    passe: "bg-gray-100 text-gray-500",
  };

  return (
    <Link
      href={`/evenements/${evt.slug}`}
      className="group grid grid-cols-1 md:grid-cols-[18rem_1fr] bg-white border border-gray-100 overflow-hidden card-shadow hover:card-shadow-hover hover:-translate-y-0.5 transition-all duration-300"
    >
      <div className="relative h-56 md:h-auto bg-ink overflow-hidden">
        {evt.image ? (
          <img
            src={evt.image}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-ash-dark" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent md:bg-gradient-to-r" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div className="text-white">
            <p className="font-display text-4xl leading-none">{date.getDate()}</p>
            <p className="font-body text-[10px] tracking-[0.25em] uppercase text-white/70 mt-1">
              {date.toLocaleDateString(isEn ? "en-US" : "fr-FR", { month: "short" })} {date.getFullYear()}
            </p>
          </div>
        </div>
      </div>

      <div className="p-7 md:p-9 flex flex-col">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`font-body text-[10px] tracking-[0.28em] uppercase px-3 py-1.5 ${badgeClair[statut]}`}>
            {libelleStatut(statut, e)}
          </span>
          {evt.sessions?.length > 0 && (
            <span className="font-body text-gray-400 text-[10px] tracking-[0.22em] uppercase">
              {e.sessions(evt.sessions.length)}
            </span>
          )}
        </div>

        <h2 className="font-display text-2xl md:text-3xl text-ink tracking-wide mb-2 group-hover:text-ink-soft transition-colors">
          {titre}
        </h2>
        {theme && (
          <p className="font-accent italic text-sm mb-4" style={{ color: ACCENT }}>« {theme} »</p>
        )}
        {description && (
          <p className="font-body text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2 flex-1">
            {description}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-2">
          <div className="flex flex-wrap gap-x-5 gap-y-1 font-body text-gray-400 text-xs">
            {evt.heure && (
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon className="w-3.5 h-3.5" /> {evt.heure}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon className="w-3.5 h-3.5" /> {lieu}
            </span>
          </div>
          <span className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-ink group-hover:gap-3 transition-all">
            {e.voir}
            <ArrowRightIcon className="w-3.5 h-3.5" style={{ color: ACCENT }} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Evenements() {
  const { t, locale } = useTranslation();
  const e = t.evenements;
  const isEn = locale === "en";
  const liste = tousTries();
  const [vedette, ...autres] = liste;

  return (
    <Layout title={e.title} description={t.meta.eventsDesc} image="/images/IMG_4734.png">

      <section
        className="py-28 md:py-32 px-6 relative"
        style={{
          backgroundImage: "url('/images/IMG_4734.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="flex items-center gap-3 font-body text-white/60 text-xs tracking-[0.4em] uppercase mb-5">
            <Remnant tone="light" />
            {e.tag}
          </p>
          <h1 className="font-display text-6xl md:text-8xl text-white tracking-wider mb-5">{e.title}</h1>
          <p className="font-body text-white/70 text-base md:text-lg leading-relaxed max-w-xl">{e.intro}</p>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {liste.length === 0 ? (
            <p className="text-center text-gray-400 font-body py-24">{e.empty}</p>
          ) : (
            <div className="space-y-10">
              <CarteVedette evt={vedette} e={e} isEn={isEn} />

              {autres.length > 0 && (
                <div>
                  <p className="font-body text-gray-400 text-[10px] tracking-[0.35em] uppercase mb-6">
                    {e.autres}
                  </p>
                  <div className="space-y-5">
                    {autres.map((evt) => (
                      <CarteListe key={evt.id} evt={evt} e={e} isEn={isEn} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
