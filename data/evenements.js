// data/evenements.js
// ── ÉVÉNEMENTS ────────────────────────────────────────────────────────────
// Pour ajouter un événement : copie le modèle en bas du fichier et remplis les champs.
// Les images vont dans /public/images/
//
// Champs disponibles :
//   id             (obligatoire) identifiant unique
//   slug           (obligatoire) utilisé dans l'URL /evenements/mon-slug
//                  → minuscules, sans accent ni espace (utilise des tirets)
//   titre / titre_en           (obligatoire)
//   sousTitre / sousTitre_en   (optionnel) ex : "Deuxième édition"
//   theme / theme_en           (optionnel) thème de l'événement
//   date           (obligatoire) format AAAA-MM-JJ avec des tirets
//   heure          (optionnel)   ex : "21h00"
//   lieu / lieu_en (obligatoire) ex : "Sur Google Meet" ou une adresse
//   image          (obligatoire) affiche de l'événement
//   statut         (obligatoire) "a-venir" ou "passe"
//                  → si tu oublies ce champ, il est déduit automatiquement de la date
//   description / description_en  texte long présentant l'événement
//   programme      (optionnel) déroulé d'UNE soirée :
//                  [{ heure, titre, titre_en, description, description_en }]
//   sessions       (optionnel) les rendez-vous successifs d'un événement qui
//                  s'étale dans le temps (un trimestre, une série d'enseignements).
//                  Une session = un intervenant, sur deux soirs (jeudi et vendredi) :
//                  [{
//                     date, heure,                 ← 1er soir (jeudi), conservé pour compatibilité
//                     jours: [                     ← les deux soirs
//                       { date, heure, jour: "Jeudi" },
//                       { date, heure, jour: "Vendredi" },
//                     ],
//                     theme, theme_en,
//                     intervenant: { nom, role, role_en, photo },
//                     resume, resume_en,       ← récap de l'enseignement
//                     verset, verset_en,
//                     photos: ["/images/1.jpg", …],   ← récap en images
//                     lienReplay
//                  }]
//   intervenants   (optionnel) [{ nom, role, role_en, photo }]
//   lienInstagram  (optionnel) URL du live / du post Instagram
//   lienInscription(optionnel) URL d'un formulaire d'inscription
//   galerie        (optionnel) photos après l'événement : ["/images/1.jpg", …]

