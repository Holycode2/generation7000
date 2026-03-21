// pages/404.jsx
import Layout from "../components/Layout";
import Link from "next/link";

export default function NotFound() {
  return (
    <Layout title="Page introuvable">
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <span className="font-display text-gray-100 leading-none" style={{ fontSize: "clamp(6rem,20vw,14rem)" }}>404</span>
        <h1 className="font-display text-4xl text-ink tracking-wider mb-4 -mt-4">PAGE INTROUVABLE</h1>
        <div className="divider-ink" />
        <p className="text-gray-500 font-body mb-10 max-w-md">Cette page n&apos;existe pas. Retournez à l&apos;accueil.</p>
        <Link href="/" className="bg-ink text-white font-body font-semibold text-xs tracking-widest uppercase px-8 py-4 hover:bg-ink-light transition-all">
          Retour à l&apos;accueil
        </Link>
      </div>
    </Layout>
  );
}
