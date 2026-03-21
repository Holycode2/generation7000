// components/Layout.jsx
import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";

export default function Layout({ children, title, description }) {
  const pageTitle = title ? `${title} — Génération 7000` : "Génération 7000 | Une génération mise à part";
  const pageDesc  = description || "Ministère chrétien dédié à susciter une génération consacrée à Dieu.";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title"       content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type"        content="website" />
      </Head>
      <Navbar />
      <main className="pt-16 min-h-screen bg-white">
        {children}
      </main>
      <Footer />
    </>
  );
}
