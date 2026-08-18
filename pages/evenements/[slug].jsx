// pages/evenements/[slug].jsx — PAGE INDIVIDUELLE D'UN ÉVÉNEMENT — BILINGUE FR/EN
import Link from "next/link";
import Layout from "../../components/Layout";
import evenements, { estPasse } from "../../data/evenements";
import { CalendarDaysIcon, ClockIcon, MapPinIcon, SparklesIcon } from "@heroicons/react/24/outline";

const ACCENT = "#980000";

const TEXTES = {
  fr: {
    retour:       "← Retour aux événements",
    aVenir:       "À venir",
    passe:        "Événement passé",
    date:         "Date",
    heure:        "Heure",
    lieu:         "Lieu",
    theme:        "Thème",
    description:  "À propos de cet événement",
    programme:    "Déroulé d'une soirée",
    sessions:     "LES ENSEIGNEMENTS",
    intervenant:  "Intervenant",
    resume:       "Ce qui a été partagé",
    enPhotos:     "En images",
    replay:       "Revoir l'enseignement",
    intervenants: "Intervenants",
    galerie:      "En images",
    suivre:       "Suivre en direct",
    inscrire:     "S'inscrire",
  },
  en: {
    retour:       "← Back to events",
    aVenir:       "Upcoming",
    passe:        "Past event",
    date:         "Date",
    heure:        "Time",
    lieu:         "Location",
    theme:        "Theme",
    description:  "About this event",
    programme:    "How an evening unfolds",
    sessions:     "THE TEACHINGS",
    intervenant:  "Speaker",
    resume:       "What was shared",
    enPhotos:     "In pictures",
    replay:       "Watch the replay",
    intervenants: "Speakers",
    galerie:      "In pictures",
    suivre:       "Watch live",
    inscrire:     "Register",
  },
};

