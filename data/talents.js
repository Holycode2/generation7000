// data/talents.js
// ── PÔLES G7K UNITED (TALENTS) ────────────────────────────────────────────
// Pour ajouter un pôle : copie le modèle en bas du fichier et remplis les champs.
// Les images vont dans /public/images/
//
// Chaque pôle a sa propre page : /g7k-united/mon-slug
//
// Champs disponibles :
//   id            (obligatoire) identifiant unique
//   slug          (obligatoire) utilisé dans l'URL /g7k-united/mon-slug
//                 → minuscules, sans accent ni espace (utilise des tirets)
//   nom / nom_en  (obligatoire) nom du pôle
//   categorie / categorie_en    famille du pôle : Danse, Musique, Sport…
//   description / description_en      résumé court, affiché sur la carte (2-3 lignes)
//   descriptionLongue / …_en          texte de présentation complet, affiché sur la page du pôle
//   image         (obligatoire) chemin vers l'image, ex "/images/mon-image.jpg"
//   icone         (optionnel) clé d'icône : voir ICONES dans pages/g7k-united/index.jsx
//   instagram     (optionnel) URL complète du compte Instagram du pôle
//   responsables  (optionnel) [{ nom, photo, role, role_en }]
//   artistes      (optionnel) membres du pôle affichés sur sa page :
//                 [{ nom, role, role_en, photo, bio, bio_en, reseaux: { instagram, youtube, … } }]
//                 → dans `reseaux`, le nom de la clé sert d'étiquette au bouton
//                   (instagram, youtube, spotify, tiktok, facebook, appleMusic…)

const talents = [{
        id: 1,
        slug: "g7k-urban",
        nom: "G7K URBAN",
        nom_en: "G7K URBAN",
        categorie: "Musique",
        categorie_en: "Music",
        description: "Departement de musique de la Génération 7000 : rappeurs, chanteurs, instrumentistes et beatmakers, une culture urbaine mise au service de l'Évangile.",
        description_en: "The music department of Generation 7000: rappers, singers, instrumentalists and beatmakers — urban culture at the service of the Gospel.",
        descriptionLongue: "",
        descriptionLongue_en: "",
        image: "/images/IMG_4734.png", // [Image à remplacer]
        icone: "musique",
        instagram: "https://www.instagram.com/g7k_united?igsh=Y2NqamM1cmdhMzh6",
        responsables: [{
            nom: "Ben Muna",
            photo: "/images/ben.jpg",
            role: "Responsable du departement ",
            role_en: "Department lead"
        }, ],
        artistes: [{
                nom: "Daniel Mbal",
                role: "chanteur, Rappeur & Musicien",
                role_en: "Singer, Rapper & Musician",
                photo: "/images/daniel.jpg", // [Photo à remplacer]
                bio: "Daniel Mbal est un artiste originaire de Kolwezi, en République démocratique du Congo. Il évolue dans un univers musical entre pop. Se considérant avant tout comme un serviteur du Royaume, il cherche à mettre tout ce qu’il est et tout ce qu’il sait faire au service de Dieu. À travers sa musique, il partage simplement ce qu’il vit, ce qu’il croit et ce que Dieu met dans son cœur.",
                bio_en: "Daniel Mbal is an artist from Kolwezi, Democratic Republic of the Congo. His music moves between pop. Above all, he sees himself as a servant of the Kingdom, seeking to use everything he is and everything he can do to serve God. Through his music, he simply shares what he lives, what he believes, and what God places on his heart.",
                reseaux: {
                    instagram: "https://www.instagram.com/daniel_mbal/",
                    youtube: "https://youtube.com/@danielmbal?si=vDu5Gk6Qm0JWBKBT",
                    spotify: "https://open.spotify.com/artist/4l9fURL2PmqzmpkvKoi5uJ?si=CT-DZWomQYmY49WGCgFQDg&utm_source=copy-link"
                },
            },
            {
                nom: "Henoc 2m",
                role: "Chanteuse ",
                role_en: "Singer",
                photo: "/images/leader-placeholder.jpg", // [Photo à remplacer]
                bio: "[Texte à remplacer]  biographie.",
                bio_en: "[Text to replace]  biography.",
                reseaux: {
                    instagram: "https://www.instagram.com/henoc_2m_officiel/",
                    spotify: "https://open.spotify.com/artist/1pN98tLFMtDdqfPxhNQNm0?si=9V0PhRTeR3CZjdFiXKYpww&utm_source=copy-link"
                },
            },
            {
                nom: "[]",
                role: "artiste",
                role_en: "Artist",
                photo: "/images/leader-placeholder.jpg", // [Photo à remplacer]
                bio: " biographie.",
                bio_en: " biography.",
                reseaux: {
                    instagram: "https://www.instagram.com/",
                    spotify: "https://open.spotify.com/",
                },
            },
        ],
    },

    {
        id: 2,
        slug: "medias",
        nom: "Médias & Audiovisuel",
        nom_en: "Media & Audiovisual",
        categorie: "Médias",
        categorie_en: "Media",
        description: "Photo, vidéo, montage et diffusion en direct. L'équipe qui porte la voix de G7K sur les réseaux.",
        description_en: "Photo, video, editing and live streaming. The team carrying the voice of G7K on social media.",
        descriptionLongue: "Présentation complète du departement de Médias & Audiovisuel.",
        descriptionLongue_en: " Full presentation of the Media & Audiovisual department.",
        image: "/images/event-placeholder.jpg", // [Image à remplacer]
        icone: "medias",
        instagram: "https://www.instagram.com/g7k_gospeltv_eng?igsh=MWY3NmNhOWxnZHJkOQ==",
        responsables: [],
        artistes: [],
    },

    // ── Pour ajouter un pôle, copie ce modèle ──
    // {
    //   id: 9,
    //   slug: "nom-du-pole",
    //   nom:        "Pôle …",
    //   nom_en:     "…",
    //   categorie:    "Catégorie",
    //   categorie_en: "Category",
    //   description:      "Résumé court en français.",
    //   description_en:   "Short summary in English.",
    //   descriptionLongue:    "Texte complet en français.",
    //   descriptionLongue_en: "Full text in English.",
    //   image: "/images/mon-image.jpg",
    //   icone: "danse",                 // clé optionnelle, voir ICONES dans pages/g7k-united/index.jsx
    //   instagram: "https://www.instagram.com/…",
    //   responsables: [
    //     { nom: "Prénom Nom", photo: "/images/photo.jpg", role: "Responsable", role_en: "Lead" },
    //   ],
    //   artistes: [
    //     {
    //       nom: "Prénom Nom",
    //       role: "Rôle en français", role_en: "Role in English",
    //       photo: "/images/photo.jpg",
    //       bio: "Biographie en français.", bio_en: "Biography in English.",
    //       reseaux: { instagram: "https://…", youtube: "https://…" },
    //     },
    //   ],
    // },
];

/** Retrouve un pôle par son slug (null si introuvable). */
export function getTalentParSlug(slug) {
    return talents.find((p) => p.slug === slug) || null;
}

export default talents;