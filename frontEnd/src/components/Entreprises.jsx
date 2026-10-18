import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style/InfoPages.css";

const Entreprises = () => {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("Toutes les villes");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/api/entreprises/catalogue")
      .then(({ data }) => setCompanies(Array.isArray(data) ? data : []))
      .catch(() => setError("Le catalogue des entreprises est indisponible pour le moment."))
      .finally(() => setLoading(false));
  }, []);

  const filteredCompanies = useMemo(() => companies.filter((company) => {
    const name = company.nom || "";
    const activity = company.activite || "";
    const cityName = company.adresse || "";
    const matchesQuery = `${name} ${activity} ${cityName}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (city === "Toutes les villes" || cityName.toLowerCase().includes(city.toLowerCase()));
  }), [companies, query, city]);

  const cities = useMemo(() => Array.from(new Set(companies.map((company) => company.adresse).filter(Boolean))), [companies]);

  return (
    <main className="info-page companies-page">
      <header className="info-page-header">
        <Link to="/" className="info-logo"><img src="logo-no-background-green.png" alt="JOB'S" /></Link>
        <Link to="/" className="info-back">← Retour à l’accueil</Link>
      </header>

      <section className="companies-hero">
        <div><span className="info-eyebrow">Le réseau JOB’S</span><h1>Découvrez les entreprises qui recrutent.</h1><p>Explorez leur activité, leur environnement et les opportunités disponibles.</p></div>
        <div className="companies-count"><strong>{filteredCompanies.length}</strong><span>entreprises à découvrir</span></div>
      </section>

      <section className="company-toolbar" aria-label="Rechercher une entreprise">
        <div className="company-search"><i className="fas fa-search" aria-hidden="true"></i><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher une entreprise ou un secteur" /></div>
        <select value={city} onChange={(event) => setCity(event.target.value)} aria-label="Filtrer par ville">
          <option>Toutes les villes</option>{cities.map((cityName) => <option key={cityName}>{cityName}</option>)}
        </select>
      </section>

      <section className="companies-grid">
        {loading && <div className="empty-companies">Chargement des entreprises…</div>}
        {!loading && error && <div className="empty-companies">{error}</div>}
        {!loading && !error && filteredCompanies.map((company) => <article className="company-card" key={company._id || company.nom}>
          <div className="company-card-top"><span className="company-mark">{(company.nom || "E").slice(0, 2).toUpperCase()}</span><span className="company-offers">{company.offers || 0} offres</span></div>
          <h2>{company.nom || "Entreprise"}</h2><p className="company-activity">{company.activite || "Secteur professionnel"}</p><p className="company-city"><i className="fas fa-location-dot" aria-hidden="true"></i>{company.adresse || "Localisation non renseignée"}</p>
          <button type="button" className="company-link">Voir l’entreprise <span aria-hidden="true">→</span></button>
        </article>)}
        {!loading && !error && !filteredCompanies.length && <div className="empty-companies">Aucune entreprise ne correspond à votre recherche.</div>}
      </section>
    </main>
  );
};

export default Entreprises;