const evenements = [{
        id: 1,
        slug: "trimestre-du-saint-esprit",

        titre: "Trismestre du Saint Esprit",
        titre_en: "Holy Spirit Quarter",

        sousTitre: "",
        sousTitre_en: "",

        theme: "L'esprit de la Mission",
        theme_en: "The Spirit of Mission",

        date: "2026-07-30", // ← format AAAA-MM-JJ avec des tirets
        heure: "21h00",

        lieu: "Sur Google Meet",
        lieu_en: "On Google Meet",

        image: "/images/abide.png",
        statut: "encours",

        description: "Thème : L'esprit de la Mission. Actes 1:8. Chaque intervenant enseigne deux soirs : jeudi et vendredi, à 21h00.",
        description_en: "Theme: The Spirit of Mission. Acts 1:8. Each speaker teaches on two evenings: Thursday and Friday, at 9:00 PM.",
        programme: [
            // Déroulé type d'une soirée du trimestre.
            {
                heure: "21h00",
                titre: "Accueil",
                titre_en: "Welcome"
            },
            {
                heure: "21h10",
                titre: "Enseignement",
                titre_en: "Teaching",
                description: "",
                description_en: ""
            },
            {
                heure: "22h00",
                titre: "Temps de prière ",
                titre_en: "Prayer time "
            },
        ],

        // Les rendez-vous du trimestre, un par enseignement.
        // Copie un bloc pour ajouter une session.
        sessions: [{
                date: "2026-07-30",
                heure: "21h00",
                jours: [{
                        date: "2026-07-30",
                        heure: "21h00",
                        jour: "Jeudi",
                        jour_en: "Thursday"
                    },
                    {
                        date: "2026-07-31",
                        heure: "21h00",
                        jour: "Vendredi",
                        jour_en: "Friday"
                    },
                ],
                theme: "Le Saint Esprit & La bible",
                theme_en: "The Holy spirit & The Bible ",
                intervenant: {
                    nom: "Berger David Katalay",
                    role: "Invité",
                    role_en: "Guest",
                    photo: "/images/D.JPG",
                },
                resume: "Resumé",
                resume_en: "",
                verset: " Verset : ",
                verset_en: "",
                photos: [

                ],
                lienReplay: "",
            },
            {
                date: "2026-08-06",
                heure: "21h00",
                jours: [{
                        date: "2026-08-06",
                        heure: "21h00",
                        jour: "Jeudi",
                        jour_en: "Thursday"
                    },
                    {
                        date: "2026-08-07",
                        heure: "21h00",
                        jour: "Vendredi",
                        jour_en: "Friday"
                    },
                ],
                theme: [
                    " Jour 1 : Avant,pendant et après la pentecôte",
                ],

                theme_en: "Before, during and after Pentecost",
                intervenant: {
                    nom: "Ben Muna",
                    role: "Berger Visionnaire",
                    role_en: "Visionary Pastor",
                    photo: "/images/ben.jpg",
                },
                resume: " ",
                resume_en: "",
                verset: "",
                verset_en: "",
                photos: [],
                lienReplay: "",
            },
            {
                date: "2026-08-13",
                heure: "21h00",
                jours: [{
                        date: "2026-08-13",
                        heure: "21h00",
                        jour: "Jeudi",
                        jour_en: "Thursday"
                    },
                    {
                        date: "2026-08-14",
                        heure: "21h00",
                        jour: "Vendredi",
                        jour_en: "Friday"
                    },
                ],
                theme: "Le Reveil à la manière de la chambre Haute ",
                theme_en: "The Awakening in the manner of the Upper Room",
                intervenant: {
                    nom: "Berger Charly Gloire",
                    role: "Invité",
                    role_en: "Guest",
                    photo: "/images/c.JPG",
                },
                resume: "",
                resume_en: ".",
                verset: "Verset : Acte 1:8, Acte 2",
                verset_en: "Verses Act 1:8, Act 2",
                photos: [],
                lienReplay: "",
            },
            {
                date: "2026-08-13",
                heure: "21h00",
                jours: [{
                        date: "2026-08-13",
                        heure: "21h00",
                        jour: "Jeudi",
                        jour_en: "Thursday"
                    },
                    {
                        date: "2026-08-14",
                        heure: "21h00",
                        jour: "Vendredi",
                        jour_en: "Friday"
                    },
                ],
                theme: " ",
                theme_en: "",
                intervenant: {
                    nom: "Ben Muna",
                    role: "Berger Visionnaire",
                    role_en: "Visionary Pastor",
                    photo: "/images/ben.jpg",
                },
                resume: "[Texte à remplacer] Résumé de l'enseignement.",
                resume_en: "[Text to replace] Summary of the teaching.",
                verset: "Verset : Acte 1:8, Acte 2",
                verset_en: "Verses Act 1:8, Act 2",
                photos: [],
                lienReplay: "",
            },
        ],

        intervenants: [{
            nom: "Berger David Katalay",
            role: "Invité",
            role_en: "Guest",
            photo: "/images/D.JPG"
        }, {
            nom: "Ben Muna",
            role: "Berger Visionnaire",
            role_en: "Visionary Pastor",
            photo: "/images/ben.jpg"
        }, {
            nom: "Berger Charly Gloire",
            role: "Invité",
            role_en: "Guest",
            photo: "/images/c.JPG"
        }, ],

        lienInstagram: "https://www.instagram.com/g7k.global?igsh=MTl1aXpoa2cxMXkwNQ==",
        lienInscription: "",

        galerie: [
            // "/images/photo-1.jpg", "/images/photo-2.jpg",
        ],
    },
    // {
    //   id: 2,
    // slug: "abide",
    //titre: "ABIDE",
    //   titre_en: "ABIDE",

    // sousTitre: "Rendez-vous mensuel",
    //sousTitre_en: "Monthly gathering",

    //  theme: "Demeurer en sa présence",
    //  theme_en: "Abiding in His presence",

    //  date: "2026-08-01",
    //  heure: "21h00",

    //  lieu: "Sur Google Meet",
    //  lieu_en: "On Google Meet",

    //  image: "/images/abide.png",
    //   statut: "passe", // ← passe à "a-venir" et mets à jour la date pour la prochaine édition

    // description: "Un temps de communion, de prière et de méditation dans la présence de Dieu. Rendez-vous chaque premier samedi du mois.",
    //  description_en: "A time of fellowship, prayer, and meditation in God's presence. Held on the first Saturday of every month.",

    //  programme: [
    // [Programme à remplacer]
    //     {
    //       heure: "21h00",
    //     titre: "Ouverture & adoration",
    //   titre_en: "Opening & worship"
    //  },
    // {
    //   heure: "21h30",
    //  titre: "Méditation de la Parole",
    //   titre_en: "Meditation on the Word"
    // },
    // {
    //   heure: "22h15",
    // titre: "Intercession",
    //  titre_en: "Intercession"
    // },
    // ],

    //        intervenants: [],

    // lienInstagram: "https://www.instagram.com/g7k.global?igsh=MTl1aXpoa2cxMXkwNQ==",
    // lienInscription: "",

    //  galerie: [],
    //   },
    // {
    //   id: 3,
    // slug: "prochain-evenement",

    //   titre: "[Titre à remplacer]",
    //  titre_en: "[Title to replace]",

    // sousTitre: "Première édition",
    // sousTitre_en: "First edition",

    //  theme: "[Thème à remplacer]",
    //  theme_en: "[Theme to replace]",

    //  date: "2026-12-31",
    //  heure: "21h00",

    //  lieu: "[Lieu à remplacer]",
    //  lieu_en: "[Location to replace]",

    //  image: "/images/event-placeholder.jpg",
    //  statut: "a-venir",

    //  description: "[Texte à remplacer] Cet événement est un exemple : il montre comment s'affichent le programme, les intervenants et le bouton d'action. Supprime-le ou remplace-le par ton prochain rassemblement.",
    //  description_en: "[Text to replace] This event is a sample: it shows how the schedule, the speakers and the action button are displayed. Delete it or replace it with your next gathering.",

    //  programme: [{
    //   heure: "21h00",
    //   titre: "[Étape 1]",
    //   titre_en: "[Step 1]",
    //   description: "[Texte à remplacer]",
    //   description_en: "[Text to replace]"
    //  },
    // {
    //   heure: "21h45",
    //   titre: "[Étape 2]",
    //   titre_en: "[Step 2]"
    //  },
    // ],

    //  intervenants: [{
    //    nom: "[Nom de l'intervenant]",
    //    role: "[Rôle]",
    //    role_en: "[Role]",
    //    photo: "/images/leader-placeholder.jpg"
    //  }, ],

    //  lienInstagram: "https://www.instagram.com/g7k.global?igsh=MTl1aXpoa2cxMXkwNQ==",
    //  lienInscription: "",

    //  galerie: [],
    //   },

    // ── Pour ajouter un événement, copie ce modèle ──
    // {
    //   id: 4,
    //   slug: "nom-de-levenement",
    //   titre:       "Nom de l'événement",
    //   titre_en:    "Event name",
    //   sousTitre:   "", sousTitre_en: "",
    //   theme:       "", theme_en: "",
    //   date:        "2027-04-01",
    //   heure:       "20h00",
    //   lieu:        "Lieu en français",
    //   lieu_en:     "Location in English",
    //   image:          "/images/mon-image.jpg",
    //   statut:         "a-venir",
    //   description:    "Description en français.",
    //   description_en: "Description in English.",
    //   programme:      [{ heure: "20h00", titre: "Accueil", titre_en: "Welcome" }],
    //   sessions:       [{
    //     date: "2027-04-01", heure: "20h00",
    //     theme: "Thème de la soirée", theme_en: "Theme of the evening",
    //     intervenant: { nom: "Prénom Nom", role: "Rôle", role_en: "Role", photo: "/images/photo.jpg" },
    //     resume: "Résumé de l'enseignement.", resume_en: "Summary of the teaching.",
    //     verset: "", verset_en: "",
    //     photos: ["/images/recap-1.jpg"],
    //     lienReplay: "https://...",
    //   }],
    //   intervenants:   [{ nom: "Prénom Nom", role: "Rôle", role_en: "Role", photo: "/images/photo.jpg" }],
    //   lienInstagram:   "https://...",
    //   lienInscription: "https://...",
    //   galerie:         [],
    // },
];

