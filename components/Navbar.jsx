// components/Navbar.jsx
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import siteConfig from "../data/siteConfig";
import { useTranslation } from "../hooks/useTranslation";

const ACCENT = "#980000";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { t, locale } = useTranslation();

  const navLinks = [
    { href: "/",            label: t.nav.accueil },
    { href: "/apropos",     label: t.nav.vision },
    { href: "/evenements",  label: t.nav.evenements },
    { href: "/g7k-united",  label: t.nav.united },
    { href: "/cultes",      label: t.nav.cultes },
    { href: "/leaders",     label: t.nav.leaders },
    { href: "/medias",      label: t.nav.medias },
    { href: "/contact",     label: t.nav.contact },
  ];

  // Ombre et fond plus dense dès que la page défile.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Le menu mobile se referme à chaque changement de page.
  useEffect(() => setMenuOpen(false), [router.asPath]);

  // Menu mobile ouvert : on bloque le défilement de la page et on écoute Échap.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => e.key === "Escape" && setMenuOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  function switchLocale(newLocale) {
    // On repasse les paramètres de route : sans eux, une page dynamique
    // enverrait vers "/evenements/[slug]" littéral, donc une 404.
    router.push({ pathname: router.pathname, query: router.query }, router.asPath, {
      locale: newLocale,
    });
  }

  // Le lien reste actif sur les sous-pages (ex : /evenements/abide).
  function estActif(href) {
    return href === "/"
      ? router.pathname === "/"
      : router.pathname === href || router.pathname.startsWith(`${href}/`);
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-ink/95 backdrop-blur-md border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
            : "bg-ink border-b border-white/5"
        }`}
      >
        <nav aria-label="Navigation principale" className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link
            href="/"
            aria-label={siteConfig.nom}
            className="flex items-center shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
          >
            <img
              src="/images/g7k_logo1.png"
              alt={siteConfig.nom}
              className={`w-auto transition-all duration-300 ${scrolled ? "h-8" : "h-10"}`}
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </Link>

          {/* Menu desktop */}
          <ul className="hidden lg:flex items-center gap-7">
            {navLinks.map(({ href, label }) => {
              const actif = estActif(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={actif ? "page" : undefined}
                    className={`group relative block font-body text-[13px] tracking-wide whitespace-nowrap py-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60 ${
                      actif ? "text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {label}
                    {/* Soulignement animé, plein sur la page active */}
                    <span
                      className={`absolute left-0 -bottom-0.5 h-[2px] transition-all duration-300 ${
                        actif ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                      style={{ backgroundColor: ACCENT }}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Droite : langue + CTA */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">

            {/* Sélecteur de langue */}
            <div
              role="group"
              aria-label="Langue"
              className="flex items-center border border-white/15 rounded-full overflow-hidden"
            >
              {["fr", "en"].map((code) => (
                <button
                  key={code}
                  onClick={() => switchLocale(code)}
                  aria-pressed={locale === code}
                  className={`font-body text-[11px] tracking-widest uppercase px-3 py-1.5 transition-colors ${
                    locale === code ? "bg-white/10 text-white font-semibold" : "text-white/45 hover:text-white/80"
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>

            {/* Bouton rejoindre */}
            <Link
              href="/contact"
              className="bg-[#980000] text-white font-body font-semibold text-[11px] tracking-widest uppercase px-6 py-2.5 hover:bg-[#b00000] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t.nav.rejoindre}
            </Link>
          </div>

          {/* Burger mobile */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => switchLocale(locale === "fr" ? "en" : "fr")}
              className="text-white/70 hover:text-white font-body font-semibold text-[11px] tracking-widest uppercase border border-white/20 rounded-full px-3 py-1.5 transition-colors"
            >
              {locale === "fr" ? "EN" : "FR"}
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              className="p-2 -mr-2 text-white"
            >
              <span className="block w-6 h-4 relative">
                <span
                  className="absolute left-0 block h-[2px] w-6 bg-white transition-all duration-300"
                  style={menuOpen ? { top: 7, transform: "rotate(45deg)" } : { top: 0 }}
                />
                <span
                  className="absolute left-0 top-[7px] block h-[2px] w-6 bg-white transition-all duration-300"
                  style={{ opacity: menuOpen ? 0 : 1 }}
                />
                <span
                  className="absolute left-0 block h-[2px] w-6 bg-white transition-all duration-300"
                  style={menuOpen ? { top: 7, transform: "rotate(-45deg)" } : { top: 14 }}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Panneau mobile plein écran */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-ink overflow-y-auto"
          >
            <div className="px-6 py-8 flex flex-col min-h-full">
              <ul className="flex flex-col">
                {navLinks.map(({ href, label }, i) => {
                  const actif = estActif(href);
                  return (
                    <motion.li
                      key={href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: 0.04 * i }}
                      className="border-b border-white/5"
                    >
                      <Link
                        href={href}
                        aria-current={actif ? "page" : undefined}
                        className="flex items-center justify-between py-4 group"
                      >
                        <span
                          className={`font-display text-2xl tracking-wider transition-colors ${
                            actif ? "text-white" : "text-white/60 group-hover:text-white"
                          }`}
                        >
                          {label}
                        </span>
                        <span
                          className="h-[2px] transition-all duration-300"
                          style={{ backgroundColor: ACCENT, width: actif ? 32 : 0 }}
                        />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <Link
                href="/contact"
                className="mt-8 bg-[#980000] text-white text-center font-body font-semibold text-xs tracking-widest uppercase px-6 py-4 hover:bg-[#b00000] transition-colors"
              >
                {t.nav.rejoindre}
              </Link>

              {/* Réseaux sociaux */}
              <div className="mt-auto pt-10">
                <p className="font-body text-white/35 text-[10px] tracking-[0.4em] uppercase mb-4">
                  {siteConfig.nom}
                </p>
                <div className="flex flex-wrap gap-2">
                  {Object.values(siteConfig.reseaux).map((r) => (
                    <a
                      key={r.url}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-white/50 hover:text-white border border-white/15 hover:border-white/40 px-3 py-1.5 transition-colors"
                    >
                      {r.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
