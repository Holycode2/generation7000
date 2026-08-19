// pages/contact.jsx — BILINGUE FR/EN
import { useState } from "react";
import Layout from "../components/Layout";
import Remnant from "../components/Remnant";
import IconeReseau, { reseauDe } from "../components/IconeReseau";
import siteConfig from "../data/siteConfig";
import { useTranslation } from "../hooks/useTranslation";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

const ACCENT = "#980000";
const PHOTO = "/images/IMG_4731.png";
const inputClass =
  "w-full bg-ash/50 border border-transparent focus:bg-white focus:border-ink text-ink placeholder-gray-300 font-body text-sm px-4 py-3.5 outline-none transition-colors";

export default function Contact() {
  const { t } = useTranslation();
  const c = t.contact;
  const cm = t.common;
  const { email, telephone, reseaux } = siteConfig;

  const [form, setForm] = useState({ nom: "", email: "", numero: "", sujet: "", message: "" });
  const [envoye, setEnvoye] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    window.open(
      `mailto:${email}?subject=${encodeURIComponent(form.sujet || c.sujetDef)}&body=${encodeURIComponent(
        `${cm.mailtoNom}: ${form.nom}\n${cm.mailtoEmail}: ${form.email}\n${cm.mailtoTel}: ${form.numero}\n\n${form.message}`
      )}`,
      "_blank"
    );
    setEnvoye(true);
    setTimeout(() => setEnvoye(false), 5000);
  }

  return (
    <Layout
      title={c.title}
      description={t.meta.contactDesc}
      image={PHOTO}
      url="https://g7kministries.online/contact"
    >

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[62vh] flex items-end overflow-hidden">
        <img
          src={PHOTO}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/30" />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-28 pb-16 md:pb-20">
          <p className="flex items-center gap-3 font-body text-white/60 text-xs tracking-[0.4em] uppercase mb-5">
            <Remnant tone="light" />
            {c.tag}
          </p>
          <h1 className="font-display text-6xl md:text-8xl text-white tracking-wider leading-none mb-5">
            {c.title}
          </h1>
          <p className="font-body text-white/70 text-base md:text-lg leading-relaxed max-w-xl">
            {c.subtitle}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 bg-ash">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[18rem_1fr] gap-10 lg:gap-14">

          {/* ── COORDONNÉES ──────────────────────────────── */}
          <aside className="space-y-5 lg:sticky lg:top-28 self-start">
            <div>
              <p className="font-body text-[10px] tracking-[0.35em] uppercase mb-2" style={{ color: ACCENT }}>
                {c.direct}
              </p>
              <h2 className="font-display text-3xl text-ink tracking-wider mb-2">{c.rejoindre}</h2>
              <p className="font-body text-gray-500 text-sm leading-relaxed">{c.reponse}</p>
            </div>

            <a
              href={`mailto:${email}`}
              className="group flex items-start gap-4 bg-white p-5 card-shadow hover:card-shadow-hover hover:-translate-y-0.5 transition-all"
            >
              <span className="w-11 h-11 flex items-center justify-center text-white shrink-0" style={{ backgroundColor: ACCENT }}>
                <EnvelopeIcon className="w-5 h-5" />
              </span>
              <span>
                <span className="block font-body text-gray-400 text-[10px] tracking-[0.28em] uppercase mb-1">{cm.email}</span>
                <span className="font-body text-ink text-sm break-all group-hover:text-ink-soft transition-colors">{email}</span>
              </span>
            </a>

            <a
              href={`tel:${telephone}`}
              className="group flex items-start gap-4 bg-white p-5 card-shadow hover:card-shadow-hover hover:-translate-y-0.5 transition-all"
            >
              <span className="w-11 h-11 bg-ink flex items-center justify-center text-white shrink-0">
                <PhoneIcon className="w-5 h-5" />
              </span>
              <span>
                <span className="block font-body text-gray-400 text-[10px] tracking-[0.28em] uppercase mb-1">{cm.phone}</span>
                <span className="font-body text-ink text-sm group-hover:text-ink-soft transition-colors">{telephone}</span>
              </span>
            </a>

            <div className="bg-white p-5 card-shadow">
              <p className="font-body text-gray-400 text-[10px] tracking-[0.28em] uppercase mb-4">{c.reseaux}</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(reseaux).map(([cle, r]) => (
                  <a
                    key={r.url}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={r.label.trim()}
                    aria-label={r.label.trim()}
                    className="inline-flex items-center gap-2 border border-gray-100 text-gray-500 hover:text-white hover:border-transparent hover:bg-ink font-body text-[11px] tracking-wide px-3 py-2 transition-all"
                  >
                    <IconeReseau nom={reseauDe(cle) || r.label} className="w-3.5 h-3.5" />
                    {r.label.trim()}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          {/* ── FORMULAIRE ───────────────────────────────── */}
          <div className="bg-white p-8 md:p-10 card-shadow">
            <h2 className="font-display text-3xl md:text-4xl text-ink tracking-wider mb-2">{c.ecrire}</h2>
            <span className="block w-10 h-px mb-8" style={{ backgroundColor: ACCENT }} />

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Champ
                  name="nom"
                  label={c.nom}
                  type="text"
                  placeholder={c.nomPh}
                  required
                  value={form.nom}
                  onChange={handleChange}
                />
                <Champ
                  name="email"
                  label={c.email}
                  type="email"
                  placeholder={c.emailPh}
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Champ
                  name="numero"
                  label={c.numero}
                  type="tel"
                  placeholder={c.numeroPh}
                  required
                  value={form.numero}
                  onChange={handleChange}
                />
                <Champ
                  name="sujet"
                  label={c.sujet}
                  type="text"
                  placeholder={c.sujetPh}
                  value={form.sujet}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-body text-gray-400 text-[10px] tracking-[0.28em] uppercase mb-2">
                  {c.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder={c.messagePh}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#980000] text-white font-body font-semibold text-xs tracking-widest uppercase px-8 py-4 hover:bg-ink transition-colors"
              >
                {c.envoyer}
              </button>

              {envoye && (
                <p className="text-center font-body text-sm" style={{ color: ACCENT }} role="status">
                  {c.confirm}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Champ({ name, label, type, placeholder, required, value, onChange }) {
  return (
    <div>
      <label htmlFor={name} className="block font-body text-gray-400 text-[10px] tracking-[0.28em] uppercase mb-2">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        required={required}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}
