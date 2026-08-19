// pages/index.jsx — ACCUEIL BILINGUE FR/EN
import Layout from "../components/Layout";
import Remnant from "../components/Remnant";
import Link from "next/link";
import { motion } from "framer-motion";
import { aVenir, passes } from "../data/evenements";
import leaders from "../data/leaders";
import siteConfig from "../data/siteConfig";
import { useRouter } from "next/router";
import { useTranslation } from "../hooks/useTranslation";

const ACCENT = "#980000";

const TEXTES = {
  fr: {
    tag:         "1 Rois 19:18",
    titre1:      "GÉNÉRATION",
    titre2:      "7000",
    slogan:      "Ce que l’esprit fait est parfait",
    btnEvents:   "Voir les événements",
    btnVision:   "Notre vision",
    scroll:      "Défiler",
    visionTag:   "Notre ADN",
    visionTitre: "LA VISION",
    visionTexte: "La Génération 7000 est une structure dont la mission est de redécouvrir l'Évangile de Christ et comprendre son Royaume. Nous vous accompagnons pour bâtir une vie équilibrée qui nourrit votre éveil spirituel au quotidien.",
    visionLien:  "En savoir plus →",
    eventsTag:   "À venir",
    eventsTitre: "ÉVÉNEMENTS",
    eventsLien:  "Tous les événements →",
    verset:      "« Mais je laisserai en Israël sept mille hommes, tous ceux qui n'ont point fléchi les genoux devant Baal, et dont la bouche ne l'a point baisé. »",
    versetRef:   "1 Rois 19:18",
    leaderTag:   "Leadership",
    leaderBio:   "Lire la biographie",
    leaderTous:  "Tous les leaders",
  },
  en: {
    tag:         "1 Kings 19:18",
    titre1:      "GENERATION",
    titre2:      "7000",
    slogan:      "What the Spirit does is perfect.",
    btnEvents:   "See events",
    btnVision:   "Our vision",
    scroll:      "Scroll",
    visionTag:   "Our DNA",
    visionTitre: "THE VISION",
    visionTexte: "Generation 7000 is a structure whose mission is to rediscover the Gospel of Christ and understand His Kingdom. We support you in building a balanced life that nurtures your spiritual awakening on a daily basis.",
    visionLien:  "Learn more →",
    eventsTag:   "Coming up",
    eventsTitre: "EVENTS",
    eventsLien:  "All events →",
    verset:      "\"Yet I have left me seven thousand in Israel, all the knees which have not bowed unto Baal, and every mouth which hath not kissed him.\"",
    versetRef:   "1 Kings 19:18",
    leaderTag:   "Leadership",
    leaderBio:   "Read biography",
    leaderTous:  "All leaders",
  },
};

function Eyebrow({ children, tone = "light" }) {
  return (
    <p
      className={`flex items-center gap-3 font-body text-xs tracking-[0.4em] uppercase mb-5 ${
        tone === "light" ? "text-gray-400" : "text-gray-500"
      }`}
    >
      <Remnant tone={tone} />
      {children}
    </p>
  );
}

