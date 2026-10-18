import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function LeftSide({ userData = {}, isRecruiter = false }) {
  const fullName = [userData.nom, userData.prenom].filter(Boolean).join(' ') || 'Votre profil';
  const roleLabel = isRecruiter ? 'Espace recruteur' : 'Espace candidat';
  return (
    <Container>
      <Card>
        <UserInfo>
          <CardBackground />
          <Link to="/profile-utilisateur">
            <Photo />
            <span>{fullName}</span>
            <Role>{roleLabel}</Role>
          </Link>
        </UserInfo>
        <Widget>
          <Link to="/profile-utilisateur">
            <div><span>{isRecruiter ? 'Mon entreprise' : 'Mon profil'}</span><span>{isRecruiter ? 'Présentez votre activité' : 'Valorisez votre parcours'}</span></div>
            <i className="fas fa-arrow-right" />
          </Link>
        </Widget>
        <Item><span>{isRecruiter ? 'Mes offres' : 'Mes candidatures'}</span><i className="fas fa-bookmark" /></Item>
      </Card>
      <CommunityCard>
        <a href="/comment-ca-marche"><span>Comment ça marche</span></a>
        <a href="/entreprises"><span>Entreprises</span><i className="fas fa-building" /></a>
        <a href="/emploi"><span>Découvrir les opportunités</span></a>
      </CommunityCard>
    </Container>
  );
}

const Container = styled.div`grid-area: leftSide; padding-left: 12px;`;
const Card = styled.aside`
  background: #fff; text-align: center; overflow: hidden; margin-bottom: 12px; border-radius: 16px; position: relative; border: 1px solid var(--jobs-border); box-shadow: 0 12px 28px rgba(36, 51, 43, .06);
`;
const UserInfo = styled.div`padding: 12px 12px 16px; border-bottom: 1px solid var(--jobs-border); a { color: var(--jobs-ink); font-weight: 700; }`;
const CardBackground = styled.div`background: url('/imgs/card-bg.svg') center / cover; height: 54px; margin: -12px -12px;`;
const Photo = styled.div`background: url('/imgs/download.jpeg') center / cover; width: 72px; height: 72px; margin: -40px auto 12px; border: 3px solid #fff; border-radius: 50%;`;
const Role = styled.small`display: block; margin-top: 5px; color: var(--jobs-muted); font-weight: 500;`;
const Widget = styled.div`
  border-bottom: 1px solid var(--jobs-border); padding: 12px 0;
  a { display: flex; justify-content: space-between; align-items: center; padding: 4px 16px; }
  &:hover { background: var(--jobs-green-soft); }
  div { display: flex; flex-direction: column; align-items: flex-start; gap: 3px; span { font-size: 12px; line-height: 1.3; &:first-child { color: var(--jobs-ink); font-weight: 700; } &:last-child { color: var(--jobs-muted); } } }
  i { color: var(--jobs-green); }
`;
const Item = styled.div`display: flex; align-items: center; justify-content: space-between; padding: 18px 16px; color: var(--jobs-text); font-size: .9rem; &:hover { background: var(--jobs-green-soft); } i { color: var(--jobs-green); }`;
const CommunityCard = styled(Card)`
  a { padding: 11px 16px; text-align: left; display: flex; justify-content: space-between; color: var(--jobs-text); font-size: .85rem; }
  a:hover { color: var(--jobs-green-dark); background: var(--jobs-green-soft); }
  a + a { border-top: 1px solid var(--jobs-border); }
`;
