// pages/404.jsx — BILINGUE FR/EN
import Layout from "../components/Layout";
import Link from "next/link";
import { useTranslation } from "../hooks/useTranslation";

export default function NotFound() {
  const { t } = useTranslation();
  const n = t.notFound;

  return (
    <Layout title={n.title}>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <span className="font-display text-gray-100 leading-none" style={{ fontSize: "clamp(6rem,20vw,14rem)" }}>404</span>
        <h1 className="font-display text-4xl text-ink tracking-wider mb-4 -mt-4">{n.title}</h1>
        <div className="divider-ink" />
        <p className="text-gray-500 font-body mb-10 max-w-md">{n.text}</p>
        <Link href="/" className="bg-ink text-white font-body font-semibold text-xs tracking-widest uppercase px-8 py-4 hover:bg-ink-light transition-all">
          {n.btn}
        </Link>
      </div>
    </Layout>
  );
}