// ── HELPERS ───────────────────────────────────────────────────────────────
// Utilisés par les pages : ne pas modifier sauf besoin particulier.

const JOUR_MS = 24 * 60 * 60 * 1000;

/** Toutes les dates d'une session (les deux soirs, ou la date unique). */
export function datesSession(session) {
    const jours = session ? .jours ? .map((j) => j.date && new Date(j.date).getTime()).filter(Boolean);
    if (jours ? .length) return jours;
    const unique = session ? .date && new Date(session.date).getTime();
    return unique ? [unique] : [];
}

function datesUtiles(evt) {
    const dates = (evt.sessions || []).flatMap(datesSession);
    if (dates.length) return dates;
    const unique = new Date(evt.date).getTime();
    return Number.isNaN(unique) ? [] : [unique];
}

/** Date de fin réelle : dernière session, sinon la date de l'événement. */
export function dateFin(evt) {
    const dates = datesUtiles(evt);
    return dates.length ? Math.max(...dates) : new Date(evt.date).getTime();
}

export function dateDebut(evt) {
    const dates = datesUtiles(evt);
    return dates.length ? Math.min(...dates) : new Date(evt.date).getTime();
}

/** Une série encore en cours (statut "encours" ou sessions à cheval sur aujourd'hui). */
export function estEnCours(evt) {
    if (evt.statut === "encours") return true;
    if (evt.statut === "passe" || evt.statut === "a-venir") return false;
    const now = Date.now();
    return now >= dateDebut(evt) && now <= dateFin(evt) + JOUR_MS;
}

