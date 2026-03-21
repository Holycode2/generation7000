// pages/evenements.jsx
import Layout from "../components/Layout";
import evenements from "../data/evenements";

export default function Evenements() {
  return (
    <Layout title="Événements" description="Prochains événements de Génération 7000.">

      <section className="py-28 px-6 relative"
  style={{
    backgroundImage: "url('/images/empowher.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}>
  <div className="absolute inset-0 bg-black/55" />
  <div className="max-w-4xl mx-auto relative z-10">

          <p className="font-body text-gray-400 text-white tracking-[0.4em] uppercase mb-4">Agenda</p>
          <h1 className="font-display text-6xl md:text-8xl text-white tracking-wider">ÉVÉNEMENTS</h1>
        </div>
      </section>

      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="space-y-6">
          {evenements.map((evt) => (
            <article key={evt.id}
              className="flex flex-col md:flex-row bg-white border border-gray-100 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-0.5 group">

              {/* Bande date */}
              <div className="bg-ink text-white flex flex-col items-center justify-center px-10 py-8 min-w-[130px]">
                <span className="font-display text-4xl leading-none">
                  {new Date(evt.date).getDate()}
                </span>
                <span className="font-body text-gray-400 text-xs tracking-widest uppercase mt-1">
                  {new Date(evt.date).toLocaleDateString("fr-FR", { month: "short" })}
                </span>
                <span className="font-body text-gray-500 text-xs mt-1">
                  {new Date(evt.date).getFullYear()}
                </span>
              </div>

              {evt.image && (
  <img
    src={evt.image}
    alt={evt.titre}
    className="w-full h-52 object-cover"
  />
)}


              {/* Contenu */}
              <div className="p-8 flex-1">
                <div className="flex flex-wrap gap-4 mb-3 text-xs font-body tracking-wider text-gray-400 uppercase">
                  <span>⏰ {evt.heure}</span>
                  <span>📍 {evt.lieu}</span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-ink tracking-wide mb-4 group-hover:text-ink-soft transition-colors">
                  {evt.titre}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{evt.description}</p>
                {evt.lienInscription && evt.lienInscription !== "#" && (
                  <a href={evt.lienInscription} target="_blank" rel="noopener noreferrer"
                    className="inline-block bg-ink text-white font-body font-semibold text-xs tracking-widest uppercase px-6 py-3 hover:bg-ink-light transition-all">
                    Suivre
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {evenements.length === 0 && (
          <p className="text-center text-gray-400 font-body py-20">Aucun événement pour le moment.</p>
        )}
      </section>
    </Layout>
  );
}
