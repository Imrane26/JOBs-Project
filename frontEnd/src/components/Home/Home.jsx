import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Posts from './Layouts/Posts';

export default function Home() {
  let userData = {};
  try { userData = JSON.parse(sessionStorage.getItem('userData') || '{}') || {}; } catch { userData = {}; }
  const isRecruiter = Boolean(userData.idEntreprise || userData.type_user === 'recruteur');
  const firstName = userData.prenom || userData.nom || '';

  return isRecruiter ? (
    <Container>
      <Welcome>
        <WelcomeCopy>
          <Eyebrow>{isRecruiter ? 'Espace recruteur' : 'Espace candidat'}</Eyebrow>
          <h1>Bonjour{firstName ? ` ${firstName}` : ''}.</h1>
          <p>{isRecruiter ? 'Gérez vos recrutements et trouvez les profils qui feront grandir votre équipe.' : 'Retrouvez ici les opportunités et les actions importantes pour votre parcours.'}</p>
        </WelcomeCopy>
        <WelcomeAction to={isRecruiter ? '/offreform' : '/emploi'}>{isRecruiter ? 'Publier une offre' : 'Rechercher un emploi'} <span>→</span></WelcomeAction>
      </Welcome>

      <Stats>
        {(isRecruiter ? [
          ['Offres publiées', '—', 'Suivez vos annonces'],
          ['Candidatures reçues', '—', 'Centralisez les profils'],
          ['Profils consultés', '—', 'Découvrez de nouveaux talents'],
        ] : [
          ['Candidatures envoyées', '—', 'Suivez vos démarches'],
          ['Offres sauvegardées', '—', 'Retrouvez vos favoris'],
          ['Profil complété', 'À faire', 'Améliorez votre visibilité'],
        ]).map(([label, value, hint]) => (
          <StatCard key={label}><StatValue>{value}</StatValue><StatLabel>{label}</StatLabel><StatHint>{hint}</StatHint></StatCard>
        ))}
      </Stats>

      <ContentGrid>
        <PrimarySection>
          <SectionHeader><div><Eyebrow>{isRecruiter ? 'Recrutement' : 'Opportunités'}</Eyebrow><h2>{isRecruiter ? 'Vos recrutements en un coup d’œil' : 'Votre prochaine opportunité'}</h2></div><SectionLink to={isRecruiter ? '/offreform' : '/emploi'}>{isRecruiter ? 'Créer une offre' : 'Voir toutes les offres'} <span>→</span></SectionLink></SectionHeader>
          <EmptyCard>
            <EmptyIcon>{isRecruiter ? '↗' : '⌕'}</EmptyIcon>
            <div><strong>{isRecruiter ? 'Commencez par publier votre première offre.' : 'Commencez votre recherche.'}</strong><p>{isRecruiter ? 'Une annonce claire vous aide à recevoir des candidatures plus pertinentes.' : 'Explorez les offres selon votre métier, vos compétences ou votre ville.'}</p></div>
            <ActionLink to={isRecruiter ? '/offreform' : '/emploi'}>{isRecruiter ? 'Publier une offre' : 'Explorer les offres'}</ActionLink>
          </EmptyCard>
        </PrimarySection>

        <SideSection>
          <Eyebrow>À ne pas oublier</Eyebrow>
          <h2>{isRecruiter ? 'Présentez votre entreprise' : 'Complétez votre profil'}</h2>
          <p>{isRecruiter ? 'Une présentation complète rassure les candidats et rend vos offres plus attractives.' : 'Les recruteurs comprennent mieux votre parcours quand votre profil est complet.'}</p>
          <ActionLink to="/profile-utilisateur">{isRecruiter ? 'Voir mon espace' : 'Voir mon profil'} <span>→</span></ActionLink>
        </SideSection>
      </ContentGrid>
      <FeedSection>
        <FeedHeader><div><Eyebrow>La communauté JOB’S</Eyebrow><h2>Les dernières publications</h2><p>Découvrez les idées, parcours et opportunités partagés par les candidats, recruteurs et entreprises.</p></div><FeedLink to="/emploi">Découvrir les opportunités <span>→</span></FeedLink></FeedHeader>
        <Posts />
      </FeedSection>
    </Container>
  ) : <CandidateHome firstName={firstName} />;
}

