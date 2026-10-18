import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function RightSide({ isRecruiter = false }) {
  return (
    <Container>
      <AdsCard>
        <AdMark>{isRecruiter ? '↗' : '✦'}</AdMark>
        <AdHeader>{isRecruiter ? 'Trouvez votre prochain talent' : 'Donnez plus de force à votre profil'}</AdHeader>
        <AdDescription>{isRecruiter ? 'Publiez une offre claire et recevez des candidatures pertinentes.' : 'Un profil complet vous aide à mieux apparaître auprès des entreprises.'}</AdDescription>
        <ActionLink to={isRecruiter ? '/offreform' : '/profile-utilisateur'}>{isRecruiter ? 'Publier une offre' : 'Compléter mon profil'}</ActionLink>
      </AdsCard>
      <Footer>
        <FooterLinks>
          <FooterLink href="/comment-ca-marche">Comment ça marche</FooterLink>
          <FooterLink href="/entreprises">Entreprises</FooterLink>
          <FooterLink href="/emploi">Opportunités</FooterLink>
        </FooterLinks>
        <FooterBranding><JobsLogo src="/logo-color-white-bg-green.png" alt="Jobs" /><span>JOBs · 2026</span></FooterBranding>
      </Footer>
    </Container>
  );
}

const Container = styled.div`grid-area: rightSide; padding-left: 10px; display: flex; flex-direction: column; gap: 16px;`;
const AdsCard = styled.div`background: #fff; padding: 20px; border: 1px solid var(--jobs-border); border-radius: 16px; display: flex; flex-direction: column; align-items: flex-start; gap: 10px; box-shadow: 0 12px 28px rgba(36, 51, 43, .06);`;
const AdMark = styled.div`width: 42px; height: 42px; display: grid; place-items: center; border-radius: 12px; background: var(--jobs-green-soft); color: var(--jobs-green-dark); font-size: 1.3rem; font-weight: 800;`;
const AdHeader = styled.div`font-size: 1rem; font-weight: 800; color: var(--jobs-ink);`;
const AdDescription = styled.div`font-size: .86rem; color: var(--jobs-muted); line-height: 1.5;`;
const ActionLink = styled(Link)`display: inline-flex; padding: 10px 14px; border-radius: 10px; background: var(--jobs-green); color: #fff; font-size: .85rem; font-weight: 700; &:hover { background: var(--jobs-green-dark); }`;
const Footer = styled.footer`padding: 14px 4px; border-top: 1px solid var(--jobs-border); display: flex; flex-direction: column; gap: 10px;`;
const FooterLinks = styled.div`display: flex; flex-wrap: wrap; gap: 10px 14px;`;
const FooterLink = styled.a`color: var(--jobs-muted); text-decoration: none; font-size: .75rem; &:hover { color: var(--jobs-green-dark); }`;
const FooterBranding = styled.div`display: flex; align-items: center; gap: 8px; font-size: .72rem; color: var(--jobs-muted);`;
const JobsLogo = styled.img`height: 16px; width: auto;`;