export default function Home() {
  const { locale } = useRouter();
  const { t: tr } = useTranslation();
  const t = TEXTES[locale] || TEXTES.fr;

  // On met en avant les événements à venir ; s'il n'y en a pas, les plus récents.
  const futurs        = aVenir();
  const prochains     = (futurs.length > 0 ? futurs : passes()).slice(0, 3);
  const leaderVedette = leaders[0];

  // Champs traduits du leader vedette
  const leaderNom  = locale === "en" && leaderVedette.nom_en  ? leaderVedette.nom_en  : leaderVedette.nom;
  const leaderRole = locale === "en" && leaderVedette.role_en ? leaderVedette.role_en : leaderVedette.role;
  const leaderBio  = locale === "en" && leaderVedette.bio_en  ? leaderVedette.bio_en  : leaderVedette.bio;

  return (
    <Layout
      title={tr.meta.home}
      description={locale === "en" ? siteConfig.description_en : siteConfig.description}
    >

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">


        {/* Fallback image + profondeur */}
        <motion.div
  className="absolute inset-0 bg-cover bg-center"
  style={{ backgroundImage: "url('/images/heroe2.png')" }}
  initial={{ scale: 1 }}
  animate={{ scale: 1.05 }}
  transition={{
    duration: 20,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  }}
/>

        {/* Voile sombre — dégradé plus riche qu'un plat uniforme */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/70 to-black/85" />

        {/* Halo rouge */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Texture noise */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Contenu */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <Remnant tone="light" />
            <p className="font-body text-white tracking-[0.5em] uppercase text-xs">
              {t.tag}
            </p>
            <Remnant tone="light" marked={2} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-white leading-[0.95] tracking-wide"
            style={{ fontSize: "clamp(2.75rem,8vw,4.75rem)" }}
          >
            {t.titre1}
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-display leading-[0.95] tracking-wide mb-8"
            style={{ color: ACCENT, fontSize: "clamp(2.75rem,8vw,4.75rem)" }}
          >
            {t.titre2}
          </motion.h1>

          <div className="w-12 h-px bg-white/30 mx-auto mb-8" />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="font-accent italic text-gray-300 text-xl md:text-2xl mb-12"
          >
            {t.slogan}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/apropos"
              className="bg-[#980000] text-white font-body font-semibold text-xs tracking-widest uppercase px-8 py-4 rounded-xl hover:bg-[#b00000] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Découvrir G7K
            </Link>

            <Link
              href="/evenements"
              className="border border-white/30 backdrop-blur-md bg-white/10 text-white font-body text-xs tracking-widest uppercase px-8 py-4 rounded-xl hover:bg-white/20 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Nos événements
            </Link>
          </motion.div>
        </div>

        {/* Scroll */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-white text-xs tracking-widest uppercase">{t.scroll}</span>
          <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* ── VISION ────────────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center">
            <Eyebrow tone="dark">{t.visionTag}</Eyebrow>
          </div>
          <h2 style={{ color: ACCENT }} className="font-display text-5xl">
            {t.visionTitre}
          </h2>
          <div className="divider-ink" />
          <p className="font-body text-gray-600 leading-relaxed mb-10 text-lg">
            {t.visionTexte}
          </p>
          <Link
            href="/apropos"
            style={{ color: ACCENT }}
            className="font-body text-sm tracking-widest uppercase border-b pb-0.5 transition-colors hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {t.visionLien}
          </Link>
        </div>
      </section>

      {/* ── ÉVÉNEMENTS ────────────────────────────────────── */}
      <section className="py-28 px-6 bg-ash">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
            <div>
              <Eyebrow tone="dark">{t.eventsTag}</Eyebrow>
              <h2 className="font-display text-5xl md:text-6xl text-ink tracking-wider">
                {t.eventsTitre}
              </h2>
            </div>
            <Link
              href="/evenements"
              style={{ color: ACCENT }}
              className="font-body text-xs tracking-widest uppercase border-b border-gray-300 hover:border-current pb-0.5 transition-colors self-start md:self-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {t.eventsLien}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {prochains.map((evt) => (
              <Link
                key={evt.id}
                href={`/evenements/${evt.slug}`}
                className="bg-white card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 group overflow-hidden block"
              >
                <div className="relative h-44 bg-ink overflow-hidden">
                  {evt.image && (
                    <img
                      src={evt.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <p className="absolute bottom-3 left-4 font-body text-white/80 text-[10px] tracking-[0.25em] uppercase">
                    {new Date(evt.date).toLocaleDateString(locale === "en" ? "en-US" : "fr-FR", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </p>
                </div>
                <div className="p-7">
                  <h3 className="font-display text-2xl text-ink tracking-wide mb-3 leading-tight group-hover:text-gray-700 transition-colors">
                    {locale === "en" && evt.titre_en ? evt.titre_en : evt.titre}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">
                    {locale === "en" && evt.description_en ? evt.description_en : evt.description}
                  </p>
                  <p className="font-body text-gray-400 text-xs inline-flex items-center gap-1.5">
                    <span>📍</span>
                    {locale === "en" && evt.lieu_en ? evt.lieu_en : evt.lieu}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── VERSET ────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-ink">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-10">
            <Remnant tone="light" />
          </div>
          <blockquote className="font-accent italic text-white/80 text-2xl md:text-3xl leading-relaxed mb-6">
            {t.verset}
          </blockquote>
          <p style={{ color: ACCENT }} className="font-bold text-xs tracking-widest uppercase">
            {t.versetRef}
          </p>
          <div className="flex justify-center mt-10">
            <Remnant tone="light" marked={2} />
          </div>
        </div>
      </section>

      {/* ── LEADER VEDETTE ────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center">

            <div className="flex-shrink-0 relative">
              <div
                className="absolute -inset-2 rounded-sm opacity-20"
                style={{ border: `1px solid ${ACCENT}` }}
              />
              <div className="w-56 h-56 bg-ash-dark overflow-hidden relative">
                {leaderVedette.photo ? (
                  <img
                    src={leaderVedette.photo}
                    alt={leaderNom}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-display text-4xl text-gray-400">
                      {leaderNom.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <Eyebrow tone="dark">{t.leaderTag}</Eyebrow>
              {/* ← NOM TRADUIT */}
              <h2 className="font-display text-4xl md:text-5xl text-ink tracking-wider mb-2">
                {leaderNom.toUpperCase()}
              </h2>
              {/* ← RÔLE TRADUIT */}
              <p style={{ color: ACCENT }} className="font-accent italic mb-6">
                {leaderRole}
              </p>
              <div className="divider-left" />
              {/* ← BIO TRADUITE */}
              <p className="text-gray-600 leading-relaxed mb-8 max-w-lg">
                {leaderBio ? leaderBio.slice(0, 160) + "…" : ""}
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link
                  href={`/leaders/${leaderVedette.slug}`}
                  className="bg-[#980000] text-white font-body text-xs tracking-widest uppercase px-6 py-3 hover:bg-ink-light transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {t.leaderBio}
                </Link>
                <Link
                  href="/leaders"
                  className="border border-ink text-ink font-body text-xs tracking-widest uppercase px-6 py-3 hover:bg-ink hover:text-white transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {t.leaderTous}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}