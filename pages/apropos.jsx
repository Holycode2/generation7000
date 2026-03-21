// pages/apropos.jsx
import Layout from "../components/Layout";

const PRESENTATION = `La Génération 7000 est une structure dont la mission est de vous inviter à redécouvrir l’Évangile de Christ et à comprendre son Royaume.
Nous vous accompagnons pour bâtir une vie équilibrée qui nourrit votre éveil spirituel au quotidien.`;
const MISSION = `"Nous formons des ouvriers pour la moisson et développons leurs talents avec soin".`;


const VALEURS = [
  { titre: "L’AMOUR ET L’HOSPITALITÉ", texte: "Servir avec amour, accueillir avec cœur.(Galates 5:13)" },
  
];

export default function Apropos() {
  return (
    <Layout title="Vision & Mission" description="Découvrez la vision, la mission et les valeurs de Génération 7000.">

      {/* Header */}
      <section className="py-28 px-6 border-b border-gray-100 relative"
  style={{
    backgroundImage: "url('/images/vision.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}>
  <div className="absolute inset-0 bg-black/60" />
  <div className="max-w-4xl mx-auto relative z-10">
          <p className="font-body text-gray-400 text-xs tracking-[0.4em] uppercase mb-4">Qui sommes-nous</p>
         <h1 className="font-display text-6xl md:text-8xl text-white tracking-wider">VISION </h1>
        </div>
      </section>

      {/* Présentation */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-body text-gray-600 text-xl leading-relaxed">{PRESENTATION}</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-6 bg-ash">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className="font-body text-black-600 leading-relaxed">{MISSION}</p>
          </div>
          <div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
     <section
  className="py-24 px-6 relative"
  style={{
    backgroundImage: "url('/images/vision2.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="absolute inset-0 bg-black/60" />
  <div className="max-w-6xl mx-auto relative z-10">
    <p className="font-body text-gray-400 text-xs tracking-[0.4em] uppercase mb-4">
      Ce qui nous définit
    </p>
    <h2 className="font-display text-5xl md:text-6xl text-white tracking-wider">
      NOS VALEURS
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 mt-10">
      {VALEURS.map((v, i) => (
        <div key={i} className="bg-white p-10 hover:bg-ash transition-colors group">
          <span className="font-display text-gray-100 text-6xl group-hover:text-gray-200 transition-colors block mb-4">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display text-2xl text-ink tracking-wider mb-3">
            {v.titre.toUpperCase()}
          </h3>
          <p className="font-body text-gray-500 text-sm leading-relaxed">{v.texte}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Verset */}
      <section className="py-24 px-6 bg-ink text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-12 h-px bg-white/20 mx-auto mb-10" />
          <blockquote className="font-accent italic text-white/70 text-2xl leading-relaxed mb-6">
            «  Mais je laisserai en Israël sept mille hommes, tous ceux qui n’ont point fléchi les genoux devant Baal, et dont la bouche ne l’a point baisé. »
          </blockquote>
          <p className="font-body text-gray-500 text-xs tracking-widest uppercase">1 Rois 19:18</p>
          <div className="w-12 h-px bg-white/20 mx-auto mt-10" />
        </div>
      </section>

    </Layout>
  );
}
