// data/evenements.js
// ── ÉVÉNEMENTS ────────────────────────────────────────────────────────────
// Pour ajouter un événement : copie un objet et remplis les champs.
// Les images vont dans /public/images/

const evenements = [
  {
    id: 1,
    titre:      "EmpowHer (Deuxième édition)",
    titre_en:   "EmpowHer (Second Edition)",
    date:       "2026-03-20",           // ← format AAAA-MM-JJ avec des tirets
    heure:      "20h30",
    lieu:       "Live Instagram",
    lieu_en:    "Instagram Live",
    description:    "Thème : La femme aux multiples facettes — Entre perception du monde et identité en Christ.",
    description_en: "Theme: The Woman of Many Faces — Between the world's perception and identity in Christ.",
    image:          "/images/empowher.jpg",
    lienInscription: "https://www.instagram.com/g7k.global?igsh=MTl1aXpoa2cxMXkwNQ==",  // ← string simple
  },

  // ── Pour ajouter un événement, copie ce modèle ──
  // {
  //   id: 2,
  //   titre:       "Nom de l'événement",
  //   titre_en:    "Event name",
  //   date:        "2026-04-01",
  //   heure:       "20h00",
  //   lieu:        "Lieu en français",
  //   lieu_en:     "Location in English",
  //   description:    "Description en français.",
  //   description_en: "Description in English.",
  //   image:          "/images/mon-image.jpg",
  //   lienInscription: "https://...",
  // },
];

export default evenements;