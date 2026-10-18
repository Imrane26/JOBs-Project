import axios from 'axios';
import React from 'react';
import styled from 'styled-components';

export default function CompanyCard({ offer, onMoreInfoClick }) {
  let userData = {};
  try { userData = JSON.parse(sessionStorage.getItem('userData') || '{}') || {}; } catch { userData = {}; }
  const company = offer.idEntreprises || {};
  const isRecruiter = Boolean(userData.idEntreprise || userData.type_user === 'recruteur');
  const apply = async () => {
    if (offer.external && offer.applicationUrl) {
      window.open(offer.applicationUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    try { await axios.post(`http://127.0.0.1:3000/api/offres/${offer._id}/candidatures`, { candidatId: `${userData._id}` }); alert('Votre candidature a été envoyée.'); }
    catch (error) { console.error('Erreur lors de la candidature.', error); alert('La candidature n’a pas pu être envoyée.'); }
  };
  return (
    <CardContainer>
      <CompanyMark>{(company.nom || 'E').charAt(0).toUpperCase()}</CompanyMark>
      <CardContent>
        <CardHeader><div><CardTitle>{offer.titre || 'Offre d’emploi'}</CardTitle><CardCompany>{company.nom || 'Entreprise JOB’S'}</CardCompany></div><Contract>{offer.typeContrat || 'Contrat'}</Contract></CardHeader>
        <Meta><span><i className="fas fa-location-dot" /> {offer.lieu || 'Lieu non renseigné'}</span><span><i className="fas fa-house-laptop" /> {offer.modeTravail || 'Sur site'}</span></Meta>
        <CardActions>{!isRecruiter && <PrimaryButton type="button" onClick={apply}>{offer.external ? 'Voir l’offre' : 'Postuler'}</PrimaryButton>}<SecondaryButton type="button" onClick={() => onMoreInfoClick(offer)}>Voir les détails <span>→</span></SecondaryButton></CardActions>
      </CardContent>
    </CardContainer>
  );
}

const CardContainer = styled.article`display: flex; gap: 16px; padding: 20px; margin-bottom: 12px; border: 1px solid var(--jobs-border); border-radius: 16px; background: #fff; box-shadow: 0 8px 22px rgba(36, 51, 43, .04);`;
const CompanyMark = styled.div`width: 52px; height: 52px; flex: 0 0 auto; display: grid; place-items: center; border-radius: 13px; background: var(--jobs-green-soft); color: var(--jobs-green-dark); font-size: 1.3rem; font-weight: 800;`;
const CardContent = styled.div`min-width: 0; flex: 1;`;
const CardHeader = styled.div`display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;`;
const CardTitle = styled.h2`margin: 0; color: var(--jobs-ink); font-size: 1.05rem;`;
const CardCompany = styled.div`margin-top: 4px; color: var(--jobs-green-dark); font-size: .82rem; font-weight: 700;`;
const Contract = styled.span`padding: 6px 8px; border-radius: 7px; background: var(--jobs-green-soft); color: var(--jobs-green-dark); font-size: .72rem; font-weight: 800; white-space: nowrap;`;
const Meta = styled.div`display: flex; flex-wrap: wrap; gap: 12px; margin: 12px 0 9px; color: var(--jobs-muted); font-size: .77rem; i { margin-right: 4px; color: var(--jobs-green); }`;
const CardActions = styled.div`display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px;`;
const PrimaryButton = styled.button`border: 0; padding: 9px 13px; border-radius: 8px; background: var(--jobs-green); color: #fff; font-weight: 800; cursor: pointer; &:hover { background: var(--jobs-green-dark); }`;
const SecondaryButton = styled.button`border: 1px solid var(--jobs-border); padding: 9px 13px; border-radius: 8px; background: #fff; color: var(--jobs-green-dark); font-weight: 800; cursor: pointer; &:hover { background: var(--jobs-green-soft); }`;
