import React, { useState } from "react";
import "../../../style/steps/infos_prsnl_candidat.css";
import InfosProsCandidat from "./InfosProsCandidat";
import StatutOptions from "./StatutOptions";

const InfosPrsnlCandidat = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [retour, setRetour] = useState(false);
  const [formPers, setFormPers] = useState({
    type_user: "candidat",
    email: "",
    password: "",
    prenom: "",
    nom: "",
    adresse: "",
    telephone: "",
    date_naissance: "",
    profilepath:""
  });

  const handleChnangeFormPer = (e)=>{
    const {name,value} = e.target
    setFormPers({...formPers,[name]:value})
  }
  const handleSuivant = (event) => {
    event.preventDefault();
    setButtonClicked(true);
  };
  if (buttonClicked) {
    return <InfosProsCandidat infos_prsnl_candidat={formPers}/>;
  }

  const handleRetour = () => {
    setRetour(true);
  };
  if (retour) {
    return <StatutOptions />;
  }

  return (
    <div className="infos_prsnl_candidat_container">
      <form>
        <div className="without_btn">
        <div className="candidat_profil">
          <input
            type="file"
            className="profile-input"
            
            name="profilepath"
            onChange={handleChnangeFormPer}
          />
          <label htmlFor="profile-input-candidat">
            Télécharger la photo de profil <i className="fas fa-download"></i>
          </label>
        </div>
        <input type="text" name="nom" placeholder="Nom" required onChange={handleChnangeFormPer} />
        <input type="text" name="prenom" placeholder="Prénom" required onChange={handleChnangeFormPer} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChnangeFormPer} />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          required
          onChange={handleChnangeFormPer}
        />
        <input type="text" name="adresse" placeholder="Adresse" required onChange={handleChnangeFormPer} />
        <input
          type="text"
          name="telephone"
          placeholder="Téléphone"
          onChange={handleChnangeFormPer}
          required
        />
        <div className="input_date">
          <label>Date de naissance</label>
          <input type="date" name="date_naissance" required onChange={handleChnangeFormPer}/>
        </div>
        </div>
        <div className="btn">
          <button type="button" id="retour" onClick={handleRetour}>
            Retour
          </button>
          <button type="button" id="suivant" onClick={handleSuivant}>
            Suivant
          </button>
        </div>
      </form>
    </div>
  );
};

export default InfosPrsnlCandidat;
