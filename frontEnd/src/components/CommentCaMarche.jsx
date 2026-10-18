import React from "react";
import { Link } from "react-router-dom";
import "../style/InfoPages.css";

const steps = [
  { number: "01", title: "Créez votre profil", text: "Ajoutez vos informations, votre parcours et les compétences qui vous représentent." },
  { number: "02", title: "Explorez les opportunités", text: "Recherchez les offres qui correspondent à votre profil, votre métier ou votre ville." },
  { number: "03", title: "Avancez sereinement", text: "Postulez, échangez avec les entreprises et construisez la suite de votre parcours." },
];

const CommentCaMarche = () => (
  <main className="info-page">
    <header className="info-page-header">
      <Link to="/" className="info-logo"><img src="logo-no-background-green.png" alt="JOB'S" /></Link>
      <Link to="/" className="info-back">← Retour à l’accueil</Link>
    </header>

    <section className="how-hero">
      <span className="info-eyebrow">Une expérience simple</span>
      <h1>Trouvez votre opportunité en quelques étapes.</h1>
      <p>JOB’S simplifie la rencontre entre les candidats et les entreprises.</p>
    </section>

    <section className="steps-grid" aria-label="Les étapes de JOB'S">
      {steps.map((step) => (
        <article className="step-card" key={step.number}>
          <span className="step-number">{step.number}</span>
          <h2>{step.title}</h2>
          <p>{step.text}</p>
        </article>
      ))}
    </section>

    <section className="info-cta">
      <div><span className="info-eyebrow">À vous de jouer</span><h2>Un profil clair ouvre de nouvelles possibilités.</h2></div>
      <div className="info-cta-actions"><Link to="/créer-compte" className="info-primary">Créer un compte</Link><Link to="/entreprises" className="info-secondary">Découvrir les entreprises</Link></div>
    </section>
  </main>
);

export default CommentCaMarche;
