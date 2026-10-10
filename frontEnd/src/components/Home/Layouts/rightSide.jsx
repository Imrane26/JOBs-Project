import React from 'react';
import styled from 'styled-components';

export default function RightSide() {
  return (
    <Container>
      <AdsCard>
        <AdImage src="https://picsum.photos/200/300" alt="Ad Image 2" />
        <AdHeader><button className='ad'><a href="#" className='visibilité'>Boostez votre visibilité</a></button></AdHeader>
        <AdDescription>
          Utilisez nos outils marketing pour atteindre un plus large public et augmenter vos ventes.
        </AdDescription>
      </AdsCard>
      <Footer>
          <FooterLinks>
            <FooterLink href="#">Infos</FooterLink>
            <FooterLink href="#">Accessibilité</FooterLink>
            <FooterLink href="#">Assistance clientèle</FooterLink>
            <FooterLink href="#">Conditions générales et confidentialité <DropdownIcon className="fas fa-angle-down"></DropdownIcon></FooterLink>
            <FooterLink href="#">Préférences Pubs</FooterLink>
            <FooterLink href="#">Publicité</FooterLink>
            <FooterLink href="#">Solutions professionnelles</FooterLink>
          </FooterLinks>
          <FooterBranding>
            <JobsLogo src="logo-color-white-bg-green.png" alt="Jobs" />
            <span>Jobs Corporation © 2024</span>
          </FooterBranding>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  grid-area: rightSide;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AdsCard = styled.div`
  background-color: #fff;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content including image */
  gap: 8px;
`;

const AdImage = styled.img`
  width: 300px;
  height: 100px;
  max-width: 150px;
  border-radius: 8px;
`;

const AdHeader = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  text-align: center; /* Center text */

  .ad{
    border:none;
    padding:10px;
    font-size:medium;
    border-radius: 8px;
    background-color:#16db65;
    color:white;
  }
  .visibilité{
    color:white
  }
`;

const AdDescription = styled.div`
  font-size: 14px;
  color: #666;
  text-align: center; /* Center text */
`;

const Footer = styled.footer`
  padding: 16px;
  background-color: #f5f5f5;
  border-top: 1px solid #cbcbca;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
`;

const FooterLink = styled.a`
  color: #666666;
  text-decoration: none;
  font-size: 12px;

  &:hover {
    text-decoration: underline;
  }
`;

const DropdownIcon = styled.i`
  margin-left: 4px;
`;

const FooterBranding = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #666;
`;

const JobsLogo = styled.img`
  height: 16px;
  width: auto;
`;