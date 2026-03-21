// data/evenements.js
// ── ÉVÉNEMENTS ────────────────────────────────────────────────────────────
// Pour ajouter un événement : copie un objet ci-dessous et remplis les champs.
// Les images vont dans /public/images/

const evenements = [
  {
    id: 1,
    titre: "EmpowHer(deuxième édition)",
    date: "2026.03.20",               // format AAAA-MM-JJ
    heure: "20h30",
    lieu: "Live instagram ",
    description: "Thème: La femme Aux multiples facettes: Entre perception du monde et identité en christ",
    image: "/images/empowher.jpg",  // remplace par ta vraie image
    lienInscription: {instagram :"https://www.instagram.com/g7k.global?igsh=MTl1aXpoa2cxMXkwNQ=="},                    // lien formulaire inscription
  },
  
];

export default evenements;
