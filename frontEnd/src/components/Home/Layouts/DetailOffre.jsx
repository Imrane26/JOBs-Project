import React from 'react';
import styled from 'styled-components';

export default function OfferDetails({ offer, onClose }) {
  const company = offer.idEntreprises || {};
  return (
    <Overlay onClick={onClose}><DetailsContainer onClick={(event) => event.stopPropagation()}><CloseButton type="button" onClick={onClose}>×</CloseButton><CompanyMark>{(company.nom || 'E').charAt(0).toUpperCase()}</CompanyMark><Eyebrow>{company.activite || 'Opportunité professionnelle'}</Eyebrow><Title>{offer.titre || 'Offre d’emploi'}</Title><Company>{company.nom || 'Entreprise JOB’S'} · {offer.lieu || 'Lieu non renseigné'}</Company><Description>{offer.description || 'Aucune description disponible.'}</Description><InfoGrid><Info label="Contrat" value={offer.typeContrat} /><Info label="Mode de travail" value={offer.modeTravail || 'Sur site'} /><Info label="Salaire" value={offer.salaire} /><Info label="Début des candidatures" value={formatDate(offer.date_debut)} /><Info label="Fin des candidatures" value={formatDate(offer.date_fin)} /></InfoGrid><Block><strong>Expérience recherchée</strong><p>{offer.experiences || 'Non précisée'}</p></Block><Block><strong>Compétences</strong><p>{Array.isArray(offer.competences) ? offer.competences.join(' · ') : offer.competences || 'Non précisées'}</p></Block></DetailsContainer></Overlay>
  );
}
const formatDate = (value) => value ? new Date(value).toLocaleDateString('fr-FR') : 'Non précisée';
const Overlay = styled.div`position: fixed; inset: 0; z-index: 200; display: grid; place-items: center; padding: 20px; background: rgba(24, 37, 31, .38);`;
const DetailsContainer = styled.section`position: relative; width: min(620px, 100%); max-height: 88vh; overflow-y: auto; padding: 30px; border-radius: 20px; background: #fff; box-shadow: 0 20px 50px rgba(24, 37, 31, .2);`;
const CloseButton = styled.button`position: absolute; top: 18px; right: 18px; width: 32px; height: 32px; border: 0; border-radius: 8px; background: var(--jobs-green-soft); color: var(--jobs-green-dark); font-size: 1.35rem; cursor: pointer;`;
const CompanyMark = styled.div`width: 50px; height: 50px; display: grid; place-items: center; margin-bottom: 18px; border-radius: 13px; background: var(--jobs-green-soft); color: var(--jobs-green-dark); font-size: 1.3rem; font-weight: 800;`;
const Eyebrow = styled.span`color: var(--jobs-green-dark); font-size: .75rem; font-weight: 800; letter-spacing: .09em; text-transform: uppercase;`;
const Title = styled.h2`margin: 8px 0 5px; color: var(--jobs-ink); font-size: 1.7rem;`;
const Company = styled.div`color: var(--jobs-muted); font-size: .85rem;`;
const Description = styled.p`margin: 22px 0; color: var(--jobs-text); line-height: 1.6;`;
const InfoGrid = styled.div`display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 20px;`;
const Info = styled.div`padding: 12px; border-radius: 10px; background: var(--jobs-background); span, strong { display: block; } span { color: var(--jobs-muted); font-size: .72rem; } strong { margin-top: 5px; color: var(--jobs-ink); font-size: .84rem; }`;
const Block = styled.div`padding-top: 16px; border-top: 1px solid var(--jobs-border); strong { color: var(--jobs-ink); font-size: .85rem; } p { margin: 7px 0 0; color: var(--jobs-text); line-height: 1.5; font-size: .86rem; }`;
