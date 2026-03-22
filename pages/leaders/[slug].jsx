import Layout from "../../components/Layout";
import leaders from "../../data/leaders";
import Link from "next/link";

// ── TEXTES FR / EN ──────────────────────────────────────────────────────────
const TEXTES = {
  fr: {
    retour:  "← Retour aux leaders",
    bio:     "Biographie",
    versets: "Versets & Citations",
    tousBtn: "Voir tous les leaders",
  },
  en: {
    retour:  "← Back to leaders",
    bio:     "Biography",
    versets: "Verses & Quotes",
    tousBtn: "See all leaders",
  },
};

// ── GÉNÈRE LES CHEMINS POUR CHAQUE LANGUE ───────────────────────────────────
export async function getStaticPaths() {
  const locales = ["fr", "en"];
  const paths = [];
  leaders.forEach(l => {
    locales.forEach(locale => {
      paths.push({ params: { slug: l.slug }, locale });
    });
  });
  return { paths, fallback: false };
}

// ── RÉCUPÈRE LE LEADER ET LA LANGUE ─────────────────────────────────────────
export async function getStaticProps({ params, locale }) {
  const leader = leaders.find(l => l.slug === params.slug) || null;
  return { props: { leader, locale: locale || "fr" } };
}

// ── PAGE ─────────────────────────────────────────────────────────────────────
export default function LeaderPage({ leader, locale }) {
  const t = TEXTES[locale] || TEXTES.fr;

  if (!leader) return null;

  const nom     = locale === "en" && leader.nom_en        ? leader.nom_en        : leader.nom;
  const role    = locale === "en" && leader.role_en       ? leader.role_en       : leader.role;
  const bio     = locale === "en" && leader.bio_en        ? leader.bio_en        : leader.bio;
  const versets = locale === "en" && leader.versets_en?.length ? leader.versets_en : leader.versets;

  return (
    <Layout title={nom} description={`${nom} — ${role}`}>

      {/* Retour */}
      <div className="max-w-5xl mx-auto px-6 pt-10">
        <Link href="/leaders"
          className="font-body text-gray-400 hover:text-ink text-xs tracking-widest uppercase transition-colors">
          {t.retour}
        </Link>
      </div>

      {/* Header leader */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-start">

          {/* Photo */}
          <div className="flex-shrink-0 w-48 h-48 md:w-64 md:h-64 bg-ash-dark overflow-hidden">
            {leader.photo ? (
              <img src={leader.photo} alt={nom} className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display='none'; }} />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-display text-5xl text-gray-300">
                  {nom.split(" ").map(w => w[0]).join("").slice(0, 2)}
                </span>
              </div>
            )}
          </div>

          {/* Infos */}
          <div className="flex-1">
            <p className="font-body text-gray-400 text-xs tracking-[0.4em] uppercase mb-3">{role}</p>
            <h1 className="font-display text-4xl md:text-6xl text-ink tracking-wider mb-6">
              {nom.toUpperCase()}
            </h1>
            <div className="divider-left" />

            {/* Réseaux sociaux */}
            {leader.reseaux && (
              <div className="flex flex-wrap gap-3 mt-6">
                {Object.entries(leader.reseaux).map(([reseau, url]) => (
                  <a key={reseau} href={url} target="_blank" rel="noopener noreferrer"
                    className="border border-gray-200 text-gray-500 hover:border-ink hover:text-ink font-body text-xs tracking-widest uppercase px-4 py-2 transition-all">
                    {reseau.charAt(0).toUpperCase() + reseau.slice(1)}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Biographie */}
      <section className="px-6 pb-16 max-w-3xl mx-auto">
        <p className="font-body text-gray-400 text-xs tracking-[0.4em] uppercase mb-6">{t.bio}</p>
        <p className="font-body text-gray-600 text-lg leading-relaxed">{bio}</p>
      </section>

      {/* Versets */}
      {versets?.length > 0 && (
        <section className="py-20 px-6 bg-ash">
          <div className="max-w-3xl mx-auto">
            <p className="font-body text-gray-400 text-xs tracking-[0.4em] uppercase mb-10 text-center">
              {t.versets}
            </p>
            <div className="space-y-8">
              {versets.map((v, i) => (
                <blockquote key={i} className="border-l-2 border-ink pl-8">
                  <p className="font-accent italic text-gray-700 text-xl leading-relaxed">{v}</p>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bouton retour */}
      <section className="py-16 px-6 text-center">
        <Link href="/leaders"
          className="border border-ink text-ink font-body text-xs tracking-widest uppercase px-8 py-3 hover:bg-ink hover:text-white transition-all">
          {t.tousBtn}
        </Link>
      </section>

    </Layout>
  );
}