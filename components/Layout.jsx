// components/Layout.jsx

import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import siteConfig from "../data/siteConfig";

const DOMAINE = "https://g7kministries.online";
const SITE_NAME = "G7K Ministries";
// Même identité visuelle que la navbar — version carrée pour Google / favicon.
const SITE_LOGO = `${DOMAINE}/images/g7k_favicon-192.png`;

// `image` et `url` permettent aux pages dynamiques (ex : un événement)
// de fournir leur propre aperçu de partage.
export default function Layout({ children, title, description, image, url }) {
  const pageTitle = title
    ? `${title} — ${SITE_NAME}`
    : `${SITE_NAME} | Une génération mise à part`;

  const pageDesc = description || siteConfig.description;

  // Les images des données sont des chemins relatifs ("/images/…") :
  // les réseaux sociaux exigent une URL absolue.
  const pageImage = image
    ? (image.startsWith("http") ? image : `${DOMAINE}${image}`)
    : `${DOMAINE}/images/g7k.png`;

  const pageUrl = url || DOMAINE;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>

        <meta
          name="description"
          content={pageDesc}
        />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        <link rel="icon" href="/images/g7k_favicon-48.png" sizes="48x48" type="image/png" />
        <link rel="icon" href="/images/g7k_favicon-192.png" sizes="192x192" type="image/png" />
        <link rel="apple-touch-icon" href="/images/g7k_apple-touch-icon.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteConfig.nom.replace(/\.$/, ""),
              url: DOMAINE,
              logo: SITE_LOGO,
            }),
          }}
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image" content={pageImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content={pageImage} />
      </Head>

      <Navbar />

      {/* Aucun décalage en haut : la navbar flotte au-dessus du contenu, les
          premières sections des pages ménagent déjà l'espace nécessaire. */}
      <main className="min-h-screen">
        {children}
      </main>

      <Footer />
    </>
  );
}