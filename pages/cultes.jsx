// pages/cultes.jsx
import Layout from "../components/Layout";
import cultes from "../data/cultes";
import siteConfig from "../data/siteConfig";

const ORDRE = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];

export default function Cultes() {
  const parJour = ORDRE.reduce((acc, jour) => {
    const items = cultes.filter(c => c.jour === jour);
    if (items.length) acc[jour] = items;
    return acc;
  }, {});

  return (
    <Layout title="Programme des cultes" description="Horaires des cultes de Génération 7000.">
<section className="py-28 px-6 relative"
  style={{
    backgroundImage: "url('/images/culte.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}>
  <div className="absolute inset-0 bg-black/55" />
  <div className="max-w-4xl mx-auto relative z-10">

          <p className="font-body text-gray-400 text-white tracking-[0.4em] uppercase mb-4">Rejoignez-nous</p>
          <h1 className="font-display text-6xl md:text-8xl text-white tracking-wider">PROGRAMME<br/>DES CULTES</h1>
        </div>
      </section>

      <section className="py-20 px-6 max-w-4xl mx-auto space-y-14">
        {Object.entries(parJour).map(([jour, items]) => (
          <div key={jour}>
            <div className="flex items-center gap-6 mb-6">
              <h2 className="font-display text-3xl text-ink tracking-wider">{jour.toUpperCase()}</h2>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="space-y-3">
              {items.map(culte => (
                <div key={culte.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 bg-white border border-gray-100 px-8 py-5 card-shadow hover:card-shadow-hover transition-all">
                  <span className="font-display text-2xl text-ink min-w-[80px]">{culte.heure}</span>
                  <div className="hidden sm:block w-px h-8 bg-gray-200" />
                  <div>
                    <p className="font-display text-xl text-ink tracking-wide">{culte.type}</p>
                    <p className="font-body text-gray-400 text-xs mt-1">
                      📍 {culte.lieu}{culte.notes && <span className="ml-3">· {culte.notes}</span>}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="py-20 px-6 bg-ash text-center">
        <div className="max-w-xl mx-auto">
          <h3 className="font-display text-4xl text-ink tracking-wider mb-4">PREMIÈRE VISITE ?</h3>
          <p className="font-body text-gray-500 leading-relaxed mb-8">
            Vous êtes les bienvenus ! Venez tel que vous êtes.
          </p>
          <a href={`mailto:${siteConfig.email}`}
            className="inline-block border border-ink text-ink font-body text-xs tracking-widest uppercase px-8 py-3 hover:bg-ink hover:text-white transition-all">
            Nous contacter
          </a>
        </div>
      </section>
    </Layout>
  );
}