/** Un événement est passé si son statut le dit, sinon si sa dernière date est dépassée. */
export function estPasse(evt) {
    if (evt.statut === "passe") return true;
    if (evt.statut === "a-venir" || evt.statut === "encours") return false;
    if (estEnCours(evt)) return false;
    return dateFin(evt) < Date.now();
}

/** Clé de statut affichable : "encours" | "passe" | "a-venir". */
export function statutDe(evt) {
    if (estEnCours(evt)) return "encours";
    if (estPasse(evt)) return "passe";
    return "a-venir";
}

/** Prochaine session (aujourd'hui ou à venir), sinon la dernière. */
export function prochaineSession(evt) {
    if (!evt.sessions ? .length) return null;
    const now = Date.now() - JOUR_MS;
    return evt.sessions.find((s) => datesSession(s).some((d) => d >= now)) || evt.sessions[evt.sessions.length - 1];
}

export function prochaineDateSession(session) {
    const now = Date.now() - JOUR_MS;
    const dates = datesSession(session).filter((d) => d >= now);
    return dates.length ? Math.min(...dates) : (datesSession(session)[0] || null);
}

export function statutSession(session) {
    const dates = datesSession(session);
    if (!dates.length) return "a-venir";
    const now = Date.now();
    if (dates.some((d) => now >= d && now < d + JOUR_MS)) return "encours";
    if (Math.max(...dates) + JOUR_MS <= now) return "passe";
    return "a-venir";
}

export function statutJour(jour) {
    if (!jour ? .date) return "a-venir";
    return statutSession({
        date: jour.date
    });
}

/** Événements à venir (et en cours), du plus proche au plus lointain. */
export function aVenir(liste = evenements) {
    return liste.filter((e) => !estPasse(e)).sort((a, b) => dateDebut(a) - dateDebut(b));
}

/** Événements passés, du plus récent au plus ancien. */
export function passes(liste = evenements) {
    return liste.filter(estPasse).sort((a, b) => dateFin(b) - dateFin(a));
}

/** Tous les événements en une seule liste : les prochains d'abord, puis les passés. */
export function tousTries(liste = evenements) {
    return [...aVenir(liste), ...passes(liste)];
}

/** Retrouve un événement par son slug (null si introuvable). */
export function getEvenementParSlug(slug) {
    return evenements.find((e) => e.slug === slug) || null;
}

export default evenements;