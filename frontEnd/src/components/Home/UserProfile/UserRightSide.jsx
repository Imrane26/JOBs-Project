import React, { useState } from 'react';
import axios from 'axios';

export default function UserRightSide({ offres = [], publications = [], isRecruiter = false, loading = false }) {
  const [activeTab, setActiveTab] = useState('publications');
  const token = sessionStorage.getItem('loginData');
  const removeItem = async (url) => {
    try { await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } }); window.location.reload(); } catch (error) { console.error('Impossible de supprimer cet élément.', error); }
  };
  const formatDate = (value) => value ? new Date(value).toLocaleDateString('fr-FR') : '';
  return (
    <section className="profile-activity">
      <div className="activity-heading"><div><span>Votre activité</span><h2>{isRecruiter ? 'Votre présence sur JOB’S' : 'Votre parcours sur JOB’S'}</h2></div><div className="activity-count"><strong>{publications.length + offres.length}</strong><small>élément(s)</small></div></div>
      <div className="profile-tabs" role="tablist"><button className={activeTab === 'publications' ? 'selected' : ''} onClick={() => setActiveTab('publications')}>Publications <b>{publications.length}</b></button><button className={activeTab === 'offres' ? 'selected' : ''} onClick={() => setActiveTab('offres')}>Offres d’emploi <b>{offres.length}</b></button></div>
      {loading ? <EmptyState>Chargement de votre activité…</EmptyState> : activeTab === 'publications' ? (
        publications.length ? <div className="activity-list">{publications.map((pub) => <article className="activity-card" key={pub._id}><div className="activity-card-top"><span className="activity-icon">✦</span><div><strong>{pub.titre || 'Publication JOB’S'}</strong><small>{formatDate(pub.date_publication)}</small></div></div><p>{pub.contenu || 'Cette publication ne contient pas encore de description.'}</p><button className="delete-action" onClick={() => removeItem(`http://localhost:3000/api/publication/${pub._id}`)}>Supprimer</button></article>)}</div> : <EmptyState>Vous n’avez pas encore publié de contenu.</EmptyState>
      ) : (
        offres.length ? <div className="activity-list">{offres.map((offre) => <article className="activity-card" key={offre._id}><div className="activity-card-top"><span className="activity-icon">↗</span><div><strong>{offre.titre}</strong><small>{offre.lieu || 'Lieu non renseigné'} · {formatDate(offre.date_publication)}</small></div></div><p>{offre.description || offre.autres_informations || 'Cette offre ne contient pas encore de description.'}</p><div className="offer-meta"><span>{offre.typeContrat || 'Contrat à préciser'}</span><span>{offre.idEntreprises?.nom || 'Votre entreprise'}</span></div><button className="delete-action" onClick={() => removeItem(`http://localhost:3000/api/offres/${offre._id}`)}>Supprimer</button></article>)}</div> : <EmptyState>Vous n’avez pas encore publié d’offre.</EmptyState>
      )}
    </section>
  );
}

function EmptyState({ children }) { return <div className="profile-empty">{children}</div>; }
