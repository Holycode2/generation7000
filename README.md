# 🔥 Génération 7000 — Site Vitrine

Site vitrine officiel du ministère Génération 7000.
Construit avec **Next.js 14** + **Tailwind CSS**.

---

## 📁 Structure des fichiers

```
generation-7000/
├── data/                   ← CONTENU FACILE À MODIFIER
│   ├── leaders.js          ← Liste des leaders (nom, bio, réseaux...)
│   ├── evenements.js       ← Liste des événements
│   ├── cultes.js           ← Programme des cultes
│   └── siteConfig.js       ← Email, réseaux sociaux, infos générales
│
├── pages/                  ← Une page = un fichier
│   ├── index.jsx           ← Accueil
│   ├── apropos.jsx         ← Vision & Mission
│   ├── evenements.jsx      ← Événements
│   ├── cultes.jsx          ← Programme des cultes
│   ├── medias.jsx          ← Réseaux sociaux
│   ├── contact.jsx         ← Formulaire de contact
│   ├── 404.jsx             ← Page d'erreur
│   ├── _app.js             ← Point d'entrée Next.js
│   └── leaders/
│       ├── index.jsx       ← Liste des leaders
│       └── [slug].jsx      ← Page individuelle (générée automatiquement)
│
├── components/             ← Éléments réutilisables
│   ├── Layout.jsx          ← Enveloppe toutes les pages (head + nav + footer)
│   ├── Navbar.jsx          ← Navigation
│   └── Footer.jsx          ← Pied de page
│
├── public/
│   └── images/             ← Place tes photos ici
│       ├── leader-placeholder.jpg
│       └── event-placeholder.jpg
│
├── styles/
│   └── globals.css         ← Styles globaux + polices
│
├── tailwind.config.js      ← Couleurs et polices personnalisées
├── next.config.js
└── package.json
```

---

## 🚀 Lancer le projet en local

### Prérequis
- [Node.js](https://nodejs.org/) version 18 ou plus
- npm (inclus avec Node.js)

### Étapes

```bash
# 1. Ouvre un terminal dans le dossier du projet
cd generation-7000

# 2. Installe les dépendances
npm install

# 3. Lance le serveur de développement
npm run dev

# 4. Ouvre dans ton navigateur :
# http://localhost:3000
```

---

## ✏️ Comment modifier le contenu

### Ajouter un leader
Ouvre `data/leaders.js` et copie-colle un objet existant :
```js
{
  slug: "frere-jean",              // ← URL : /leaders/frere-jean
  nom: "Frère Jean",
  role: "Responsable Musique",
  photo: "/images/jean.jpg",       // ← place la photo dans /public/images/
  bio: "Biographie ici...",
  versets: ["« Verset... » — Référence"],
  reseaux: { instagram: "https://instagram.com/..." }
}
```

### Ajouter un événement
Ouvre `data/evenements.js` et ajoute un objet avec un `id` unique.

### Modifier les horaires des cultes
Ouvre `data/cultes.js` — modifie directement les champs `jour`, `heure`, `type`.

### Changer les couleurs
Ouvre `tailwind.config.js`, section `colors` → modifie `gold`, `charcoal`, `cream`.

### Ajouter des photos
Place tes fichiers JPG/PNG dans `public/images/`, puis référence-les avec `/images/ton-fichier.jpg`.

---

## 📤 Publier sur GitHub

### Étape 1 — Créer un compte GitHub
Va sur [github.com](https://github.com) et crée un compte gratuit si tu n'en as pas.

### Étape 2 — Créer un repository
1. Clique sur le bouton vert **"New"** en haut à gauche
2. Nom du repo : `generation-7000` (ou ce que tu veux)
3. Laisse **Public** coché
4. **Ne coche pas** "Add README" (on en a déjà un)
5. Clique **"Create repository"**

### Étape 3 — Initialiser Git et pousser le projet

Ouvre un terminal dans le dossier `generation-7000` :

```bash
# Initialise Git
git init

# Ajoute tous les fichiers
git add .

# Premier commit
git commit -m "🔥 Initial commit — Génération 7000"

# Connecte ton repo GitHub (remplace TON_USERNAME par ton pseudo GitHub)
git remote add origin https://github.com/TON_USERNAME/generation-7000.git

# Pousse le code
git branch -M main
git push -u origin main
```

---

## 🌐 Déployer sur Vercel (recommandé — gratuit)

Vercel est fait pour Next.js — déploiement en 2 minutes.

1. Va sur [vercel.com](https://vercel.com) et connecte-toi avec **GitHub**
2. Clique **"New Project"**
3. Sélectionne ton repo `generation-7000`
4. Laisse tout par défaut et clique **"Deploy"**
5. ✅ Ton site est en ligne sur une URL du type `generation-7000.vercel.app`

### Déploiements automatiques
À chaque fois que tu fais un `git push`, Vercel redéploie automatiquement ton site. Zéro configuration supplémentaire.

### Domaine personnalisé (ex: generation7000.com)
Dans Vercel → ton projet → **Settings** → **Domains** → ajoute ton domaine.

---

## 🌐 Alternative : Netlify

1. Va sur [netlify.com](https://netlify.com) et connecte-toi avec GitHub
2. **"Add new site"** → **"Import an existing project"**
3. Sélectionne ton repo
4. Build command : `npm run build`
5. Publish directory : `.next`
6. Clique **"Deploy site"**

---

## 🎨 Personnalisation rapide

| Ce que tu veux changer | Où aller |
|------------------------|----------|
| Couleurs du site | `tailwind.config.js` → `colors` |
| Nom & slogan | `data/siteConfig.js` |
| Email & téléphone | `data/siteConfig.js` |
| Réseaux sociaux | `data/siteConfig.js` → `reseaux` |
| Texte Vision/Mission | `pages/apropos.jsx` (constantes en haut) |
| Texte Hero | `pages/index.jsx` (constantes en haut) |
| Menu de navigation | `components/Navbar.jsx` → `navLinks` |

---

*Site développé pour le ministère Génération 7000.*
