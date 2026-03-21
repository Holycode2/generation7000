// components/Navbar.jsx
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const navLinks = [
  { href: "/",           label: "Accueil" },
  { href: "/apropos",    label: "Vision" },
  { href: "/evenements", label: "Événements" },
  { href: "/cultes",     label: "Cultes" },
  { href: "/leaders",    label: "Leaders" },
  { href: "/medias",     label: "Médias" },
  { href: "/contact",    label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-black-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo / Nom */}
        <Link href="/" className="flex items-center gap-3">
          {/* Si tu as un logo : */}
          <img src="/images/logo.png" alt="G7000" className="h-8 w-auto"
            onError={(e) => { e.target.style.display='none'; }} />
        </Link>

        {/* Menu desktop */}
        <ul className="hidden md:flex gap-8 items-center">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`font-body text-sm tracking-wide transition-all duration-200 hover:text-white ${
                  router.pathname === href
                    ? "text-white font-semibold border-b-2 border-white pb-0.5"
                    : "text-gray-400"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Bouton CTA desktop */}
        <Link
          href="/contact"
          className="hidden md:block bg-white text-ink font-body text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-ink-light transition-all"
        >
          Nous rejoindre
        </Link>

        {/* Burger mobile */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className="block h-0.5 bg-white transition-all" style={{ transform: menuOpen ? "rotate(45deg) translate(3px,3px)" : "" }} />
            <span className="block h-0.5 bg-white transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="block h-0.5 bg-white transition-all" style={{ transform: menuOpen ? "rotate(-45deg) translate(3px,-3px)" : "" }} />
          </div>
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-6">
          <ul className="flex flex-col gap-4">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`block font-body text-sm tracking-wide py-1 transition-colors hover:text-ink ${
                    router.pathname === href ? "text-ink font-semibold" : "text-gray-400"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" onClick={() => setMenuOpen(false)}
                className="inline-block bg-ink text-white text-xs tracking-widest uppercase px-5 py-2.5 mt-2">
                Nous rejoindre
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
