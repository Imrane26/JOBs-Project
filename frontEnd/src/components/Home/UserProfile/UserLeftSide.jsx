import React from 'react';

export default function UserLeftSide({ userData = {}, isRecruiter = false }) {
  const formatDate = (value) => value ? new Date(value).toLocaleDateString('fr-FR') : 'Non renseignée';
  const educations = userData.educations || [];
  const experiences = userData.experiences || [];
  const competences = userData.competences || [];
  return (
    <aside className="profile-sidebar">
      <section className="info-card contact-card">
        <div className="card-label">Vos informations</div>
        <InfoItem label="Adresse" value={userData.adresse} />
        <InfoItem label="Téléphone" value={userData.telephone} />
        <InfoItem label="Date de naissance" value={formatDate(userData.date_naissance)} />
      </section>
      {!isRecruiter && <>
        <section className="info-card"><SectionTitle>Formation</SectionTitle>{educations.length ? educations.map((item, index) => <TimelineItem key={index} title={item.diplome} subtitle={item.institut} date={`${formatDate(item.date_debut)} — ${formatDate(item.date_fin)}`} />) : <Muted>Ajoutez votre parcours de formation.</Muted>}</section>
        <section className="info-card"><SectionTitle>Expérience</SectionTitle>{experiences.length ? experiences.map((item, index) => <TimelineItem key={index} title={item.poste} subtitle={item.entreprise} date={`${formatDate(item.date_debut)} — ${formatDate(item.date_fin)}`} />) : <Muted>Ajoutez vos expériences professionnelles.</Muted>}</section>
        <section className="info-card"><SectionTitle>Compétences</SectionTitle><div className="skill-list">{competences.length ? competences.map((item, index) => <span key={index}>{item.competence}</span>) : <Muted>Ajoutez vos compétences.</Muted>}</div></section>
      </>}
    </aside>
  );
}

function InfoItem({ label, value }) { return <div className="info-item"><span>{label}</span><strong>{value || 'Non renseigné'}</strong></div>; }
function SectionTitle({ children }) { return <h2 className="profile-section-title">{children}</h2>; }
function TimelineItem({ title, subtitle, date }) { return <div className="timeline-item"><strong>{title || 'Sans titre'}</strong><span>{subtitle || '—'}</span><small>{date}</small></div>; }
function Muted({ children }) { return <p className="muted">{children}</p>; }
