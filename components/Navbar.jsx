// components/Navbar.jsx
// Barre de navigation flottante : une pilule détachée du bord de l'écran, qui
// se pose par-dessus le contenu. Layout ne réserve donc plus d'espace en haut,
// ce qui permet aux images de hero de monter jusqu'au bord supérieur.
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

  // La pilule se resserre et s'opacifie dès que la page défile.
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
    // Les marges du conteneur créent le flottement. `pointer-events-none` évite
    // que ces gouttières transparentes n'interceptent les clics de la page.
    <div
      className={`fixed top-0 inset-x-0 z-50 px-3 sm:px-5 pointer-events-none transition-all duration-300 ${
        scrolled ? "pt-2 sm:pt-3" : "pt-3 sm:pt-5"
      }`}
    >
      <div className="pointer-events-auto max-w-6xl mx-auto">

        <nav
          aria-label="Navigation principale"
          className={`rounded-full border backdrop-blur-xl transition-all duration-300 ${
            scrolled
              ? "bg-ink/95 border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
              : "bg-ink/85 border-white/10 shadow-[0_8px_28px_rgba(0,0,0,0.22)]"
          }`}
        >
          <div className="h-14 px-5 sm:px-6 flex items-center justify-between gap-6">

            {/* Logo */}
            <Link
              href="/"
              aria-label={siteConfig.nom}
              className="flex items-center shrink-0 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
            >
              {/* Version détourée du logo : l'original a de larges marges
                  transparentes qui le réduisaient à quelques pixels. */}
              <img
                src="/images/g7k_logo_nav.png"
                alt={siteConfig.nom}
                className="h-7 w-auto"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </Link>

            {/* Menu desktop */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map(({ href, label }) => {
                const actif = estActif(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={actif ? "page" : undefined}
                      className={`block font-body text-[13px] tracking-wide whitespace-nowrap rounded-full px-3.5 py-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 ${
                        actif
                          ? "bg-white/10 text-white"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Droite : langue + CTA */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">

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

              <Link
                href="/contact"
                className="bg-[#980000] text-white font-body font-semibold text-[11px] tracking-widest uppercase rounded-full px-5 py-2.5 hover:bg-[#b00000] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t.nav.rejoindre}
              </Link>
            </div>

            {/* Burger mobile */}
            <div className="lg:hidden flex items-center gap-2">
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
                className="w-9 h-9 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
              >
                <span className="block w-5 h-4 relative">
                  <span
                    className="absolute left-0 block h-[2px] w-5 bg-white rounded-full transition-all duration-300"
                    style={menuOpen ? { top: 7, transform: "rotate(45deg)" } : { top: 0 }}
                  />
                  <span
                    className="absolute left-0 top-[7px] block h-[2px] w-5 bg-white rounded-full transition-all duration-300"
                    style={{ opacity: menuOpen ? 0 : 1 }}
                  />
                  <span
                    className="absolute left-0 block h-[2px] w-5 bg-white rounded-full transition-all duration-300"
                    style={menuOpen ? { top: 7, transform: "rotate(-45deg)" } : { top: 14 }}
                  />
                </span>
              </button>
            </div>
          </div>
        </nav>

        {/* Panneau mobile : une carte flottante sous la pilule */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="menu-mobile"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="lg:hidden mt-2 rounded-3xl bg-ink/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <div className="max-h-[calc(100vh-7rem)] overflow-y-auto px-6 py-5">
                <ul className="flex flex-col">
                  {navLinks.map(({ href, label }, i) => {
                    const actif = estActif(href);
                    return (
                      <motion.li
                        key={href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: 0.03 * i }}
                        className="border-b border-white/5 last:border-0"
                      >
                        <Link
                          href={href}
                          aria-current={actif ? "page" : undefined}
                          className="flex items-center justify-between py-3.5 group"
                        >
                          <span
                            className={`font-display text-xl tracking-wider transition-colors ${
                              actif ? "text-white" : "text-white/60 group-hover:text-white"
                            }`}
                          >
                            {label}
                          </span>
                          <span
                            className="h-[2px] rounded-full transition-all duration-300"
                            style={{ backgroundColor: ACCENT, width: actif ? 28 : 0 }}
                          />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                <Link
                  href="/contact"
                  className="block mt-5 bg-[#980000] text-white text-center font-body font-semibold text-xs tracking-widest uppercase rounded-full px-6 py-3.5 hover:bg-[#b00000] transition-colors"
                >
                  {t.nav.rejoindre}
                </Link>

                <div className="flex flex-wrap gap-2 mt-6">
                  {Object.values(siteConfig.reseaux).map((r) => (
                    <a
                      key={r.url}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-white/50 hover:text-white border border-white/15 hover:border-white/40 rounded-full px-3 py-1.5 transition-colors"
                    >
                      {r.label.trim()}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
