// data/siteConfig.js
// ── CONFIGURATION GLOBALE DU SITE ──────────────────────────────────────────
// Modifie ici les informations générales : nom, contact, réseaux sociaux, etc.

const siteConfig = {
  nom: "Génération 7000",
  slogan: "Une génération mise à part",
  description: "Ministère chrétien dédié à susciter une génération entière consacrée à Dieu, brûlant de feu et marchant dans la destinée divine.",
  email: "generation7kministries@gmail.com",            // ← change ici
  telephone: "+7 (991)-232-01-35",                  // ← change ici

  // ── RÉSEAUX SOCIAUX ────────────────────────────────────
  // Remplace chaque URL par le vrai lien. Supprime une clé si le réseau n'existe pas.
  reseaux: {
    instagram1:  { label: "@g7k.global",  url: "https://www.instagram.com/g7k.global?igsh=MWhhbmkwYjMwaHY0OA==" },
    instagram2:  { label: "@g7k_united",   url: "https://www.instagram.com/g7k_united?igsh=Y2NqamM1cmdhMzh6" },
    instagram3:  { label: "@g7k.sports",     url: "https://www.instagram.com/g7k.sports?igsh=cXNuZjV2YXA4Nzdp" },
    instagram4:  { label :" @g7k_gospeltv_eng", url:"https://www.instagram.com/g7k_gospeltv_eng?igsh=MWY3NmNhOWxnZHJkOQ==" },
    youtube:     { label: "YouTube",              url: "https://youtube.com/@generation_7000?si=bCwOtYKl5d7NtXQp" },
    facebook:    { label: "Facebook",             url: "https://www.facebook.com/share/1AtN3W4mWr/?mibextid=wwXIfr" },
  },
};

export default siteConfig;