// Une page statique par événement et par langue.
export async function getStaticPaths() {
  const locales = ["fr", "en"];
  const paths = [];
  evenements.forEach((evt) => {
    locales.forEach((locale) => {
      paths.push({ params: { slug: evt.slug }, locale });
    });
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale }) {
  const evenement = evenements.find((e) => e.slug === params.slug) || null;
  return { props: { evenement, locale: locale || "fr" } };
}

export default function EvenementPage({ evenement, locale }) {
  const t = TEXTES[locale] || TEXTES.fr;
  if (!evenement) return null;

  const isEn = locale === "en";
  const tr = (champ) => (isEn && evenement[`${champ}_en`] ? evenement[`${champ}_en`] : evenement[champ]);

  const titre       = tr("titre");
  const sousTitre   = tr("sousTitre");
  const theme       = tr("theme");
  const lieu        = tr("lieu");
  const description = tr("description");

  const passe      = estPasse(evenement);
  const dateLongue = new Date(evenement.date).toLocaleDateString(isEn ? "en-US" : "fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  const lienAction  = evenement.lienInscription || evenement.lienInstagram;
  const labelAction = evenement.lienInscription ? t.inscrire : t.suivre;

  return (
    <Layout
      title={titre}
      description={`${dateLongue} — ${lieu}. ${description}`.slice(0, 160)}
      image={evenement.image}
      url={`https://g7kministries.online/evenements/${evenement.slug}`}
    >

      {/* Retour */}
      <div className="max-w-5xl mx-auto px-6 pt-10">
        <Link href="/evenements" className="font-body text-gray-400 hover:text-ink text-xs tracking-widest uppercase transition-colors">
          {t.retour}
        </Link>
      </div>

      {/* Hero avec l'affiche en fond */}
      <section className="py-20 px-6 relative"
        style={{
          backgroundImage:    `url('${evenement.image || "/images/event-placeholder.jpg"}')`,
          backgroundSize:     "cover",
          backgroundPosition: "center",
        }}>
        <div className="absolute inset-0 bg-black/70" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-wrap items-center gap-4 mb-5">
            <span
              className="font-body text-white text-[10px] tracking-[0.3em] uppercase px-3 py-1.5"
              style={{ backgroundColor: passe ? "rgba(255,255,255,0.15)" : ACCENT }}
            >
              {passe ? t.passe : t.aVenir}
            </span>
            {sousTitre && (
              <p className="font-body text-white/60 text-xs tracking-[0.4em] uppercase">{sousTitre}</p>
            )}
          </div>

          <h1 className="font-display text-5xl md:text-7xl text-white tracking-wider mb-4">{titre}</h1>

          {theme && (
            <p className="font-accent italic text-white/70 text-lg md:text-xl mb-6">« {theme} »</p>
          )}

          <div className="flex flex-wrap gap-x-8 gap-y-2 font-body text-white/70 text-sm">
            <span className="capitalize">{dateLongue}</span>
            {evenement.heure && <span>{evenement.heure}</span>}
            <span>{lieu}</span>
          </div>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-16">

          {/* Infos pratiques + action */}
          <div>
            <div className="space-y-6">
              <div className="flex gap-5 items-start">
                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <CalendarDaysIcon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-body text-gray-400 text-xs tracking-widest uppercase mb-1">{t.date}</p>
                  <p className="font-body text-gray-700 capitalize">{dateLongue}</p>
                </div>
              </div>

              {evenement.heure && (
                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <ClockIcon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-body text-gray-400 text-xs tracking-widest uppercase mb-1">{t.heure}</p>
                    <p className="font-display text-xl text-ink">{evenement.heure}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-5 items-start">
                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-body text-gray-400 text-xs tracking-widest uppercase mb-1">{t.lieu}</p>
                  <p className="font-body text-gray-700">{lieu}</p>
                </div>
              </div>

              {theme && (
                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <SparklesIcon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-body text-gray-400 text-xs tracking-widest uppercase mb-1">{t.theme}</p>
                    <p className="font-body text-gray-700">{theme}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bouton d'action : inscription si fournie, sinon lien Instagram */}
            {lienAction && (
              <a href={lienAction} target="_blank" rel="noopener noreferrer"
                className="mt-10 inline-flex w-full justify-center bg-[#980000] text-white font-body font-semibold text-xs tracking-widest uppercase px-8 py-4 hover:bg-ink-light transition-all">
                {labelAction}
              </a>
            )}
          </div>

          {/* Description + programme + intervenants */}
          <div>
            <h2 className="font-display text-2xl text-ink tracking-wider mb-4">{t.description}</h2>
            <div className="divider-left" />
            <p className="font-body text-gray-600 leading-relaxed whitespace-pre-line mb-12">{description}</p>

            {/* Programme */}
            {evenement.programme?.length > 0 && (
              <div className="mb-12">
                <h2 className="font-display text-2xl text-ink tracking-wider mb-4">{t.programme}</h2>
                <div className="divider-left" />
                <ol className="border-l border-gray-200 space-y-8 pl-8 mt-8">
                  {evenement.programme.map((etape, i) => (
                    <li key={i} className="relative">
                      <span
                        className="absolute -left-[37px] top-1.5 w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: ACCENT }}
                      />
                      {etape.heure && (
                        <p className="font-body text-gray-400 text-xs tracking-widest uppercase mb-1">
                          {etape.heure}
                        </p>
                      )}
                      <p className="font-display text-xl text-ink tracking-wide">
                        {isEn && etape.titre_en ? etape.titre_en : etape.titre}
                      </p>
                      {(isEn && etape.description_en ? etape.description_en : etape.description) && (
                        <p className="font-body text-gray-500 text-sm leading-relaxed mt-1">
                          {isEn && etape.description_en ? etape.description_en : etape.description}
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Intervenants */}
            {evenement.intervenants?.length > 0 && (
              <div>
                <h2 className="font-display text-2xl text-ink tracking-wider mb-4">{t.intervenants}</h2>
                <div className="divider-left" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                  {evenement.intervenants.map((p) => (
                    <div key={p.nom} className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-ash-dark overflow-hidden flex items-center justify-center flex-shrink-0">
                        {p.photo ? (
                          <img src={p.photo} alt={p.nom} className="w-full h-full object-cover"
                            onError={(e) => { e.target.style.display = "none"; }} />
                        ) : (
                          <span className="font-display text-lg text-gray-400">
                            {p.nom.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-body text-ink">{p.nom}</p>
                        {(isEn && p.role_en ? p.role_en : p.role) && (
                          <p className="font-body text-gray-400 text-xs">
                            {isEn && p.role_en ? p.role_en : p.role}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Les rendez-vous de l'événement : intervenant, thème et récap en images */}
      {evenement.sessions?.length > 0 && (
        <section className="py-20 px-6 bg-ash">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-ink tracking-wider">{t.sessions}</h2>
            <div className="divider-left" />

            <div className="space-y-8 mt-10">
              {evenement.sessions.map((s, i) => {
                const sTheme  = isEn && s.theme_en  ? s.theme_en  : s.theme;
                const sResume = isEn && s.resume_en ? s.resume_en : s.resume;
                const sVerset = isEn && s.verset_en ? s.verset_en : s.verset;
                const sRole   = s.intervenant && (isEn && s.intervenant.role_en ? s.intervenant.role_en : s.intervenant.role);
                const sDate   = s.date
                  ? new Date(s.date).toLocaleDateString(isEn ? "en-US" : "fr-FR", {
                      day: "numeric", month: "long", year: "numeric",
                    })
                  : null;

                return (
                  <article key={i} className="bg-white border border-gray-100 card-shadow">

                    {/* En-tête : numéro, date, thème */}
                    <div className="flex flex-col sm:flex-row gap-6 p-8 border-b border-gray-100">
                      <div className="flex items-start gap-5 flex-1">
                        <span className="font-display text-4xl leading-none text-gray-200">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          {(sDate || s.heure) && (
                            <p className="font-body text-gray-400 text-xs tracking-widest uppercase mb-2">
                              {sDate}{s.heure ? ` · ${s.heure}` : ""}
                            </p>
                          )}
                          <h3 className="font-display text-2xl md:text-3xl text-ink tracking-wide">
                            {sTheme}
                          </h3>
                        </div>
                      </div>

                      {/* Intervenant de la session */}
                      {s.intervenant?.nom && (
                        <div className="flex items-center gap-4 sm:border-l sm:border-gray-100 sm:pl-6">
                          <div className="w-12 h-12 bg-ash-dark overflow-hidden flex items-center justify-center flex-shrink-0 rounded-full">
                            {s.intervenant.photo ? (
                              <img src={s.intervenant.photo} alt={s.intervenant.nom}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.style.display = "none"; }} />
                            ) : (
                              <span className="font-display text-base text-gray-400">
                                {s.intervenant.nom.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-body text-gray-400 text-[10px] tracking-widest uppercase">
                              {t.intervenant}
                            </p>
                            <p className="font-body text-ink text-sm">{s.intervenant.nom}</p>
                            {sRole && <p className="font-body text-gray-400 text-xs">{sRole}</p>}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Récap de l'enseignement */}
                    <div className="p-8">
                      {sResume && (
                        <>
                          <p className="font-body text-gray-400 text-xs tracking-widest uppercase mb-3">
                            {t.resume}
                          </p>
                          <p className="font-body text-gray-600 leading-relaxed whitespace-pre-line">
                            {sResume}
                          </p>
                        </>
                      )}

                      {sVerset && (
                        <blockquote className="border-l-2 pl-6 mt-6" style={{ borderColor: ACCENT }}>
                          <p className="font-accent italic text-gray-700 leading-relaxed">{sVerset}</p>
                        </blockquote>
                      )}

                      {/* Récap en photos */}
                      {s.photos?.length > 0 && (
                        <div className="mt-8">
                          <p className="font-body text-gray-400 text-xs tracking-widest uppercase mb-4">
                            {t.enPhotos}
                          </p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {s.photos.map((photo, j) => (
                              <div key={photo} className="aspect-[4/3] bg-ash-dark overflow-hidden">
                                <img src={photo} alt={`${sTheme} — ${j + 1}`}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                  onError={(e) => { e.target.style.display = "none"; }} />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {s.lienReplay && (
                        <a href={s.lienReplay} target="_blank" rel="noopener noreferrer"
                          style={{ color: ACCENT }}
                          className="inline-block mt-8 font-body text-xs tracking-widest uppercase border-b border-gray-200 hover:border-current pb-0.5 transition-colors">
                          {t.replay} →
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Galerie (événements passés) */}
      {evenement.galerie?.length > 0 && (
        <section className="py-16 px-6 bg-ash">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl text-ink tracking-wider mb-8">{t.galerie}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {evenement.galerie.map((photo, i) => (
                <div key={photo} className="aspect-square bg-ash-dark overflow-hidden">
                  <img src={photo} alt={`${titre} — ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.style.display = "none"; }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Retour */}
      <section className="py-12 px-6 text-center">
        <Link href="/evenements"
          className="border border-ink text-ink font-body text-xs tracking-widest uppercase px-8 py-3 hover:bg-ink hover:text-white transition-all">
          {t.retour}
        </Link>
      </section>

    </Layout>
  );
}
