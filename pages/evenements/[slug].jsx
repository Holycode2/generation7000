// pages/evenements/[slug].jsx — PAGE INDIVIDUELLE D'UN ÉVÉNEMENT — BILINGUE FR/EN
import Link from "next/link";
import Layout from "../../components/Layout";
import Remnant from "../../components/Remnant";
import evenements, {
  estPasse,
  prochaineSession,
  statutDe,
  statutJour,
  statutSession,
} from "../../data/evenements";
import fr from "../../locales/fr";
import en from "../../locales/en";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  PlayCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const ACCENT = "#980000";
const locales = { fr, en };

export async function getStaticPaths() {
  const langs = ["fr", "en"];
  const paths = [];
  evenements.forEach((evt) => {
    langs.forEach((locale) => {
      paths.push({ params: { slug: evt.slug }, locale });
    });
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale }) {
  const evenement = evenements.find((e) => e.slug === params.slug) || null;
  return { props: { evenement, locale: locale || "fr" } };
}

function tr(obj, isEn, champ) {
  return isEn && obj[`${champ}_en`] ? obj[`${champ}_en`] : obj[champ];
}

function Badge({ statut, t }) {
  const labels = { encours: t.encours, passe: t.passe, "a-venir": t.aVenir };
  const styles = {
    encours: { backgroundColor: ACCENT, color: "#fff" },
    "a-venir": { backgroundColor: "#fff", color: "#011224" },
    passe: { backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.8)" },
  };
  return (
    <span
      className="font-body text-[10px] tracking-[0.28em] uppercase px-3 py-1.5"
      style={styles[statut] || styles["a-venir"]}
    >
      {labels[statut]}
    </span>
  );
}

function LigneInfo({ Icone, label, valeur }) {
  if (!valeur) return null;
  return (
    <div className="flex gap-4 items-start">
      <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center shrink-0">
        <Icone className="w-4 h-4 text-gray-500" />
      </div>
      <div>
        <p className="font-body text-gray-400 text-[10px] tracking-[0.28em] uppercase mb-1">{label}</p>
        <p className="font-body text-ink text-sm leading-snug">{valeur}</p>
      </div>
    </div>
  );
}

function Portrait({ nom, photo, taille = "w-12 h-12" }) {
  const initiales = nom.split(" ").map((w) => w[0]).join("").slice(0, 2);
  return (
    <div className={`${taille} rounded-full overflow-hidden bg-ash-dark shrink-0 flex items-center justify-center`}>
      {photo ? (
        <img
          src={photo}
          alt={nom}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = "none"; }}
        />
      ) : (
        <span className="font-display text-sm text-gray-400">{initiales}</span>
      )}
    </div>
  );
}

