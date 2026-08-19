// pages/cultes/[slug].jsx — PAGE INDIVIDUELLE D'UN CULTE — BILINGUE FR/EN
import Layout from "../../components/Layout";
import Remnant from "../../components/Remnant";
import cultes from "../../data/cultes";
import leaders from "../../data/leaders";
import Link from "next/link";
import fr from "../../locales/fr";
import en from "../../locales/en";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  ClockIcon,
  LightBulbIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const ACCENT = "#980000";
const locales = { fr, en };
const PHOTO_FALLBACK = "/images/IMG_4733.png";

export async function getStaticPaths() {
  const langs = ["fr", "en"];
  const paths = [];
  cultes.forEach((c) => {
    langs.forEach((locale) => {
      paths.push({ params: { slug: c.slug }, locale });
    });
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale }) {
  const culte = cultes.find((c) => c.slug === params.slug) || null;
  return { props: { culte, locale: locale || "fr" } };
}

function LigneInfo({ Icone, label, children }) {
  if (!children) return null;
  return (
    <div className="flex gap-4 items-start">
      <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center shrink-0">
        <Icone className="w-4 h-4 text-gray-500" />
      </div>
      <div>
        <p className="font-body text-gray-400 text-[10px] tracking-[0.28em] uppercase mb-1">{label}</p>
        <div className="font-body text-ink text-sm leading-snug">{children}</div>
      </div>
    </div>
  );
}

export default function CultePage({ culte, locale }) {
  const t = (locales[locale] || fr).cultes;
  if (!culte) return null;

  const isEn = locale === "en";
  const tr = (champ) => (isEn && culte[`${champ}_en`] ? culte[`${champ}_en`] : culte[champ]);

  const type = tr("type");
  const lieu = tr("lieu");
  const heure = tr("heure");
  const description = tr("description");
  const verset = tr("verset");
  const notes = tr("notes");
  const responsable = tr("responsable");
  const jour = t.jours[culte.jour] || culte.jour;
  const photo = culte.photo || PHOTO_FALLBACK;

  const leaderData = leaders.find(
    (l) => l.nom === culte.responsable || l.nom_en === culte.responsable
  );

  return (
    <Layout
      title={type}
      description={`${jour} · ${heure}. ${description || type}`.slice(0, 160)}
      image={PHOTO_FALLBACK}
      url={`https://g7kministries.online/cultes/${culte.slug}`}
    >

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[72vh] flex items-end overflow-hidden">
        <img
          src={photo}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.target.src = PHOTO_FALLBACK; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/25" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-28 pb-14 md:pb-20">
          <Link
            href="/cultes"
            className="inline-flex items-center gap-2 font-body text-white/60 hover:text-white text-xs tracking-widest uppercase mb-10 transition-colors"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            {t.retour}
          </Link>

          <p className="flex items-center gap-3 font-body text-white/55 text-xs tracking-[0.4em] uppercase mb-5">
            <Remnant tone="light" />
            {jour}
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-white tracking-wider leading-none mb-5 max-w-4xl">
            {type}
          </h1>
          <p className="font-body text-white/70 text-lg inline-flex items-center gap-2">
            <ClockIcon className="w-4 h-4" />
            {heure}
          </p>

          {culte.lienMeet && (
            <a
              href={culte.lienMeet}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-10 bg-[#980000] text-white font-body font-semibold text-xs tracking-widest uppercase px-7 py-3.5 hover:bg-[#b00000] transition-colors"
            >
              {t.btnMeet}
              <ArrowUpRightIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </section>

      {/* ── CORPS ────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[16.5rem_1fr] gap-12 lg:gap-16">

          <aside className="lg:sticky lg:top-28 self-start space-y-8">
            <div className="bg-ash/60 border border-gray-100 p-7">
              <p className="font-body text-gray-400 text-[10px] tracking-[0.35em] uppercase mb-6">{t.infos}</p>
              <div className="space-y-5">
                <LigneInfo Icone={ClockIcon} label={t.heure}>{heure}</LigneInfo>
                <LigneInfo Icone={MapPinIcon} label={t.lieu}>{lieu}</LigneInfo>
                {responsable && (
                  <LigneInfo Icone={UserIcon} label={t.responsable}>
                    {leaderData ? (
                      <Link
                        href={`/leaders/${leaderData.slug}`}
                        className="hover:opacity-70 transition-opacity border-b border-ink"
                      >
                        {responsable}
                      </Link>
                    ) : (
                      responsable
                    )}
                  </LigneInfo>
                )}
                {notes && (
                  <LigneInfo Icone={LightBulbIcon} label={t.notes}>
                    <span className="italic text-gray-600">{notes}</span>
                  </LigneInfo>
                )}
              </div>

              {culte.lienMeet && (
                <a
                  href={culte.lienMeet}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-full justify-center items-center gap-2 bg-[#980000] text-white font-body font-semibold text-[11px] tracking-widest uppercase px-5 py-3.5 hover:bg-ink transition-colors"
                >
                  {t.btnMeet}
                  <ArrowUpRightIcon className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {leaderData && (
              <Link
                href={`/leaders/${leaderData.slug}`}
                className="flex items-center gap-4 border border-gray-100 p-5 hover:border-ink transition-colors group"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden bg-ash-dark shrink-0">
                  {leaderData.photo ? (
                    <img
                      src={leaderData.photo}
                      alt={responsable}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  ) : null}
                </div>
                <div>
                  <p className="font-body text-gray-400 text-[10px] tracking-[0.28em] uppercase mb-0.5">
                    {t.responsable}
                  </p>
                  <p className="font-display text-lg text-ink tracking-wide group-hover:text-ink-soft transition-colors">
                    {responsable}
                  </p>
                </div>
              </Link>
            )}
          </aside>

          <div>
            {description ? (
              <div className="mb-12">
                <p className="flex items-center gap-3 font-body text-gray-400 text-[10px] tracking-[0.35em] uppercase mb-3">
                  <Remnant tone="dark" />
                  {t.description}
                </p>
                <h2 className="font-display text-3xl md:text-4xl text-ink tracking-wider mb-6">{type}</h2>
                <p className="font-body text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                  {description}
                </p>
              </div>
            ) : (
              <div className="mb-12">
                <p className="flex items-center gap-3 font-body text-gray-400 text-[10px] tracking-[0.35em] uppercase mb-3">
                  <Remnant tone="dark" />
                  {jour}
                </p>
                <h2 className="font-display text-3xl md:text-4xl text-ink tracking-wider mb-4">{type}</h2>
                <p className="font-body text-gray-500 leading-relaxed">
                  {heure} · {lieu}
                </p>
              </div>
            )}

            {verset && (
              <div className="bg-ink p-8 md:p-10">
                <p className="font-body text-white/40 text-[10px] tracking-[0.35em] uppercase mb-5">{t.verset}</p>
                <blockquote className="font-accent italic text-white/85 text-xl leading-relaxed">
                  {verset}
                </blockquote>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-14 px-6 text-center border-t border-gray-100">
        <Link
          href="/cultes"
          className="inline-flex items-center gap-2 border border-ink text-ink font-body text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-ink hover:text-white transition-all"
        >
          <ArrowLeftIcon className="w-3.5 h-3.5" />
          {t.retour}
        </Link>
      </section>
    </Layout>
  );
}