function CandidateHome({ firstName }) {
  return (
    <CandidateContainer>
      <CandidateHero>
        <div><CandidateEyebrow>Votre recherche commence ici</CandidateEyebrow><h1>Le prochain chapitre de votre parcours.</h1><p>Trouvez une opportunité qui correspond à vos compétences, votre rythme et vos envies.</p><CandidateActions><CandidatePrimary to="/emploi">Explorer les offres <span>→</span></CandidatePrimary><CandidateSecondary to="/profile-utilisateur">Mettre mon profil à jour</CandidateSecondary></CandidateActions></div>
        <CandidateSignal><span>{firstName ? `Pour ${firstName}` : 'Pour votre parcours'}</span><strong>Une recherche plus simple, des choix plus clairs.</strong><small>Vos offres, votre profil et vos candidatures au même endroit.</small></CandidateSignal>
      </CandidateHero>
      <CandidateShortcuts>
        <Shortcut to="/emploi"><strong>01</strong><div><b>Trouver une offre</b><span>Par métier, ville ou compétence</span></div><em>→</em></Shortcut>
        <Shortcut to="/profile-utilisateur"><strong>02</strong><div><b>Présenter mon parcours</b><span>Un profil qui vous ressemble</span></div><em>→</em></Shortcut>
        <Shortcut to="/comment-ca-marche"><strong>03</strong><div><b>Comprendre JOB’S</b><span>Quelques étapes, sans détour</span></div><em>→</em></Shortcut>
      </CandidateShortcuts>
      <CandidateFocus><div><CandidateEyebrow>À votre rythme</CandidateEyebrow><h2>Ne ratez pas les opportunités qui vous correspondent.</h2><p>Commencez par une recherche, puis revenez ici pour suivre vos prochaines étapes.</p></div><CandidatePrimary to="/emploi">Commencer ma recherche <span>→</span></CandidatePrimary></CandidateFocus>
      <FeedSection><FeedHeader><div><Eyebrow>La communauté JOB’S</Eyebrow><h2>Ce qui se partage autour de vous</h2><p>Parcours, conseils et opportunités partagés par les candidats, recruteurs et entreprises.</p></div><FeedLink to="/emploi">Voir les opportunités <span>→</span></FeedLink></FeedHeader><Posts /></FeedSection>
    </CandidateContainer>
  );
}

