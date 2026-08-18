// components/Footer.jsx
import Link from "next/link";
import { ArrowUpIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import siteConfig from "../data/siteConfig";
import talents from "../data/talents";
import { tousTries } from "../data/evenements";
import IconeReseau from "./IconeReseau";
import Newsletter from "./Newsletter";
import Remnant from "./Remnant";
import { useTranslation } from "../hooks/useTranslation";

const ACCENT = "#980000";

export default function Footer() {
  const { nom, email, telephone, reseaux } = siteConfig;
  const { t, locale } = useTranslation();
  const isEn = locale === "en";

  const poles    = talents.slice(0, 5);
  const prochains = tousTries().slice(0, 2);

  const navLinks = [
    ["/",            t.nav.accueil],
    ["/apropos",     t.nav.vision],
    ["/evenements",  t.nav.evenements],
    ["/g7k-united",  t.nav.united],
    ["/cultes",      t.nav.cultes],
    ["/leaders",     t.nav.leaders],
    ["/medias",      t.nav.medias],
    ["/contact",     t.nav.contact],
  ];

  return (
    <footer className="bg-ink text-white mt-24">

      {/* ── SIGNATURE ─────────────────────────────────────── */}
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">

          <div>
            <p className="flex items-center gap-3 font-body text-white/40 text-[10px] tracking-[0.4em] uppercase mb-5">
              <Remnant tone="light" />
              {t.footer.verset}
            </p>
            <h2 className="font-display text-5xl md:text-6xl tracking-wider leading-none">
              GÉNÉRATION <span style={{ color: ACCENT }}>7000</span>
            </h2>
            <p className="font-accent italic text-white/50 text-lg mt-4">{t.footer.slogan}</p>
          </div>

          <div className="lg:text-right">
            <p className="font-body text-white/50 text-sm leading-relaxed max-w-sm lg:ml-auto mb-6">
              {t.footer.desc}
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#980000] text-white font-body font-semibold text-[11px] tracking-widest uppercase px-7 py-3.5 hover:bg-[#b00000] transition-colors"
            >
              {t.footer.rejoindre}
            </Link>
          </div>
        </div>
      </div>

      {/* ── NEWSLETTER ────────────────────────────────────── */}
      <Newsletter />

      {/* ── COLONNES ──────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Navigation */}
        <nav aria-label={t.footer.nav}>
          <h3 className="font-body font-semibold text-[10px] tracking-[0.35em] uppercase text-white/40 mb-5">
            {t.footer.nav}
          </h3>
          <ul className="space-y-2.5">
            {navLinks.map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group inline-flex items-center gap-2 text-white/60 text-sm hover:text-white transition-colors"
                >
                  <span
                    className="h-px w-0 group-hover:w-3 transition-all duration-300"
                    style={{ backgroundColor: ACCENT }}
                  />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Pôles G7K United */}
        <div>
          <h3 className="font-body font-semibold text-[10px] tracking-[0.35em] uppercase text-white/40 mb-5">
            {t.footer.poles}
          </h3>
          <ul className="space-y-2.5">
            {poles.map((pole) => (
              <li key={pole.id}>
                <Link
                  href={`/g7k-united/${pole.slug}`}
                  className="text-white/60 text-sm hover:text-white transition-colors"
                >
                  {isEn && pole.nom_en ? pole.nom_en : pole.nom}
                </Link>
              </li>
            ))}
            <li className="pt-1">
              <Link
                href="/g7k-united"
                style={{ color: ACCENT }}
                className="font-body text-[11px] tracking-widest uppercase hover:opacity-70 transition-opacity"
              >
                {t.footer.tousPoles} →
              </Link>
            </li>
          </ul>
        </div>

        {/* Agenda */}
        <div>
          <h3 className="font-body font-semibold text-[10px] tracking-[0.35em] uppercase text-white/40 mb-5">
            {t.footer.agenda}
          </h3>
          <ul className="space-y-4">
            {prochains.map((evt) => (
              <li key={evt.id}>
                <Link href={`/evenements/${evt.slug}`} className="group block">
                  <span className="block font-body text-white/35 text-[11px] tracking-widest uppercase mb-1">
                    {new Date(evt.date).toLocaleDateString(isEn ? "en-US" : "fr-FR", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </span>
                  <span className="block font-display text-lg tracking-wide text-white/70 group-hover:text-white transition-colors">
                    {isEn && evt.titre_en ? evt.titre_en : evt.titre}
                  </span>
                </Link>
              </li>
            ))}
            <li className="pt-1">
              <Link
                href="/evenements"
                style={{ color: ACCENT }}
                className="font-body text-[11px] tracking-widest uppercase hover:opacity-70 transition-opacity"
              >
                {t.footer.tousEvents} →
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact + réseaux */}
        <div>
          <h3 className="font-body font-semibold text-[10px] tracking-[0.35em] uppercase text-white/40 mb-5">
            {t.footer.contact}
          </h3>

          <a
            href={`mailto:${email}`}
            className="group flex items-start gap-3 text-white/60 text-sm hover:text-white transition-colors mb-3"
          >
            <EnvelopeIcon className="w-4 h-4 mt-0.5 shrink-0 text-white/30 group-hover:text-white transition-colors" />
            <span className="break-all">{email}</span>
          </a>

          {telephone && (
            <a
              href={`tel:${telephone.replace(/[^\d+]/g, "")}`}
              className="group flex items-center gap-3 text-white/60 text-sm hover:text-white transition-colors mb-7"
            >
              <PhoneIcon className="w-4 h-4 shrink-0 text-white/30 group-hover:text-white transition-colors" />
              {telephone}
            </a>
          )}

          <h3 className="font-body font-semibold text-[10px] tracking-[0.35em] uppercase text-white/40 mb-4">
            {t.footer.suivre}
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {Object.entries(reseaux).map(([cle, r]) => (
              <a
                key={r.url}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                title={r.label.trim()}
                aria-label={r.label.trim()}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/15 text-white/50 hover:text-white hover:border-transparent hover:bg-[#980000] transition-all"
              >
                <IconeReseau nom={cle} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── BARRE BASSE ───────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/35 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} {nom} {t.footer.copy}
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 text-white/40 hover:text-white font-body text-[10px] tracking-[0.3em] uppercase transition-colors"
          >
            {t.footer.haut}
            <span className="w-7 h-7 flex items-center justify-center rounded-full border border-white/15 group-hover:border-white/50 transition-colors">
              <ArrowUpIcon className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
