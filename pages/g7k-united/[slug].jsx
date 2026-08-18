// pages/g7k-united/[slug].jsx — PAGE D'UN PÔLE DE TALENTS — BILINGUE FR/EN
import Link from "next/link";
import Layout from "../../components/Layout";
import talents from "../../data/talents";
import IconeReseau from "../../components/IconeReseau";

const ACCENT = "#980000";

const TEXTES = {
  fr: {
    retour:       "← Retour à G7K United",
    apropos:      "À propos",
    responsables: "Responsables du pôle",
    artistes:     "Les artistes du pôle",
    artistesVide: "[À compléter] Les membres de ce pôle seront présentés ici très bientôt.",
    suivre:       "Suivre le pôle sur Instagram",
    ctaTitre:     "REJOINDRE G7K_URBAN",
    ctaTexte:     "Tu joues, tu chantes, tu composes ? Écris-nous et nous te mettrons en lien avec le responsable.",
    ctaBtn:       "Nous contacter",
    autres:       "Les autres pôles",
  },
  en: {
    retour:       "← Back to G7K United",
    apropos:      "About",
    responsables: "Team leads",
    artistes:     "The artists",
    artistesVide: "[To be completed] The members of this team will be introduced here very soon.",
    suivre:       "Follow this team on Instagram",
    ctaTitre:     "JOIN G7K_URBAN ",
    ctaTexte:     "You play, you sing, you compose? Write to us and we will connect you with the team lead.",
    ctaBtn:       "Contact us",
    autres:       "Other teams",
  },
};