const Container = styled.main`padding: 92px 28px 48px; max-width: 1180px; margin: 0 auto; @media (max-width: 768px) { padding: 84px 16px 36px; }`;
const Welcome = styled.section`display: flex; justify-content: space-between; align-items: center; gap: 24px; padding: 34px 38px; border: 1px solid var(--jobs-accent-gray); border-radius: 22px; background: var(--jobs-green-soft); @media (max-width: 680px) { flex-direction: column; align-items: flex-start; padding: 28px; }`;
const WelcomeCopy = styled.div`h1 { margin: 8px 0 6px; color: var(--jobs-ink); font-size: clamp(2rem, 4vw, 3.2rem); letter-spacing: -.05em; } p { max-width: 620px; margin: 0; color: var(--jobs-muted); line-height: 1.55; }`;
const Eyebrow = styled.span`color: var(--jobs-green-dark); font-size: .76rem; font-weight: 800; letter-spacing: .11em; text-transform: uppercase;`;
const WelcomeAction = styled(Link)`display: inline-flex; gap: 14px; align-items: center; padding: 13px 17px; border-radius: 11px; background: var(--jobs-green); color: #fff; font-weight: 800; white-space: nowrap; &:hover { background: var(--jobs-green-dark); }`;
const Stats = styled.section`display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 20px 0; @media (max-width: 680px) { grid-template-columns: 1fr; }`;
const StatCard = styled.div`padding: 20px; background: #fff; border: 1px solid var(--jobs-border); border-radius: 15px; box-shadow: 0 8px 22px rgba(36, 51, 43, .04);`;
const StatValue = styled.strong`display: block; color: var(--jobs-green-dark); font-size: 1.55rem; margin-bottom: 7px;`;
const StatLabel = styled.div`color: var(--jobs-ink); font-weight: 800; font-size: .9rem;`;
const StatHint = styled.small`display: block; margin-top: 5px; color: var(--jobs-muted);`;
const ContentGrid = styled.div`display: grid; grid-template-columns: minmax(0, 1.65fr) minmax(280px, .8fr); gap: 20px; @media (max-width: 800px) { grid-template-columns: 1fr; }`;
const PrimarySection = styled.section`padding: 26px; background: #fff; border: 1px solid var(--jobs-border); border-radius: 18px; box-shadow: 0 8px 22px rgba(36, 51, 43, .04);`;
const SectionHeader = styled.div`display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 24px; h2 { margin: 7px 0 0; color: var(--jobs-ink); font-size: 1.35rem; } @media (max-width: 560px) { flex-direction: column; }`;
const SectionLink = styled(Link)`color: var(--jobs-green-dark); font-size: .84rem; font-weight: 800; white-space: nowrap;`;
const EmptyCard = styled.div`display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 16px; padding: 22px; border: 1px dashed var(--jobs-accent-gray); border-radius: 14px; background: #fbfefc; @media (max-width: 560px) { grid-template-columns: auto 1fr; }`;
const EmptyIcon = styled.div`width: 42px; height: 42px; display: grid; place-items: center; border-radius: 12px; background: var(--jobs-green-soft); color: var(--jobs-green-dark); font-size: 1.25rem; font-weight: 800;`;
const ActionLink = styled(Link)`display: inline-flex; align-items: center; gap: 8px; padding: 10px 13px; border-radius: 9px; background: var(--jobs-green); color: #fff; font-size: .82rem; font-weight: 800; white-space: nowrap; &:hover { background: var(--jobs-green-dark); } @media (max-width: 560px) { grid-column: 2; justify-self: start; }`;
const SideSection = styled.aside`padding: 26px; border-left: 5px solid var(--jobs-accent-gray); border-radius: 0 18px 18px 0; background: #24332b; color: #fff; min-height: 190px; h2 { margin: 10px 0; font-size: 1.35rem; line-height: 1.15; } p { color: #d8e3dc; line-height: 1.55; margin-bottom: 22px; } ${Eyebrow} { color: var(--jobs-accent-gray); } ${ActionLink} { background: #fff; color: var(--jobs-muted); border: 1px solid var(--jobs-accent-gray); &:hover { background: var(--jobs-green-soft); } }`;
const FeedSection = styled.section`margin-top: 22px; padding: 26px; background: #fff; border: 1px solid var(--jobs-border); border-radius: 18px; box-shadow: 0 8px 22px rgba(36, 51, 43, .04);`;
const FeedHeader = styled.div`display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; margin-bottom: 22px; h2 { margin: 7px 0 5px; color: var(--jobs-ink); font-size: 1.35rem; } p { margin: 0; color: var(--jobs-muted); line-height: 1.5; } @media (max-width: 680px) { flex-direction: column; }`;
const FeedLink = styled(Link)`color: var(--jobs-green-dark); font-size: .84rem; font-weight: 800; white-space: nowrap;`;
const CandidateContainer = styled.main`padding: 92px 28px 48px; max-width: 1180px; margin: 0 auto; @media (max-width: 768px) { padding: 84px 16px 36px; }`;
const CandidateHero = styled.section`display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(260px, .7fr); gap: 24px; padding: 38px; border: 1px solid var(--jobs-accent-gray); border-radius: 0 24px 24px 24px; background: var(--jobs-surface); @media (max-width: 760px) { grid-template-columns: 1fr; padding: 26px; } h1 { max-width: 680px; margin: 10px 0 8px; color: var(--jobs-ink); font-size: clamp(2.2rem, 5vw, 4rem); line-height: .98; letter-spacing: -.055em; } p { max-width: 590px; margin: 0; color: var(--jobs-muted); line-height: 1.6; }`;
const CandidateEyebrow = styled.span`color: var(--jobs-green-dark); font-size: .75rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase;`;
const CandidateActions = styled.div`display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px;`;
const CandidatePrimary = styled(Link)`display: inline-flex; align-items: center; gap: 12px; padding: 12px 15px; border-radius: 9px; background: var(--jobs-green); color: #fff; font-size: .84rem; font-weight: 800; &:hover { background: var(--jobs-green-dark); }`;
const CandidateSecondary = styled(Link)`display: inline-flex; align-items: center; padding: 12px 15px; border: 1px solid var(--jobs-accent-gray); border-radius: 9px; color: var(--jobs-ink); font-size: .84rem; font-weight: 800; &:hover { background: var(--jobs-green-soft); }`;
const CandidateSignal = styled.div`display: flex; flex-direction: column; justify-content: flex-end; padding: 23px; border-radius: 14px; background: #24332b; color: #fff; span { color: var(--jobs-accent-gray); font-size: .74rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; } strong { margin: 11px 0 8px; font-size: 1.25rem; line-height: 1.16; } small { color: #d8e3dc; line-height: 1.5; }`;
const CandidateShortcuts = styled.section`display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 18px 0; @media (max-width: 760px) { grid-template-columns: 1fr; }`;
const Shortcut = styled(Link)`display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 12px; padding: 17px; border: 1px solid var(--jobs-border); border-radius: 13px; background: #fff; color: var(--jobs-ink); &:hover { border-color: var(--jobs-accent-gray); background: var(--jobs-green-soft); } strong { color: var(--jobs-green-dark); font-size: .78rem; } b, span { display: block; } b { font-size: .86rem; } span { margin-top: 4px; color: var(--jobs-muted); font-size: .74rem; } em { color: var(--jobs-green-dark); font-style: normal; font-weight: 800; }`;
const CandidateFocus = styled.section`display: flex; align-items: center; justify-content: space-between; gap: 24px; margin-bottom: 22px; padding: 25px 28px; border-left: 5px solid var(--jobs-accent-gray); border-radius: 0 16px 16px 0; background: var(--jobs-green-soft); h2 { margin: 8px 0 5px; color: var(--jobs-ink); font-size: 1.35rem; } p { margin: 0; color: var(--jobs-muted); } @media (max-width: 650px) { display: block; ${CandidatePrimary} { margin-top: 18px; } }`;
