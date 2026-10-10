import React from 'react';
import styled from 'styled-components';

export default function OfferDetails({ offer, onClose }) {
  return (
    <DetailsContainer>
      <CloseButton onClick={onClose}>X</CloseButton>
      <CompanyImage src={offer.idEntreprises.logo} alt={offer.idEntreprises.nom} />
      <CompanyName>{offer.idEntreprises.nom}</CompanyName>
      <CompanySpecialty>{offer.idEntreprises.activite}</CompanySpecialty>
      <CompanyLocation>{offer.idEntreprises.adresse}</CompanyLocation>
      <CompanyLocation>{offer.idEntreprises.email}</CompanyLocation>
      <br />
      <CardDescription>{`${offer.description} ${offer.autres_informations}`}</CardDescription>
      <CardDescription>{`salaire :  ${offer.salaire}`}</CardDescription>
      <CardDescription>{`experiences :  ${offer.experiences}`}</CardDescription>
      <CardDescription>{`competences :  ${offer.competences}`}</CardDescription>
      <CardDescription>{`date début de postulation :  ${new Date(offer.date_debut).toLocaleDateString("en-CA")}`}</CardDescription>
      <CardDescription>{`date fin de postulation:  ${new Date(offer.date_fin).toLocaleDateString("en-CA")}`}</CardDescription>

    </DetailsContainer>
  );
}

const DetailsContainer = styled.div`
  position: relative; /* Ensure the container is relative for absolute positioning of the button */
  flex: 1;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  background-color: grey;
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 8px 12px;
  border-radius: 4px;
`;

const CompanyImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 16px;
`;

const CompanyName = styled.h2`
  margin: 0;
  font-size: 24px;
`;

const CompanySpecialty = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #666;
`;

const CompanyLocation = styled.p`
  font-size: 16px;
  color: #333;
`;
const CardDescription = styled.div`
  margin: 8px 0;
`;
