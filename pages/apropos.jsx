// pages/apropos.jsx — BILINGUE FR/EN
import Layout from "../components/Layout";
import { useRouter } from "next/router";

// ── TEXTES FR / EN ──────────────────────────────────────────────────────────
const TEXTES = {
  fr: {
    tag:          "Qui sommes-nous",
    titre:        "VISION",
    presentation: `La Génération 7000 est une structure dont la mission est de vous inviter à redécouvrir l'Évangile de Christ et à comprendre son Royaume.\nNous vous accompagnons pour bâtir une vie équilibrée qui nourrit votre éveil spirituel au quotidien.`,
    mission:      `Nous formons des ouvriers pour la moisson et développons leurs talents avec soin.`,
    valeursTag:   "",
    valeursTitre: "",
    valeurs: [
      { titre: ""},
    ],
    verset:    "« Mais je laisserai en Israël sept mille hommes, tous ceux qui n'ont point fléchi les genoux devant Baal, et dont la bouche ne l'a point baisé. »",
    versetRef: "1 Rois 19:18",
  },
  en: {
    tag:          "About Us",
    titre:        "VISION",
    presentation: `Generation 7000 is a ministry whose mission is to invite you to rediscover the Gospel of Christ and understand His Kingdom.\nWe walk alongside you to build a balanced life that nourishes your spiritual awakening every day.`,
    mission:      `We train workers for the harvest and carefully develop their gifts and talents.`,
    valeursTag:   "",
    valeursTitre: "",
    valeurs: [
      { },
    ],
    verset:    "\"Yet I have left me seven thousand in Israel, all the knees which have not bowed unto Baal, and every mouth which hath not kissed him.\"",
    versetRef: "1 Kings 19:18",
  },
};

export default function Apropos() {
  const { locale } = useRouter();
  const t = TEXTES[locale] || TEXTES.fr;

  return (
    <Layout title={t.titre} description="Découvrez la vision, la mission et les valeurs de Génération 7000.">

      {/* En-tête avec photo de fond */}
      <section className="py-28 px-6 border-b border-gray-100 relative"
        style={{
          backgroundImage:    "url('/images/vision.jpg')",
          backgroundSize:     "cover",
          backgroundPosition: "center",
        }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-4xl mx-auto relative z-10">
          <p style={{color:"#980000"}}className="font-bold text-white text-xs tracking-[0.4em] uppercase mb-4">{t.tag}</p>
          <h1 className="font-display text-6xl md:text-8xl text-white tracking-wider">{t.titre}</h1>
        </div>
      </section>

      {/* Présentation */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-body text-gray-600 text- leading-relaxed" style={{ whiteSpace: "pre-line" }}>
            {t.presentation}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-6 bg-ash">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className="font-bold text-black-600 leading-relaxed">{t.mission}</p>
          </div>
          <div />
        </div>
      </section>

      {/* Valeurs avec photo de fond */}
      <section className="py-24 px-6 relative"
        style={{
          backgroundImage:    "url('/images/vision2.jpg')",
          backgroundSize:     "cover",
          backgroundPosition: "center",
        }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-6xl mx-auto relative z-10">
          <p className="font-body text-gray-400 text-xs tracking-[0.4em] uppercase mb-4">{t.valeursTag}</p>
          <h2 className="font-display text-5xl md:text-6xl text-white tracking-wider">{t.valeursTitre}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 mt-10">
            {t.valeurs.map((v, i) => (
              <div key={i} className="bg-white p-10 hover:bg-ash transition-colors group">
                <span className="font-display text-gray-100 text-6xl group-hover:text-gray-200 transition-colors block mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl text-ink tracking-wider mb-3">{v.titre}</h3>
                <p className="font-body text-gray-500 text-sm leading-relaxed">{v.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verset */}
      <section className="py-24 px-6 bg-ink text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-12 h-px bg-white/20 mx-auto mb-10" />
          <blockquote className="font-accent italic text-white/70 text-2xl leading-relaxed mb-6">
            {t.verset}
          </blockquote>
          <p className="font-body text-gray-500 text-xs tracking-widest uppercase">{t.versetRef}</p>
          <div className="w-12 h-px bg-white/20 mx-auto mt-10" />
        </div>
      </section>

    </Layout>
  );
}