import React from "react";
import "../../../style/UserProfile/UserRightSide.css";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const UserRightSide = ({ offres, publications }) => {
  const [toggleState, setToggleState] = useState(1);
  const token = sessionStorage.getItem("loginData");
  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div className="right_side">
      <div className="cards_infos">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Publications
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Offres d'emplois
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content active-content" : "content"}
        >
          <h2>Publications</h2>
          <hr />

          {publications.map((pub) => (
            <div className="card">
              <div className="cardContent" key={pub._id}>
                <h4>{pub.titre}</h4>
                <h5>
                  {new Date(pub.date_publication).toLocaleDateString("en-CA")}
                </h5>
                <p>{pub.contenu}</p>
                <Button>
                  <button onClick={async() => {
                    try{
                      axios.delete(`http://localhost:3000/api/publication/${pub._id}`,{
                        headers:{
                          Authorization: `Bearer ${token}`
                        }
                      })
                      window.location.reload();
                    }catch(e){
                      console.error('erreur hors de supression',e)
                    }
                  }} className="supprimer">supprimer</button>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div
          className={toggleState === 2 ? "content active-content" : "content"}
        >
          <h2>Offres d'emplois</h2>
          <hr />

          {
            offres.map((offre)=>(
              <div className="card" key={offre._id}>
              <div className="cardContent">
                <h4>{offre.titre}</h4>
                <h4>Entreprise : {offre.idEntreprises.nom}</h4>
                <h5>date:{new Date(offre.date_publication).toLocaleDateString("en-CA")} lieu : {offre.lieu}</h5>
                <h5>type de contrat : {offre.typeContrat}</h5>
                <h5>salaire : {offre.salaire}</h5>
                <p>{offre.autres_informations} {offre.description}</p>
                <h4>competences :</h4>
                {offre.competences.map((comp)=>(<><span className="skill" key={comp.index}>{comp}</span></>))}
                <br />
                <Button>
                  <button onClick={async() => {
                    try{
                      axios.delete(`http://localhost:3000/api/offres/${offre._id}`,{
                        headers:{
                          Authorization: `Bearer ${token}`
                        }
                      })
                      window.location.reload();
                    }catch(e){
                      console.error('erreur hors de supression',e)
                    }
                  }} className="supprimer">supprimer</button>
                </Button>
              </div>
            </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

const Button =styled.div`
.supprimer {
    border: none;
    padding: 10px;
    cursor:pointer;
    margin:10px 0;
    font-size: medium;
    border-radius: 8px;
    background-color: #058c42;
    color: white;
}
`

export default UserRightSide;
