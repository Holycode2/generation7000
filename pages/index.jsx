// pages/index.jsx — ACCUEIL BILINGUE FR/EN
import Layout from "../components/Layout";
import Link from "next/link";
import evenements from "../data/evenements";
import leaders from "../data/leaders";
import siteConfig from "../data/siteConfig";
import { useRouter } from "next/router";

const TEXTES = {
  fr: {
    tag:         "1 Rois 19:18",
    titre1:      "GÉNÉRATION",
    titre2:      "7000",
    slogan:      "Une génération mise à part",
    btnEvents:   "Voir les événements",
    btnVision:   "Notre vision",
    scroll:      "Défiler",
    visionTag:   "Notre ADN",
    visionTitre: "LA VISION",
    visionTexte: "La Génération 7000 est une structure dont la mission est de vous inviter à redécouvrir l'Évangile de Christ et à comprendre son Royaume. Nous vous accompagnons pour bâtir une vie équilibrée qui nourrit votre éveil spirituel au quotidien.",
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
    slogan:      "A generation set apart",
    btnEvents:   "See events",
    btnVision:   "Our vision",
    scroll:      "Scroll",
    visionTag:   "Our DNA",
    visionTitre: "THE VISION",
    visionTexte: "Generation 7000 is a ministry whose mission is to invite you to rediscover the Gospel of Christ and understand His Kingdom. We walk alongside you to build a balanced life that nourishes your spiritual awakening every day.",
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

export default function Home() {
  const { locale } = useRouter();
  const t = TEXTES[locale] || TEXTES.fr;

  const prochains     = evenements.slice(0, 3);
  const leaderVedette = leaders[0];

  // Champs traduits du leader vedette
  const leaderNom  = locale === "en" && leaderVedette.nom_en  ? leaderVedette.nom_en  : leaderVedette.nom;
  const leaderRole = locale === "en" && leaderVedette.role_en ? leaderVedette.role_en : leaderVedette.role;
  const leaderBio  = locale === "en" && leaderVedette.bio_en  ? leaderVedette.bio_en  : leaderVedette.bio;

  return (
    <Layout title="Accueil" description={siteConfig.description}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6"
        style={{
          backgroundImage:    "url('/images/heroe2.png')",
          backgroundSize:     "cover",
          backgroundPosition: "center",
          backgroundRepeat:   "no-repeat",
        }}>
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <p style= {{color:"#FFFFFF"}}className="animate-fade-in font-body text-white tracking-[0.5em] uppercase mb-8 text-xs">{t.tag}</p>
          <h1 className="animate-fade-in-up font-display text-white leading-none tracking-wider mb-0"
            style={{ fontSize: "clamp(5rem, 13vw, 8rem)" }}>{t.titre1}</h1>
          <h1 className="animate-fade-in-up font-display text-white leading-none tracking-wider mb-8"
          style={{color: "#980000", fontSize: "clamp(4rem, 10vw, 7rem)" }}>{t.titre2}</h1>
          <div className="w-12 h-px bg-white/30 mx-auto mb-8" />
          <p className="animate-fade-in-up-delay font-accent italic text-gray-300 text-xl md:text-2xl mb-12">{t.slogan}</p>
          <div className="animate-fade-in-up-delay-2 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/evenements"
              className="bg-[#980000] text-white font-body font-semibold text-xs tracking-widest uppercase px-8 py-4 hover:bg-gray-100 transition-all duration-300">
              {t.btnEvents}
            </Link>
            <Link href="/apropos"
              className="border border-white/30 text-white font-body text-xs tracking-widest uppercase px-8 py-4 hover:border-white/70 hover:bg-white/5 transition-all duration-300">
              {t.btnVision}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span style={{color:"#ffffff"}}className="text-white text-xs tracking-widest uppercase font-body">{t.scroll}</span>
          <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* ── VISION ────────────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-body text-gray-400 text-xs tracking-[0.4em] uppercase mb-5">{t.visionTag}</p>
          <h2 style={{ color: "#980000"}}className="font-display text-5xl">{t.visionTitre}</h2>
          <div className="divider-ink" />
          <p className="font-body text-gray-600 text-black leading-relaxed mb-10">{t.visionTexte}</p>
          <Link href="/apropos"
            style={{color: "#980000"}}className="font-body text-sm tracking-widest uppercase text-ink border-b border-ink pb-0.5 hover:text-gray-500 hover:border-gray-500 transition-colors">
            {t.visionLien}
          </Link>
        </div>
      </section>

      {/* ── ÉVÉNEMENTS ────────────────────────────────────── */}
      <section className="py-28 px-6 bg-ash">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
            <div>
              <p className="font-body text-gray-400 text-xs tracking-[0.4em] uppercase mb-3">{t.eventsTag}</p>
              <h2  style= {{ color:"#980000"}}className="font-display text-5xl md:text-6xl text-ink tracking-wider">{t.eventsTitre}</h2>
            </div>
            <Link href="/evenements"
              style={{color: "#980000"}}className="font-body text-xs tracking-widest uppercase text-gray-500 hover:text-ink border-b border-gray-300 hover:border-ink pb-0.5 transition-colors self-start md:self-auto">
              {t.eventsLien}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {prochains.map((evt) => (
              <div key={evt.id}
                className="bg-white p-8 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 group">
                <p className="font-body text-gray-400 text-xs tracking-widest uppercase mb-4">
                  {new Date(evt.date).toLocaleDateString(locale === "en" ? "en-US" : "fr-FR", {
                    day: "numeric", month: "long", year: "numeric"
                  })}
                </p>

                {/* ← TITRE TRADUIT */}
                <h3 className="font-display text-2xl text-ink tracking-wide mb-4 leading-tight group-hover:text-gray-700 transition-colors">
                  {locale === "en" && evt.titre_en ? evt.titre_en : evt.titre}
                </h3>

                {/* ← DESCRIPTION TRADUITE */}
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {(locale === "en" && evt.description_en ? evt.description_en : evt.description).slice(0, 90)}…
                </p>

                {/* ← LIEU TRADUIT */}
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <span>📍</span>
                  <span>{locale === "en" && evt.lieu_en ? evt.lieu_en : evt.lieu}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VERSET ────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-ink">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-px bg-white/20 mx-auto mb-10" />
          <blockquote className="font-accent italic text-white/70 text-2xl md:text-3xl leading-relaxed mb-6">
            {t.verset}
          </blockquote>
          <p className="font-body text-gray-500 text-xs tracking-widest uppercase">{t.versetRef}</p>
          <div className="w-12 h-px bg-white/20 mx-auto mt-10" />
        </div>
      </section>

      {/* ── LEADER VEDETTE ────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center">

            <div className="flex-shrink-0">
              <div className="w-56 h-56 bg-ash-dark overflow-hidden">
                {leaderVedette.photo ? (
                  <img src={leaderVedette.photo} alt={leaderNom}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display='none'; }} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-display text-4xl text-gray-400">
                      {leaderNom.split(" ").map(w => w[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <p className="font-body text-gray-400 text-xs tracking-[0.4em] uppercase mb-3">{t.leaderTag}</p>
              {/* ← NOM TRADUIT */}
              <h2 className="font-display text-4xl md:text-5xl text-ink tracking-wider mb-2">
                {leaderNom.toUpperCase()}
              </h2>
              {/* ← RÔLE TRADUIT */}
              <p className="font-accent italic text-gray-500 text-black mb-6">{leaderRole}</p>
              <div className="divider-left" />
              {/* ← BIO TRADUITE */}
              <p className="text-gray-600 leading-relaxed mb-8 max-w-lg">
                {leaderBio ? leaderBio.slice(0, 160) + "…" : ""}
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href={`/leaders/${leaderVedette.slug}`}
                  className="bg-[#980000] text-white font-body text-xs tracking-widest uppercase px-6 py-3 hover:bg-ink-light transition-all">
                  {t.leaderBio}
                </Link>
                <Link href="/leaders"
                  className="border border-ink text-ink font-body text-xs tracking-widest uppercase px-6 py-3 hover:bg-ink hover:text-white transition-all">
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