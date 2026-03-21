// components/Footer.jsx
import Link from "next/link";
import siteConfig from "../data/siteConfig";

export default function Footer() {
  const { nom, slogan, email, reseaux } = siteConfig;

  return (
    <footer className="bg-ink text-white mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Colonne 1 */}
        <div>
          <h3 className="font-display text-2xl tracking-wider mb-2">{nom}</h3>
          <p className="font-accent italic text-gray-400 text-sm mb-4">{slogan}</p>
          <p className="text-gray-500 text-sm leading-relaxed">
            Ministère chrétien œuvrant pour susciter une génération entière dédiée à Dieu.
          </p>
        </div>

        {/* Colonne 2 */}
        <div>
          <h4 className="font-body font-semibold text-xs tracking-widest uppercase text-gray-400 mb-5">Navigation</h4>
          <ul className="space-y-2.5">
            {[
              ["/",           "Accueil"],
              ["/apropos",    "Vision"],
              ["/evenements", "Événements"],
              ["/cultes",     "Programme des cultes"],
              ["/leaders",    "Leaders"],
              ["/medias",     "Médias"],
              ["/contact",    "Contact"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-gray-500 text-sm hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 3 */}
        <div>
          <h4 className="font-body font-semibold text-xs tracking-widest uppercase text-gray-400 mb-5">Contact</h4>
          <a href={`mailto:${email}`} className="text-gray-400 text-sm hover:text-white transition-colors block mb-6">
            {email}
          </a>
          <div className="flex flex-wrap gap-2">
            {Object.values(reseaux).map((r) => (
              <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-white border border-gray-700 hover:border-gray-400 px-3 py-1.5 transition-all">
                {r.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-5 text-center">
        <p className="text-gray-600 text-xs">
          © {new Date().getFullYear()} {nom}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
