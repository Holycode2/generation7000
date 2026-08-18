// components/IconeReseau.jsx
// Icônes des réseaux sociaux, dessinées en SVG pour rester nettes à toute taille.
// Utilisé par le footer et par les pages de pôles G7K United.
// Le nom passé peut être une clé de données ("instagram1", "appleMusic") :
// la reconnaissance se fait par mot-clé, et tout réseau inconnu reçoit une
// icône de lien générique.
import { LinkIcon } from "@heroicons/react/24/outline";

const DESSINS = {
  instagram: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1.15" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10.3 9.1v5.8l5-2.9z" fill="currentColor" stroke="none" />
    </>
  ),
  spotify: (
    <>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M7.1 9.3c3.2-.9 6.8-.6 9.5 1.1" strokeLinecap="round" />
      <path d="M7.9 12.4c2.6-.7 5.5-.5 7.7.9" strokeLinecap="round" />
      <path d="M8.7 15.3c2-.5 4.3-.4 6 .7" strokeLinecap="round" />
    </>
  ),
  tiktok: (
    <>
      <path d="M14.2 3.5v9.4a3.3 3.3 0 1 1-2.7-3.25" strokeLinecap="round" />
      <path d="M14.2 3.5c.3 2.3 1.9 3.8 4.2 4" strokeLinecap="round" />
    </>
  ),
  facebook: (
    <>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M13 20.9V10.6c0-1 .6-1.6 1.6-1.6h1.2" strokeLinecap="round" />
      <path d="M10.3 13.4h4.8" strokeLinecap="round" />
    </>
  ),
};

const CLES = Object.keys(DESSINS);

/** Retrouve le réseau à partir d'un nom de champ ou d'un libellé. */
export function reseauDe(nom = "") {
  const n = String(nom).toLowerCase();
  return CLES.find((cle) => n.includes(cle));
}

export default function IconeReseau({ nom, className = "w-4 h-4" }) {
  const cle = reseauDe(nom);
  if (!cle) return <LinkIcon className={className} />;

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      {DESSINS[cle]}
    </svg>
  );
}
