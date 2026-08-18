// data/medias.js
// Métadonnées des comptes sociaux — les URLs restent dans siteConfig.js.
// Pour ajouter un compte : d'abord siteConfig.reseaux, puis une entrée ici.
import siteConfig from "./siteConfig";

const ENRICHISSEMENT = {
  instagram1: {
    role: "Compte principal",
    role_en: "Main account",
    description: "Annonces, cultes, enseignements et vie de la maison.",
    description_en: "Announcements, services, teachings and community life.",
    featured: true,
    ordre: 1,
  },
  instagram2: {
    role: "Talents & arts",
    role_en: "Talents & arts",
    description: "Musique, danse, théâtre et créativité — le pôle G7K United.",
    description_en: "Music, dance, theatre and creativity — the G7K United team.",
    featured: false,
    ordre: 2,
  },
  instagram3: {
    role: "Sport",
    role_en: "Sports",
    description: "Activités sportives, tournois et événements G7K Sports.",
    description_en: "Sports activities, tournaments and G7K Sports events.",
    featured: false,
    ordre: 3,
  },
  instagram4: {
    role: "Gospel TV EN",
    role_en: "Gospel TV EN",
    description: "Contenus, émissions et enseignements en anglais.",
    description_en: "Content, shows and teachings in English.",
    featured: false,
    ordre: 4,
  },
  youtube: {
    role: "Chaîne officielle",
    role_en: "Official channel",
    description: "Cultes, enseignements, replays et contenus vidéo.",
    description_en: "Services, teachings, replays and video content.",
    featured: true,
    ordre: 1,
  },
  facebook: {
    role: "Page officielle",
    role_en: "Official page",
    description: "Actualités, photos et communauté G7K.",
    description_en: "News, photos and the G7K community.",
    featured: false,
    ordre: 1,
  },
};

export function plateformeDe(cle) {
  if (cle.startsWith("instagram")) return "instagram";
  if (cle.startsWith("youtube")) return "youtube";
  if (cle.startsWith("facebook")) return "facebook";
  return "lien";
}

/** Tous les comptes, enrichis et triés. */
export function tousLesComptes() {
  return Object.entries(siteConfig.reseaux)
    .map(([cle, compte]) => ({
      cle,
      ...compte,
      label: compte.label.trim(),
      plateforme: plateformeDe(cle),
      ...(ENRICHISSEMENT[cle] || {}),
    }))
    .sort((a, b) => (a.ordre ?? 99) - (b.ordre ?? 99));
}

export function comptesParPlateforme(plateforme) {
  return tousLesComptes().filter((c) => c.plateforme === plateforme);
}

export function comptesVedettes() {
  return tousLesComptes().filter((c) => c.featured);
}
