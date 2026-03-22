// data/cultes.js
// ── PROGRAMME DES CULTES ──────────────────────────────────────────────────
// Modifie simplement ce tableau pour mettre à jour les horaires.
// Chaque culte a un champ FR et EN pour le type, lieu et notes.

const cultes = [
  {
    id: 1,
    jour: "Mardi",
    heure: "20h30 - 21h30",
    type:       "Enseignement",
    type_en:    "Teaching",
    lieu:       "Google Meet (lien envoyé par WhatsApp)",
    lieu_en:    "Google Meet (link sent via WhatsApp)",
    notes:      "Connectez-vous 5 min avant pour les annonces et la prière de début",
    notes_en:   "Connect 5 min early for announcements and opening prayer",
  },
  {
    id: 2,
    jour: "Mercredi",
    heure: "20h30 - 21h30",
    type:       "Réunion des âmes (En anglais)",
    type_en:    "Soul Meeting (In English)",
    lieu:       "Google Meet (lien envoyé par WhatsApp)",
    lieu_en:    "Google Meet (link sent via WhatsApp)",
    notes:      "Ouvert à tous",
    notes_en:   "Open to all",
  },
  {
    id: 3,
    jour: "Jeudi",
    heure: "20h30 - 21h30",
    type:       "Réunion des âmes (En français)",
    type_en:    "Soul Meeting (In French)",
    lieu:       "Google Meet (lien envoyé par WhatsApp)",
    lieu_en:    "Google Meet (link sent via WhatsApp)",
    notes:      "Ouvert à tous",
    notes_en:   "Open to all",
  },
  {
    id: 4,
    jour: "Vendredi",
    heure: "23h59",
    type:       "Veillée de Prière",
    type_en:    "Prayer Night",
    lieu:       "Google Meet (lien envoyé par WhatsApp)",
    lieu_en:    "Google Meet (link sent via WhatsApp)",
    notes:      "Chaque dernier vendredi du mois",
    notes_en:   "Every last Friday of the month",
  },
  {
    id: 5,
    jour: "Samedi",
    heure: "-",
    type:       "Réunion des âmes (Internationale)",
    type_en:    "Soul Meeting (International)",
    lieu:       "À confirmer",
    lieu_en:    "To be confirmed",
    notes:      "",
    notes_en:   "",
  },
];

export default cultes;