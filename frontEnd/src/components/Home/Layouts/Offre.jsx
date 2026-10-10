import axios from "axios";
import React from "react";
import styled from "styled-components";

export default function CompanyCard({ offer, onMoreInfoClick }) {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  console.log(userData._id)
  return (
    <CardContainer>
      <CardImage src={offer.idEntreprises.logo} alt={offer.idEntreprises.nom} />
      <CardContent>
        <CardHeader>{offer.idEntreprises.nom}</CardHeader>
        <CardSpecialty>{offer.idEntreprises.activite}</CardSpecialty>
        <CardLocation>{offer.idEntreprises.adresse}</CardLocation>
        <CardDescription>{`${offer.description} ${offer.autres_informations}`}</CardDescription>
        <CardActions>
          {!userData.idEntreprise && (
            <ActionButton
              onClick={async () => {
                try {
                  
                  const response=await axios.post(
                    `http://127.0.0.1:3000/api/offres/${offer._id}/candidatures`,{candidatId:`${userData._id}`}
                  );
                  console.log("postulation", response.data);
                  alert("vous avez postulez à cette offre!");
                } catch (e) {
                  console.error("erreur", e);

                }
              }}
            >
              Postuler
            </ActionButton>
          )}

          <ActionButton onClick={() => onMoreInfoClick(offer)}>
            Plus d'information
          </ActionButton>
        </CardActions>
      </CardContent>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  padding: 16px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), rgb(0 0 0 / 20%);
  margin-bottom: 10px;
`;

const CardImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  margin-right: 16px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

const CardSpecialty = styled.div`
  color: gray;
  margin: 4px 0;
`;

const CardLocation = styled.div`
  color: gray;
  margin: 4px 0;
`;

const CardDescription = styled.div`
  margin: 8px 0;
`;

const CardActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background-color: #0073b1;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: #005582;
  }
`;
