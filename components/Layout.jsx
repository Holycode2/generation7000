// components/Layout.jsx
import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";

export default function Layout({ children, title, description }) {
  const pageTitle = title ? `${title} — Génération 7000` : "Génération 7000 | Une génération mise à part";
  const pageDesc  = description || "La Génération 7000 est une structure dont la mission est de vous inviter à redécouvrir l'Évangile de Christ et à comprendre son Royaume.";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Logo dans l'onglet du navigateur */}
        <link rel="icon" href="/images/g7k.png" />

        {/* Open Graph — partage WhatsApp, Facebook, Instagram */}
        <meta property="og:title"       content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image"       content="/images/g7k.png" />
        <meta property="og:type"        content="website" />
      </Head>
      <Navbar />
      <main className="pt-16 min-h-screen bg-white">{children}</main>
      <Footer />
    </>
  );
}