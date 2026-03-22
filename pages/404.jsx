// pages/404.jsx — BILINGUE FR/EN
import Layout from "../components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";

const TEXTES = {
  fr: {
    titre: "PAGE INTROUVABLE",
    texte: "Cette page n'existe pas. Retournez à l'accueil.",
    btn:   "Retour à l'accueil",
  },
  en: {
    titre: "PAGE NOT FOUND",
    texte: "This page does not exist. Return to the home page.",
    btn:   "Back to home",
  },
};

export default function NotFound() {
  const { locale } = useRouter();
  const t = TEXTES[locale] || TEXTES.fr;

  return (
    <Layout title={t.titre}>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <span className="font-display text-gray-100 leading-none" style={{ fontSize: "clamp(6rem,20vw,14rem)" }}>404</span>
        <h1 className="font-display text-4xl text-ink tracking-wider mb-4 -mt-4">{t.titre}</h1>
        <div className="divider-ink" />
        <p className="text-gray-500 font-body mb-10 max-w-md">{t.texte}</p>
        <Link href="/" className="bg-ink text-white font-body font-semibold text-xs tracking-widest uppercase px-8 py-4 hover:bg-ink-light transition-all">
          {t.btn}
        </Link>
      </div>
    </Layout>
  );
}