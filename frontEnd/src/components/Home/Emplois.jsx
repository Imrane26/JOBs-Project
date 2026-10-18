import React, { useState } from "react";
import styled from "styled-components";
import OffreCard from "./Layouts/OffreCard";
import { useSearchParams } from "react-router-dom";

export default function Emplois() {
  let userData = {};
  try { userData = JSON.parse(sessionStorage.getItem("userData") || '{}') || {}; } catch { userData = {}; }
  const isRecruiter = Boolean(userData.idEntreprise || userData.type_user === 'recruteur');
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("search") || "");
  const [location, setLocation] = useState("");
  const [contract, setContract] = useState("");
  const [filters, setFilters] = useState({ keyword: searchParams.get("search") || "", location: "", contract: "" });

  const applyFilters = () => setFilters({ keyword: keyword.trim(), location: location.trim(), contract });

  return (
    <Container>
      <Intro>
        <div><span>Opportunités</span><h1>Trouvez un emploi qui vous ressemble.</h1><p>Parcourez les offres disponibles et commencez par ce qui compte pour vous.</p></div>
        {isRecruiter && <PublishButton href="/offreform">Publier une offre</PublishButton>}
      </Intro>
      <Layout>
        <Sidebar>
          <CommunityCard>
            <strong>Affiner votre recherche</strong>
            <label>Mot-clé<input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Ex. développeur React" /></label>
            <label>Localisation<input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Ex. Marrakech" /></label>
            <label>Type de contrat<select value={contract} onChange={(e) => setContract(e.target.value)}><option value="">Tous les contrats</option><option value="CDI">CDI</option><option value="CDD">CDD</option><option value="Stage">Stage</option><option value="Freelance">Freelance</option><option value="Temps partiel">Temps partiel</option></select></label>
            <button type="button" onClick={applyFilters}>Appliquer les filtres</button>
          </CommunityCard>
        </Sidebar>
        <OffreCard searchTerm={filters.keyword} locationTerm={filters.location} contractTerm={filters.contract} />
      </Layout>
    </Container>
  );
}

const Container = styled.div`
  padding: 92px 28px 40px;
  max-width: 1240px;
  margin: 0 auto;

  @media (max-width: 768px) {
    margin-top: 12px;
  }
`;

const Intro = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 24px;
  margin-bottom: 28px;
  span { color: var(--jobs-green-dark); text-transform: uppercase; letter-spacing: .1em; font-size: .78rem; font-weight: 800; }
  h1 { margin: 8px 0; color: var(--jobs-ink); font-size: clamp(2rem, 4vw, 3rem); letter-spacing: -.04em; }
  p { margin: 0; color: var(--jobs-muted); }
  @media (max-width: 768px) { flex-direction: column; align-items: start; }
`;

const Layout = styled.div`
  margin: 0;
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  column-gap: 24px;
  grid-template-rows: auto;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
    row-gap: 25px;
    margin-top: 15px;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CommunityCard = styled.div`
  padding: 20px;
  background: white;
  border: 1px solid var(--jobs-border);
  border-radius: 16px;
  strong { display: block; color: var(--jobs-ink); margin-bottom: 18px; }
  label { display: block; color: var(--jobs-muted); font-size: .78rem; font-weight: 700; margin: 14px 0; }
  input, select { width: 100%; margin-top: 6px; padding: 10px; border: 1px solid var(--jobs-border); border-radius: 8px; outline: none; background: #fff; color: var(--jobs-text); }
  input:focus { border-color: var(--jobs-green); box-shadow: 0 0 0 3px var(--jobs-green-soft); }
  button { width: 100%; border: 0; border-radius: 9px; padding: 11px; color: white; background: var(--jobs-green); font-weight: 700; cursor: pointer; }
`;

const PublishButton = styled.a`
  background: var(--jobs-green);
  color: white;
  padding: 12px 18px;
  border-radius: 10px;
  font-weight: 700;
`;
