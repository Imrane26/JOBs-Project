import React from "react";
import styled from "styled-components";
import OffreCard from "./Layouts/OffreCard";

export default function Emplois() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  return (
    <Container>
      <Section>
        <h5>
          <a href="">Besoin d'embaucher rapidement ?</a>
        </h5>
        <p>
          Trouvez des professionnels talentueux en un temps record et maintenez
          l'activité de votre entreprise.{" "}
        </p>
      </Section>
      <Layout>
        <Sidebar>
          <CommunityCard>
            <a>
              <span>Groupes</span>
            </a>
            <a>
              <span>Événements</span>
              <i className="fas fa-calendar-plus"></i>
            </a>
            <a>
              <span>Suivre les hashtags</span>
            </a>
            <a>
              <span>Découvrir plus</span>
            </a>
          </CommunityCard>
          {userData.idEntreprise && (
            <Button>
              <button className="offre">
                <a href="/offreform" className="publiez">
                  Publiez Une Offre
                </a>
              </button>
            </Button>
          )}
        </Sidebar>
        <OffreCard />
      </Layout>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 52px;
  top: 0;

  @media (max-width: 768px) {
    margin-top: 12px;
  }
`;

const Section = styled.section`
  min-height: 52px;
  padding-top: 10px;
  margin-top: 10px;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;

  h5 {
    font-size: 14px;
  }

  a {
    font-weight: 700;
    color: #058c42;
  }

  p {
    font-weight: 600;
    color: #434649;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
  }
`;

const Layout = styled.div`
  margin-left: 150px;
  display: grid;
  grid-template-areas: " Sidebar OffreCard ";
  grid-template-columns: minmax(0, 5fr) minmax(0, 17fr) minmax(200px, 2fr);
  column-gap: 15px;
  grid-template-rows: auto;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
    row-gap: 25px;
    margin-top: 15px;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CommunityCard = styled.div`
  margin-left: 30px;

  a {
    background-color: #fff;
    padding: 10px 18px;
    text-align: left;
    display: flex;
    justify-content: space-between;
  }

  a:hover {
    color: #058c42;
    cursor: pointer;
  }

  a:last-child {
    color: rgba(0, 0, 0, 0.6);
    border-top: 1px solid #d6ced6;
  }

  a:last-child:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: #058c42;
  }
`;

const Button = styled.div`
  .offre {
    border: none;
    padding: 10px;
    margin-left: 40px;
    font-size: medium;
    border-radius: 8px;
    background-color: #058c42;
    color: white;
    margin-top: 20px; // Adjust this value to add space between the CommunityCard and the button
  }

  .publiez {
    color: white;
    text-decoration: none; // Ensure the link text has no underline
  }
`;
