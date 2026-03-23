// components/Layout.jsx
import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";
import siteConfig from "../data/siteConfig";

const DOMAINE = "https://g7kministries.online";

export default function Layout({ children, title, description }) {
  const pageTitle = title ? `${title} — Génération 7000` : "Génération 7000 | Une génération mise à part";
  const pageDesc  = description || siteConfig.description;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Logo dans l'onglet du navigateur */}
        <link rel="icon" href="/images/g7k.png" />

        {/* Open Graph — partage WhatsApp, Facebook, Instagram */}
        <meta property="og:type"         content="website" />
        <meta property="og:url"          content={DOMAINE} />
        <meta property="og:title"        content={pageTitle} />
        <meta property="og:description"  content={pageDesc} />
        <meta property="og:image"        content={`${DOMAINE}/images/g7k.png`} />
        <meta property="og:image:width"  content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name"    content="Génération 7000" />

        {/* Twitter / X */}
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image"       content={`${DOMAINE}/images/g7k.png`} />
      </Head>
      <Navbar />
      <main className="pt-16 min-h-screen bg-white">{children}</main>
      <Footer />
    </>
  );
}