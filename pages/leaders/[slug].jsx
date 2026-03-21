// pages/leaders/[slug].jsx
import Layout from "../../components/Layout";
import leaders from "../../data/leaders";
import Link from "next/link";

export async function getStaticPaths() {
  return { paths: leaders.map(l => ({ params: { slug: l.slug } })), fallback: false };
}

export async function getStaticProps({ params }) {
  const leader = leaders.find(l => l.slug === params.slug) || null;
  return { props: { leader } };
}

export default function LeaderPage({ leader }) {
  if (!leader) return null;

  return (
    <Layout title={leader.nom} description={`${leader.nom} — ${leader.role}`}>

      {/* Retour */}
      <div className="max-w-5xl mx-auto px-6 pt-10">
        <Link href="/leaders" className="font-body text-gray-400 hover:text-ink text-xs tracking-widest uppercase transition-colors">
          ← Retour aux leaders
        </Link>
      </div>

      {/* Header leader */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-start">

          {/* Photo */}
          <div className="flex-shrink-0 w-48 h-48 md:w-64 md:h-64 bg-ash-dark overflow-hidden">
            {leader.photo ? (
              <img src={leader.photo} alt={leader.nom} className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display='none'; }} />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-display text-5xl text-gray-300">
                  {leader.nom.split(" ").map(w => w[0]).join("").slice(0,2)}
                </span>
              </div>
            )}
          </div>

          {/* Infos */}
          <div className="flex-1">
            <p className="font-body text-gray-400 text-xs tracking-[0.4em] uppercase mb-3">{leader.role}</p>
            <h1 className="font-display text-4xl md:text-6xl text-ink tracking-wider mb-6">
              {leader.nom.toUpperCase()}
            </h1>
            <div className="divider-left" />

            {/* Réseaux */}
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
        <p className="font-body text-gray-400 text-xs tracking-[0.4em] uppercase mb-6">Biographie</p>
        <p className="font-body text-gray-600 text-lg leading-relaxed">{leader.bio}</p>
      </section>

      {/* Versets */}
      {leader.versets?.length > 0 && (
        <section className="py-20 px-6 bg-ash">
          <div className="max-w-3xl mx-auto">
            <p className="font-body text-gray-400 text-xs tracking-[0.4em] uppercase mb-10 text-center">Versets & Citations</p>
            <div className="space-y-8">
              {leader.versets.map((v, i) => (
                <blockquote key={i} className="border-l-2 border-ink pl-8">
                  <p className="font-accent italic text-gray-700 text-xl leading-relaxed">{v}</p>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nav retour */}
      <section className="py-16 px-6 text-center">
        <Link href="/leaders"
          className="border border-ink text-ink font-body text-xs tracking-widest uppercase px-8 py-3 hover:bg-ink hover:text-white transition-all">
          Voir tous les leaders
        </Link>
      </section>
    </Layout>
  );
}
