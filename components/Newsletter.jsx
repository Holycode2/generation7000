// components/Newsletter.jsx
// Formulaire d'abonnement affiché dans le footer.
//
// L'inscription passe par /api/newsletter, qui parle à Brevo côté serveur.
// Si les variables d'environnement Brevo ne sont pas encore renseignées, l'API
// répond "non-configure" et on retombe sur l'ouverture du client mail, comme le
// formulaire de la page Contact : le formulaire n'est donc jamais inutilisable.
import { useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import siteConfig from "../data/siteConfig";
import { useTranslation } from "../hooks/useTranslation";

const FORMAT_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Newsletter() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [envoi, setEnvoi] = useState(false);
  // null | "inscrit" | "deja-inscrit" | "email-invalide" | "mailto" | "erreur"
  const [etat, setEtat] = useState(null);

  function ouvrirClientMail(adresse) {
    const sujet = encodeURIComponent(t.footer.newsletterSujet);
    const corps = encodeURIComponent(`${t.footer.newsletterCorps}\n\n${adresse}`);
    window.open(`mailto:${siteConfig.email}?subject=${sujet}&body=${corps}`, "_self");
  }

  async function abonner(e) {
    e.preventDefault();

    const adresse = email.trim();
    if (!FORMAT_EMAIL.test(adresse)) {
      setEtat("email-invalide");
      return;
    }

    setEnvoi(true);
    setEtat(null);

    try {
      const reponse = await fetch("/api/newsletter", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email: adresse }),
      });
      const data = await reponse.json().catch(() => ({}));

      if (data.code === "non-configure") {
        ouvrirClientMail(adresse);
        setEtat("mailto");
        setEmail("");
      } else if (reponse.ok && (data.code === "inscrit" || data.code === "deja-inscrit")) {
        setEtat(data.code);
        setEmail("");
      } else {
        setEtat(data.code === "email-invalide" ? "email-invalide" : "erreur");
      }
    } catch {
      setEtat("erreur");
    } finally {
      setEnvoi(false);
    }
  }

  const messages = {
    inscrit:         { texte: t.footer.newsletterOk,           couleur: "text-white/60" },
    "deja-inscrit":  { texte: t.footer.newsletterDeja,         couleur: "text-white/60" },
    mailto:          { texte: t.footer.newsletterMailto,       couleur: "text-white/60" },
    "email-invalide":{ texte: t.footer.newsletterErreur,       couleur: "" },
    erreur:          { texte: t.footer.newsletterErreurServeur, couleur: "" },
  };
  const message = etat ? messages[etat] : null;

  return (
    <div className="border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

        <div>
          <h3 className="font-display text-2xl md:text-3xl tracking-wider">
            {t.footer.newsletterTitre}
          </h3>
          <p className="font-body text-white/45 text-sm mt-2 max-w-md">
            {t.footer.newsletterTexte}
          </p>
        </div>

        <form onSubmit={abonner} className="w-full lg:w-auto lg:min-w-[420px]" noValidate>
          <div className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="newsletter-email" className="sr-only">
              {t.footer.newsletterPlaceholder}
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEtat(null); }}
              placeholder={t.footer.newsletterPlaceholder}
              aria-invalid={etat === "email-invalide"}
              disabled={envoi}
              className="flex-1 bg-white/[0.04] border border-white/15 text-white text-sm font-body px-4 py-3.5 placeholder:text-white/30 focus:outline-none focus:border-white/45 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={envoi}
              className="group flex items-center justify-center gap-2 bg-[#980000] text-white font-body font-semibold text-[11px] tracking-widest uppercase px-7 py-3.5 hover:bg-[#b00000] transition-colors disabled:opacity-60"
            >
              {envoi ? t.footer.newsletterEnvoi : t.footer.newsletterBtn}
              {!envoi && <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </div>

          {/* Retour d'information annoncé aux lecteurs d'écran */}
          <p aria-live="polite" className="font-body text-xs mt-3 min-h-[1rem]">
            {message && (
              <span
                className={message.couleur}
                style={message.couleur ? undefined : { color: "#ff8a8a" }}
              >
                {message.texte}
              </span>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
