import React from 'react';
import styled from 'styled-components';
import LeftSide from './Layouts/leftSide';
import RightSide from './Layouts/rightSide';
import Main from './Layouts/Main';

export default function Home() {
  return (
    <Container> 
       <Section>
        <h5><a href="">Besoin d'embaucher rapidement ?</a></h5>
        <p>Trouvez des professionnels talentueux en un temps record et maintenez l'activité de votre entreprise. </p>
       </Section>
       <Layout>
            <LeftSide/>
            <Main/>
            <RightSide/>
       </Layout>
    </Container>
  )
}

const Container = styled.div`
padding-top: 52px; 
max-width: 100%;

@media (max-width: 768px) {
    margin-top: 12px ;
  }

`;

const Section = styled.section`
  box-sizing: content-box; 
  min-height: 52px; 
  padding-top: 10px; 
  margin-top: 10px; 
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center; 
  h5{
    font-size: 14px;
  }
  a{
    font-weight: 700;
    color: #058c42;
  }
  p{
    font-weight: 600; 
    color: #434649;
    font-size: 14px;
  }

  @media(max-width:768px){
    flex-direction: column; 
    padding: 0 5px;
  }
`;

const Layout = styled.div`
display: grid; 
grid-template-areas: "leftSide main rightSide";
grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr) ; 
column-gap :25px;
grid-template-rows: auto;


@media (max-width: 768px){
  display: flex; 
  flex-direction: column;
  padding: 0 5px;
  row-gap : 25px; 
  margin-top: 15px ;
}
`;