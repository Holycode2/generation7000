// pages/contact.jsx — BILINGUE FR/EN
import Layout from "../components/Layout";
import siteConfig from "../data/siteConfig";
import { useState } from "react";
import { useRouter } from "next/router";

// ── TEXTES FR / EN ──────────────────────────────────────────────────────────
const TEXTES = {
  fr: {
    tag:        "Échangeons",
    titre:      "CONTACT",
    rejoindre:  "NOUS REJOINDRE",
    ecrire:     "NOUS ÉCRIRE",
    reseaux:    "Réseaux sociaux",
    champs: [
      { name: "nom",     label: "Nom complet *",           type: "text",  placeholder: "Votre nom",           required: true },
      { name: "email",   label: "Email *",                  type: "email", placeholder: "votre@email.com",     required: true },
      { name: "numero",  label: "Numéro de téléphone *",   type: "tel",   placeholder: "ex: +1...",            required: true },
      { name: "sujet",   label: "Sujet",                   type: "text",  placeholder: "Objet du message",    required: false },
    ],
    message:    "Message *",
    messagePh:  "Votre message ici…",
    envoyer:    "Envoyer le message",
    confirm:    "✓ Votre client mail s'est ouvert !",
    sujetDef:   "Message depuis le site",
  },
  en: {
    tag:        "Let's connect",
    titre:      "CONTACT",
    rejoindre:  "JOIN US",
    ecrire:     "WRITE TO US",
    reseaux:    "Social media",
    champs: [
      { name: "nom",     label: "Full name *",             type: "text",  placeholder: "Your name",           required: true },
      { name: "email",   label: "Email *",                  type: "email", placeholder: "your@email.com",     required: true },
      { name: "numero",  label: "Phone number *",          type: "tel",   placeholder: "e.g.: +1...",         required: true },
      { name: "sujet",   label: "Subject",                 type: "text",  placeholder: "Message subject",     required: false },
    ],
    message:    "Message *",
    messagePh:  "Your message here…",
    envoyer:    "Send message",
    confirm:    "✓ Your mail client has opened!",
    sujetDef:   "Message from website",
  },
};

export default function Contact() {
  const { locale } = useRouter();
  const t = TEXTES[locale] || TEXTES.fr;
  const { email, telephone, reseaux } = siteConfig;

  const [form, setForm]     = useState({ nom: "", email: "", numero: "", sujet: "", message: "" });
  const [envoye, setEnvoye] = useState(false);

  function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

  function handleSubmit(e) {
    e.preventDefault();
    window.open(
      `mailto:${email}?subject=${encodeURIComponent(form.sujet || t.sujetDef)}&body=${encodeURIComponent(
        `Nom: ${form.nom}\nEmail: ${form.email}\nTél: ${form.numero}\n\n${form.message}`
      )}`,
      "_blank"
    );
    setEnvoye(true);
    setTimeout(() => setEnvoye(false), 5000);
  }

  return (
    <Layout title={t.titre} description="Contactez Génération 7000.">

      {/* En-tête */}
      <section className="py-28 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-gray-400 text-xs tracking-[0.4em] uppercase mb-4">{t.tag}</p>
          <h1 className="font-display text-6xl md:text-8xl text-ink tracking-wider">{t.titre}</h1>
        </div>
      </section>

      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Infos de contact */}
          <div>
            <h2 className="font-display text-3xl text-ink tracking-wider mb-10">{t.rejoindre}</h2>
            <div className="space-y-8">
              {[
                { icon: "✉", label: "Email",    val: email,     href: `mailto:${email}` },
                { icon: "☎", label: locale === "en" ? "Phone" : "Téléphone", val: telephone, href: `tel:${telephone}` },
              ].map(({ icon, label, val, href }) => (
                <div key={label} className="flex gap-5 items-start">
                  <div className="w-10 h-10 border border-gray-200 flex items-center justify-center flex-shrink-0 text-lg">{icon}</div>
                  <div>
                    <p className="font-body text-gray-400 text-xs tracking-widest uppercase mb-1">{label}</p>
                    {href ? (
                      <a href={href} className="font-body text-gray-700 hover:text-ink transition-colors">{val}</a>
                    ) : (
                      <p className="font-body text-gray-700">{val}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Réseaux sociaux */}
            <div className="mt-10">
              <p className="font-body text-gray-400 text-xs tracking-widest uppercase mb-4">{t.reseaux}</p>
              <div className="flex flex-wrap gap-2">
                {Object.values(reseaux).map(r => (
                  <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer"
                    className="border border-gray-200 text-gray-500 hover:border-ink hover:text-ink font-body text-xs tracking-widest uppercase px-4 py-2 transition-all">
                    {r.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div>
            <h2 className="font-display text-3xl text-ink tracking-wider mb-10">{t.ecrire}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {t.champs.map(({ name, label, type, placeholder, required }) => (
                <div key={name}>
                  <label className="block font-body text-gray-400 text-xs tracking-widest uppercase mb-2">{label}</label>
                  <input
                    type={type} name={name} required={required}
                    value={form[name] || ""}
                    onChange={handleChange} placeholder={placeholder}
                    className="w-full bg-white border border-gray-200 focus:border-ink text-ink placeholder-gray-300 font-body text-sm px-4 py-3 outline-none transition-colors" />
                </div>
              ))}

              {/* Message */}
              <div>
                <label className="block font-body text-gray-400 text-xs tracking-widest uppercase mb-2">{t.message}</label>
                <textarea
                  name="message" required rows={5}
                  value={form.message} onChange={handleChange}
                  placeholder={t.messagePh}
                  className="w-full bg-white border border-gray-200 focus:border-ink text-ink placeholder-gray-300 font-body text-sm px-4 py-3 outline-none transition-colors resize-none" />
              </div>

              <button type="submit"
                className="w-full bg-ink text-white font-body font-semibold text-xs tracking-widest uppercase px-8 py-4 hover:bg-ink-light transition-all">
                {t.envoyer}
              </button>

              {envoye && (
                <p className="text-green-600 text-sm text-center font-body animate-fade-in-up">{t.confirm}</p>
              )}
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}