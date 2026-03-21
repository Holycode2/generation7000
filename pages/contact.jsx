// pages/contact.jsx
import Layout from "../components/Layout";
import siteConfig from "../data/siteConfig";
import { useState } from "react";

export default function Contact() {
  const { email, adresse, telephone, reseaux } = siteConfig;
  const [form, setForm] = useState({ nom: "", email: "", sujet: "", message: "" });
  const [envoye, setEnvoye] = useState(false);

  function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

  function handleSubmit(e) {
    e.preventDefault();
    window.open(`mailto:${email}?subject=${encodeURIComponent(form.sujet || "Message depuis le site")}&body=${encodeURIComponent(`Nom: ${form.nom}\nEmail: ${form.email}\n\n${form.message}`)}`, "_blank");
    setEnvoye(true);
    setTimeout(() => setEnvoye(false), 5000);
  }

  return (
    <Layout title="Contact" description="Contactez Génération 7000.">

      <section className="py-28 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-gray-400 text-xs tracking-[0.4em] uppercase mb-4">Échangeons</p>
          <h1 className="font-display text-6xl md:text-8xl text-ink tracking-wider">CONTACT</h1>
        </div>
      </section>

      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Infos */}
          <div>
            <h2 className="font-display text-3xl text-ink tracking-wider mb-10">NOUS REJOINDRE</h2>
            <div className="space-y-8">
              {[
                { icon: "✉", label: "Email", val: email, href: `mailto:${email}` },
                { icon: "☎", label: "Téléphone", val: telephone, href: `tel:${telephone}` },
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

            <div className="mt-10">
              <p className="font-body text-gray-400 text-xs tracking-widest uppercase mb-4">Réseaux sociaux</p>
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
            <h2 className="font-display text-3xl text-ink tracking-wider mb-10">NOUS ÉCRIRE</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { name: "nom",     label: "Nom complet *",  type: "text",  placeholder: "Votre nom", required: true },
                { name: "email",   label: "Email *",         type: "email", placeholder: "votre@email.com", required: true },
                { name: "numero",  label: "Numéro de téléphone *", type: "tel", placeholder: "ex: +1...", required : true},
                { name: "sujet",   label: "Sujet",           type: "text",  placeholder: "Objet du message", required: false },
              ].map(({ name, label, type, placeholder, required }) => (
                <div key={name}>
                  <label className="block font-body text-gray-400 text-xs tracking-widest uppercase mb-2">{label}</label>
                  <input type={type} name={name} required={required} value={form[name]}
                    onChange={handleChange} placeholder={placeholder}
                    className="w-full bg-white border border-gray-200 focus:border-ink text-ink placeholder-gray-300 font-body text-sm px-4 py-3 outline-none transition-colors" />
                </div>
              ))}
              <div>
                <label className="block font-body text-gray-400 text-xs tracking-widest uppercase mb-2">Message *</label>
                <textarea name="message" required rows={5} value={form.message} onChange={handleChange}
                  placeholder="Votre message ici…"
                  className="w-full bg-white border border-gray-200 focus:border-ink text-ink placeholder-gray-300 font-body text-sm px-4 py-3 outline-none transition-colors resize-none" />
              </div>
              <button type="submit"
                className="w-full bg-ink text-white font-body font-semibold text-xs tracking-widest uppercase px-8 py-4 hover:bg-ink-light transition-all">
                Envoyer le message
              </button>
              {envoye && <p className="text-green-600 text-sm text-center font-body animate-fade-in-up">✓ Votre client mail s&apos;est ouvert !</p>}
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