// Une page statique par pôle et par langue.
export async function getStaticPaths() {
  const locales = ["fr", "en"];
  const paths = [];
  talents.forEach((pole) => {
    locales.forEach((locale) => {
      paths.push({ params: { slug: pole.slug }, locale });
    });
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale }) {
  const pole = talents.find((p) => p.slug === params.slug) || null;

  // Les autres pôles, pour la navigation en bas de page.
  const autres = talents
    .filter((p) => p.slug !== params.slug)
    .map(({ id, slug, nom, nom_en }) => ({ id, slug, nom, nom_en }));

  return { props: { pole, autres, locale: locale || "fr" } };
}

export default function PolePage({ pole, autres, locale }) {
  const t = TEXTES[locale] || TEXTES.fr;
  if (!pole) return null;

  const isEn = locale === "en";
  const tr = (champ) => (isEn && pole[`${champ}_en`] ? pole[`${champ}_en`] : pole[champ]);

  const nom          = tr("nom");
  const categorie    = tr("categorie");
  const description  = tr("description");
  const presentation = tr("descriptionLongue") || description;

  return (
    <Layout
      title={nom}
      description={`${nom} — ${description}`.slice(0, 160)}
      image={pole.image}
      url={`https://g7kministries.online/g7k-united/${pole.slug}`}
    >

      {/* Retour */}
      <div className="max-w-5xl mx-auto px-6 pt-10">
        <Link href="/g7k-united"
          className="font-body text-gray-400 hover:text-ink text-xs tracking-widest uppercase transition-colors">
          {t.retour}
        </Link>
      </div>

      {/* Hero */}
      <section className="py-20 px-6 relative"
        style={{
          backgroundImage:    `url('${pole.image || "/images/event-placeholder.jpg"}')`,
          backgroundSize:     "cover",
          backgroundPosition: "center",
        }}>
        <div className="absolute inset-0 bg-black/70" />
        <div className="max-w-5xl mx-auto relative z-10">
          {categorie && (
            <p className="font-body text-white/60 text-xs tracking-[0.4em] uppercase mb-4">{categorie}</p>
          )}
          <h1 className="font-display text-5xl md:text-7xl text-white tracking-wider mb-5">{nom}</h1>
          <p className="font-body text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
      </section>

      {/* Présentation + responsables */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-16">

          <div>
            <h2 className="font-display text-2xl text-ink tracking-wider mb-4">{t.apropos}</h2>
            <div className="divider-left" />
            <p className="font-body text-gray-600 leading-relaxed whitespace-pre-line">{presentation}</p>

            {pole.instagram && (
              <a href={pole.instagram} target="_blank" rel="noopener noreferrer"
                style={{ color: ACCENT }}
                className="inline-block mt-8 font-body text-xs tracking-widest uppercase border-b border-gray-200 hover:border-current pb-0.5 transition-colors">
                {t.suivre} →
              </a>
            )}
          </div>

          {/* Responsables (bloc optionnel) */}
          {pole.responsables?.length > 0 && (
            <div>
              <h2 className="font-display text-2xl text-ink tracking-wider mb-4">{t.responsables}</h2>
              <div className="divider-left" />
              <div className="space-y-5 mt-8">
                {pole.responsables.map((r) => (
                  <div key={r.nom} className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-ash-dark overflow-hidden flex items-center justify-center flex-shrink-0">
                      {r.photo ? (
                        <img src={r.photo} alt={r.nom} className="w-full h-full object-cover"
                          onError={(e) => { e.target.style.display = "none"; }} />
                      ) : (
                        <span className="font-display text-lg text-gray-400">
                          {r.nom.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-body text-ink">{r.nom}</p>
                      {(isEn && r.role_en ? r.role_en : r.role) && (
                        <p className="font-body text-gray-400 text-xs">
                          {isEn && r.role_en ? r.role_en : r.role}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Les artistes du pôle : photo, bio et réseaux sociaux */}
      <section className="py-20 px-6 bg-ash">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-ink tracking-wider mb-2">{t.artistes}</h2>
          <div className="divider-left" />

          {pole.artistes?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {pole.artistes.map((artiste, i) => {
                const role     = isEn && artiste.role_en ? artiste.role_en : artiste.role;
                const bio      = isEn && artiste.bio_en  ? artiste.bio_en  : artiste.bio;
                const initiales = artiste.nom.split(" ").map((w) => w[0]).join("").slice(0, 2);

                return (
                  <article key={artiste.nom}
                    className="group flex flex-col bg-white border border-gray-100 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden">

                    {/* Portrait : nom et rôle posés sur l'image */}
                    <div className="relative aspect-[3/4] bg-ink overflow-hidden">
                      {artiste.photo ? (
                        <img src={artiste.photo} alt={artiste.nom}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700"
                          onError={(e) => { e.target.style.display = "none"; }} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="font-display text-6xl text-white/20">{initiales}</span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                      {/* Numéro d'ordre, clin d'œil éditorial */}
                      <span className="absolute top-5 right-5 font-display text-2xl text-white/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        {role && (
                          <p className="font-body text-white/70 text-[10px] tracking-[0.3em] uppercase mb-2">
                            {role}
                          </p>
                        )}
                        <h3 className="font-display text-3xl text-white tracking-wide leading-none">
                          {artiste.nom}
                        </h3>
                        <span
                          className="block h-0.5 w-8 mt-4 group-hover:w-16 transition-all duration-500"
                          style={{ backgroundColor: ACCENT }}
                        />
                      </div>
                    </div>

                    {/* Bio + réseaux */}
                    <div className="p-6 flex flex-col flex-1">
                      {bio && (
                        <p className="font-body text-gray-500 text-sm leading-relaxed mb-6 flex-1">{bio}</p>
                      )}

                      {artiste.reseaux && Object.keys(artiste.reseaux).length > 0 && (
                        <div className="flex flex-wrap gap-2.5">
                          {Object.entries(artiste.reseaux).map(([reseau, url]) => (
                            <a key={reseau} href={url} target="_blank" rel="noopener noreferrer"
                              title={reseau.charAt(0).toUpperCase() + reseau.slice(1)}
                              aria-label={`${artiste.nom} — ${reseau}`}
                              className="w-9 h-9 flex items-center justify-center border border-gray-200 text-gray-400 rounded-full hover:text-white hover:border-transparent hover:bg-[#980000] transition-all">
                              <IconeReseau nom={reseau} />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="font-body text-gray-400 py-10">{t.artistesVide}</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-ink text-center">
        <div className="max-w-xl mx-auto">
          <h3 className="font-display text-4xl text-white tracking-wider mb-4">{t.ctaTitre}</h3>
          <p className="font-body text-gray-400 leading-relaxed mb-8">{t.ctaTexte}</p>
          <Link href="/contact"
            className="inline-block bg-[#980000] text-white font-body font-semibold text-xs tracking-widest uppercase px-8 py-4 hover:bg-ink-light transition-all">
            {t.ctaBtn}
          </Link>
        </div>
      </section>

      {/* Navigation vers les autres pôles */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <p className="font-body text-gray-400 text-xs tracking-[0.4em] uppercase mb-6">{t.autres}</p>
        <div className="flex flex-wrap justify-center gap-3">
          {autres.map((p) => (
            <Link key={p.id} href={`/g7k-united/${p.slug}`}
              className="border border-gray-200 text-gray-500 hover:border-ink hover:text-ink font-body text-xs tracking-widest uppercase px-4 py-2 transition-all">
              {isEn && p.nom_en ? p.nom_en : p.nom}
            </Link>
          ))}
        </div>
      </section>

    </Layout>
  );
}