export default function EvenementPage({ evenement, locale }) {
  const t = (locales[locale] || fr).eventDetail;
  if (!evenement) return null;

  const isEn = locale === "en";
  const titre = tr(evenement, isEn, "titre");
  const sousTitre = tr(evenement, isEn, "sousTitre");
  const theme = tr(evenement, isEn, "theme");
  const lieu = tr(evenement, isEn, "lieu");
  const description = tr(evenement, isEn, "description");

  const statut = statutDe(evenement);
  const passe = estPasse(evenement);
  const dateLongue = new Date(evenement.date).toLocaleDateString(isEn ? "en-US" : "fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  const lienAction = evenement.lienInscription || evenement.lienInstagram;
  const labelAction = evenement.lienInscription ? t.inscrire : t.suivre;
  const next = prochaineSession(evenement);
  const soirsNext = next?.jours?.length
    ? next.jours
    : (next?.date ? [{ date: next.date, heure: next.heure }] : []);

  return (
    <Layout
      title={titre}
      description={`${dateLongue} — ${lieu}. ${description}`.slice(0, 160)}
      image={evenement.image}
      url={`https://g7kministries.online/evenements/${evenement.slug}`}
    >

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[78vh] flex items-end overflow-hidden">
        {evenement.image && (
          <img
            src={evenement.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/25" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-28 pb-14 md:pb-20">
          <Link
            href="/evenements"
            className="inline-flex items-center gap-2 font-body text-white/60 hover:text-white text-xs tracking-widest uppercase mb-10 transition-colors"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            {t.retour}
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge statut={statut} t={t} />
            {sousTitre && (
              <p className="font-body text-white/55 text-xs tracking-[0.35em] uppercase">{sousTitre}</p>
            )}
            {evenement.sessions?.length > 0 && (
              <p className="font-body text-white/55 text-xs tracking-[0.22em] uppercase">
                {t.sessionsIntro(evenement.sessions.length)}
              </p>
            )}
          </div>

          <h1 className="font-display text-5xl md:text-7xl text-white tracking-wider leading-none mb-5 max-w-4xl">
            {titre}
          </h1>
          {theme && (
            <p className="font-accent italic text-white/75 text-xl md:text-2xl mb-8">« {theme} »</p>
          )}

          <div className="flex flex-wrap gap-x-7 gap-y-2 font-body text-white/70 text-sm">
            <span className="inline-flex items-center gap-2 capitalize">
              <CalendarDaysIcon className="w-4 h-4" /> {dateLongue}
            </span>
            {evenement.heure && (
              <span className="inline-flex items-center gap-2">
                <ClockIcon className="w-4 h-4" /> {evenement.heure}
              </span>
            )}
            <span className="inline-flex items-center gap-2">
              <MapPinIcon className="w-4 h-4" /> {lieu}
            </span>
          </div>

          {lienAction && !passe && (
            <a
              href={lienAction}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-10 bg-[#980000] text-white font-body font-semibold text-xs tracking-widest uppercase px-7 py-3.5 hover:bg-[#b00000] transition-colors"
            >
              {labelAction}
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
                <LigneInfo Icone={CalendarDaysIcon} label={t.date} valeur={dateLongue} />
                <LigneInfo Icone={ClockIcon} label={t.heure} valeur={evenement.heure} />
                <LigneInfo Icone={MapPinIcon} label={t.lieu} valeur={lieu} />
                <LigneInfo Icone={SparklesIcon} label={t.theme} valeur={theme} />
              </div>
              {lienAction && (
                <a
                  href={lienAction}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-full justify-center items-center gap-2 bg-[#980000] text-white font-body font-semibold text-[11px] tracking-widest uppercase px-5 py-3.5 hover:bg-ink transition-colors"
                >
                  {labelAction}
                  <ArrowUpRightIcon className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {next && !passe && (
              <div className="border border-gray-100 p-7">
                <p className="font-body text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: ACCENT }}>
                  {t.prochaine}
                </p>
                <p className="font-display text-2xl text-ink tracking-wide leading-tight mb-3">
                  {tr(next, isEn, "theme") || titre}
                </p>
                <ul className="space-y-1.5">
                  {soirsNext.map((soir) => (
                    <li key={soir.date} className="font-body text-gray-500 text-sm capitalize">
                      {new Date(soir.date).toLocaleDateString(isEn ? "en-US" : "fr-FR", {
                        weekday: "long", day: "numeric", month: "long",
                      })}
                      {soir.heure ? ` · ${soir.heure}` : ""}
                    </li>
                  ))}
                </ul>
                {next.intervenant?.nom && (
                  <div className="flex items-center gap-3 mt-5 pt-5 border-t border-gray-100">
                    <Portrait nom={next.intervenant.nom} photo={next.intervenant.photo} />
                    <div>
                      <p className="font-body text-ink text-sm">{next.intervenant.nom}</p>
                      <p className="font-body text-gray-400 text-xs">
                        {tr(next.intervenant, isEn, "role")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </aside>

          <div>
            {description && (
              <div className="mb-14">
                <p className="flex items-center gap-3 font-body text-gray-400 text-[10px] tracking-[0.35em] uppercase mb-3">
                  <Remnant tone="dark" />
                  {t.description}
                </p>
                <h2 className="font-display text-3xl md:text-4xl text-ink tracking-wider mb-6">{titre}</h2>
                <p className="font-body text-gray-600 text-lg leading-relaxed whitespace-pre-line">{description}</p>
              </div>
            )}

            {evenement.programme?.length > 0 && (
              <div className="mb-14">
                <h2 className="font-display text-2xl text-ink tracking-wider mb-2">{t.programme}</h2>
                <div className="w-10 h-px bg-ink mb-8" />
                <ol className="space-y-0">
                  {evenement.programme.map((etape, i) => (
                    <li key={i} className="grid grid-cols-[5.5rem_1fr] gap-5 py-5 border-b border-gray-100 last:border-0">
                      <p className="font-body text-gray-400 text-xs tracking-widest uppercase pt-1">
                        {etape.heure || String(i + 1).padStart(2, "0")}
                      </p>
                      <div>
                        <p className="font-display text-xl text-ink tracking-wide">
                          {tr(etape, isEn, "titre")}
                        </p>
                        {tr(etape, isEn, "description") && (
                          <p className="font-body text-gray-500 text-sm leading-relaxed mt-1">
                            {tr(etape, isEn, "description")}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {evenement.intervenants?.length > 0 && (
              <div>
                <h2 className="font-display text-2xl text-ink tracking-wider mb-2">{t.intervenants}</h2>
                <div className="w-10 h-px bg-ink mb-8" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {evenement.intervenants.map((p) => (
                    <div key={p.nom} className="flex items-center gap-4 border border-gray-100 p-4">
                      <Portrait nom={p.nom} photo={p.photo} taille="w-14 h-14" />
                      <div>
                        <p className="font-display text-lg text-ink tracking-wide">{p.nom}</p>
                        {tr(p, isEn, "role") && (
                          <p className="font-body text-gray-400 text-xs">{tr(p, isEn, "role")}</p>
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

      {/* ── SESSIONS ─────────────────────────────────────── */}
      {evenement.sessions?.length > 0 && (
        <section className="py-20 px-6 bg-ash">
          <div className="max-w-5xl mx-auto">
            <p className="font-body text-gray-400 text-[10px] tracking-[0.35em] uppercase mb-3">
              {t.sessionsIntro(evenement.sessions.length)}
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-ink tracking-wider mb-12">{t.sessions}</h2>

            <div className="space-y-6">
              {evenement.sessions.map((s, i) => {
                const sTheme = tr(s, isEn, "theme");
                const sResume = tr(s, isEn, "resume");
                const sVerset = tr(s, isEn, "verset");
                const sRole = s.intervenant ? tr(s.intervenant, isEn, "role") : "";
                const sStatut = statutSession(s);
                const soirs = s.jours?.length
                  ? s.jours
                  : (s.date ? [{ date: s.date, heure: s.heure }] : []);
                const etiq = sStatut === "encours" ? t.sessionNow : sStatut === "passe" ? t.sessionFaite : t.sessionSoon;
                const etiqStyle = {
                  encours: { backgroundColor: ACCENT, color: "#fff" },
                  passe: { backgroundColor: "#e5e7eb", color: "#6b7280" },
                  "a-venir": { backgroundColor: "#011224", color: "#fff" },
                }[sStatut];

                return (
                  <article key={i} className="bg-white overflow-hidden card-shadow">
                    <div className="grid grid-cols-1 md:grid-cols-[7.5rem_1fr]">
                      <div className="bg-ink text-white flex flex-col items-center justify-center py-8 md:py-10 px-4">
                        <span className="font-display text-4xl leading-none text-white/90">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="block w-6 h-px my-3" style={{ backgroundColor: ACCENT }} />
                        <span className="font-body text-[10px] tracking-[0.18em] uppercase text-white/50 text-center leading-relaxed">
                          {t.deuxSoirs}
                        </span>
                      </div>

                      <div className="p-7 md:p-9">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className="font-body text-[10px] tracking-[0.22em] uppercase px-2.5 py-1" style={etiqStyle}>
                            {etiq}
                          </span>
                        </div>

                        <h3 className="font-display text-2xl md:text-3xl text-ink tracking-wide mb-6">{sTheme}</h3>

                        {s.intervenant?.nom && (
                          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                            <Portrait nom={s.intervenant.nom} photo={s.intervenant.photo} taille="w-14 h-14" />
                            <div>
                              <p className="font-body text-gray-400 text-[10px] tracking-[0.28em] uppercase mb-0.5">
                                {t.intervenant}
                              </p>
                              <p className="font-display text-xl text-ink tracking-wide">{s.intervenant.nom}</p>
                              {sRole && <p className="font-body text-gray-400 text-xs">{sRole}</p>}
                            </div>
                          </div>
                        )}

                        {soirs.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                            {soirs.map((soir) => {
                              const jStatut = statutJour(soir);
                              const jLabel = isEn && soir.jour_en ? soir.jour_en : (soir.jour || t.jeudi);
                              return (
                                <div key={soir.date} className="border border-gray-100 px-5 py-4">
                                  <p className="font-body text-[10px] tracking-[0.28em] uppercase mb-1" style={{ color: ACCENT }}>
                                    {jLabel}
                                  </p>
                                  <p className="font-display text-xl text-ink tracking-wide capitalize">
                                    {new Date(soir.date).toLocaleDateString(isEn ? "en-US" : "fr-FR", {
                                      day: "numeric", month: "long",
                                    })}
                                  </p>
                                  {soir.heure && (
                                    <p className="font-body text-gray-500 text-sm mt-1">{soir.heure}</p>
                                  )}
                                  {jStatut === "encours" && (
                                    <p className="font-body text-[10px] tracking-widest uppercase mt-2" style={{ color: ACCENT }}>
                                      {t.sessionNow}
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {sResume && sResume.trim() && (
                          <div className="mb-5">
                            <p className="font-body text-gray-400 text-[10px] tracking-[0.28em] uppercase mb-2">{t.resume}</p>
                            <p className="font-body text-gray-600 leading-relaxed whitespace-pre-line">{sResume}</p>
                          </div>
                        )}

                        {sVerset && sVerset.trim() && (
                          <blockquote className="border-l-2 pl-5 my-5" style={{ borderColor: ACCENT }}>
                            <p className="font-accent italic text-gray-700 leading-relaxed">{sVerset}</p>
                          </blockquote>
                        )}

                        {s.photos?.length > 0 && (
                          <div className="mt-6">
                            <p className="font-body text-gray-400 text-[10px] tracking-[0.28em] uppercase mb-3">{t.enPhotos}</p>
                            <div className={`grid gap-2 ${s.photos.length === 1 ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-3"}`}>
                              {s.photos.map((photo, j) => (
                                <div
                                  key={photo}
                                  className={`overflow-hidden bg-ash-dark ${j === 0 && s.photos.length > 1 ? "sm:col-span-2 sm:row-span-2" : "aspect-[4/3]"}`}
                                >
                                  <img
                                    src={photo}
                                    alt={`${sTheme} — ${j + 1}`}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    onError={(e) => { e.target.style.display = "none"; }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {s.lienReplay && (
                          <a
                            href={s.lienReplay}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-6 font-body text-xs tracking-widest uppercase"
                            style={{ color: ACCENT }}
                          >
                            <PlayCircleIcon className="w-4 h-4" />
                            {t.replay}
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── GALERIE ──────────────────────────────────────── */}
      {evenement.galerie?.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl text-ink tracking-wider mb-8">{t.galerie}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {evenement.galerie.map((photo, i) => (
                <div key={photo} className="aspect-[4/3] bg-ash-dark overflow-hidden">
                  <img
                    src={photo}
                    alt={`${titre} — ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-14 px-6 text-center border-t border-gray-100">
        <Link
          href="/evenements"
          className="inline-flex items-center gap-2 border border-ink text-ink font-body text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-ink hover:text-white transition-all"
        >
          <ArrowLeftIcon className="w-3.5 h-3.5" />
          {t.retour}
        </Link>
      </section>
    </Layout>
  );
}
