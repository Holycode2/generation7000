// components/Navbar.jsx
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "../hooks/useTranslation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { t, locale } = useTranslation();

  const navLinks = [
    { href: "/",           label: t.nav.accueil },
    { href: "/apropos",    label: t.nav.vision },
    { href: "/evenements", label: t.nav.evenements },
    { href: "/cultes",     label: t.nav.cultes },
    { href: "/leaders",    label: t.nav.leaders },
    { href: "/medias",     label: t.nav.medias },
    { href: "/contact",    label: t.nav.contact },
  ];

  function switchLocale(newLocale) {
    router.push(router.pathname, router.pathname, { locale: newLocale });
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ink border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img src="/images/logo.png"  className="h-10 w-auto"
            onError={(e) => { e.target.style.display='none'; }} />
        </Link>

        {/* Menu desktop */}
        <ul className="hidden md:flex gap-7 items-center">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}
                className={`font-body text-sm tracking-wide transition-all duration-200 hover:text-white ${
                  router.pathname === href
                    ? "text-white font-semibold border-b-2 border-white pb-0.5"
                    : "text-white/60"
                }`}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Droite : langue + CTA */}
        <div className="hidden md:flex items-center gap-4">

          {/* Sélecteur de langue */}
          <div className="flex items-center gap-2">
            <button onClick={() => switchLocale('fr')}
              className={`font-body text-xs tracking-widest uppercase transition-colors ${
                locale === 'fr' ? 'text-[#980000] font-bold' : 'text-white/40 hover:text-white/70'
              }`}>
              FR
            </button>
            <span className="text-white/20">|</span>
            <button onClick={() => switchLocale('en')}
              className={`font-body text-xs tracking-widest uppercase transition-colors ${
                locale === 'en' ? 'text-[#980000] font-bold' : 'text-white/40 hover:text-white/70'
              }`}>
              EN
            </button>
          </div>

          {/* Bouton rejoindre */}
          <Link href="/contact"
            className="bg-[#980000] text-white font-body text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-gray-100 transition-all">
            {t.nav.rejoindre}
          </Link>
        </div>

        {/* Burger mobile */}
        <div className="md:hidden flex items-center gap-3">
          {/* Langue mobile */}
          <button onClick={() => switchLocale(locale === 'fr' ? 'en' : 'fr')}
            className="text-white/60 font-bold text-xs tracking-widest uppercase border border-white/40 px-2 py-1">
            {locale === 'fr' ? 'EN' : 'FR'}
          </button>

          <button className="p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <div className="w-6 flex flex-col gap-1.5">
              <span className="block h-0.5 bg-white transition-all" style={{ transform: menuOpen ? "rotate(45deg) translate(3px,3px)" : "" }} />
              <span className="block h-0.5 bg-white transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
              <span className="block h-0.5 bg-white transition-all" style={{ transform: menuOpen ? "rotate(-45deg) translate(3px,-3px)" : "" }} />
            </div>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden bg-ink border-t border-gray-800 px-6 py-6">
          <ul className="flex flex-col gap-4">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} onClick={() => setMenuOpen(false)}
                  className={`block font-body text-sm tracking-wide py-1 transition-colors hover:text-white ${
                    router.pathname === href ? "text-white font-semibold" : "text-white/60"
                  }`}>
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" onClick={() => setMenuOpen(false)}
                className="inline-block bg-[#980000] text-white text-xs tracking-widest uppercase px-5 py-2.5 mt-2">
                {t.nav.rejoindre}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
