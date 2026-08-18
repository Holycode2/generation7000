// pages/api/newsletter.js
// Inscription à la lettre d'information via Brevo (ex-Sendinblue).
//
// Cette route tourne côté serveur : la clé d'API n'est jamais envoyée au
// navigateur. Elle se configure dans .env.local (voir .env.example) :
//   BREVO_API_KEY=xkeysib-…
//   BREVO_LIST_ID=3
//
// Tant que ces variables sont absentes, la route répond 501 avec le code
// "non-configure" et le formulaire retombe automatiquement sur l'ouverture du
// client mail : le site reste donc fonctionnel avant la mise en place du compte.

const FORMAT_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Garde-fou simple contre les envois répétés depuis une même adresse IP.
// La mémoire est propre à chaque instance du serveur, ce qui suffit à écarter
// les soumissions accidentelles ou un script naïf.
const MAX_PAR_FENETRE = 5;
const FENETRE_MS      = 10 * 60 * 1000;
const tentatives      = new Map();

function tropDeTentatives(ip) {
  const maintenant = Date.now();
  const recentes = (tentatives.get(ip) || []).filter((t) => maintenant - t < FENETRE_MS);
  recentes.push(maintenant);
  tentatives.set(ip, recentes);
  return recentes.length > MAX_PAR_FENETRE;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ code: "methode-non-autorisee" });
  }

  const cle    = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;

  if (!cle || !listId) {
    return res.status(501).json({ code: "non-configure" });
  }

  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim()
    || req.socket?.remoteAddress
    || "inconnue";

  if (tropDeTentatives(ip)) {
    return res.status(429).json({ code: "trop-de-tentatives" });
  }

  const email = String(req.body?.email || "").trim().toLowerCase();

  if (!FORMAT_EMAIL.test(email)) {
    return res.status(400).json({ code: "email-invalide" });
  }

  try {
    const reponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key":      cle,
        "accept":       "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [Number(listId)],
        // Une réinscription met simplement le contact à jour au lieu d'échouer.
        updateEnabled: true,
      }),
    });

    // 201 (créé) et 204 (mis à jour) sont deux succès.
    if (reponse.ok) {
      return res.status(200).json({ code: "inscrit" });
    }

    const erreur = await reponse.json().catch(() => ({}));

    if (erreur.code === "duplicate_parameter") {
      return res.status(200).json({ code: "deja-inscrit" });
    }

    // On ne journalise jamais l'adresse du visiteur, seulement la cause.
    console.error("Brevo a refusé l'inscription :", reponse.status, erreur.code || erreur.message);
    return res.status(502).json({ code: "erreur-service" });
  } catch (e) {
    console.error("Brevo injoignable :", e.message);
    return res.status(502).json({ code: "erreur-service" });
  }
}
