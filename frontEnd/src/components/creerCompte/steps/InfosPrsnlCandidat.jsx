import React, { useEffect, useState } from "react";
import "../../../style/steps/infos_prsnl_candidat.css";
import InfosProsCandidat from "./InfosProsCandidat";
import StatutOptions from "./StatutOptions";

const InfosPrsnlCandidat = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [retour, setRetour] = useState(false);
  const [error, setError] = useState("");
  const [profileFileName, setProfileFileName] = useState("");
  const [profilePreviewUrl, setProfilePreviewUrl] = useState("");
  const [formPers, setFormPers] = useState({
    type_user: "candidat",
    email: "",
    password: "",
    prenom: "",
    nom: "",
    adresse: "",
    telephone: "",
    date_naissance: "",
    profilePath: null
  });

  const handleChnangeFormPer = (e) => {
    const { name, value } = e.target;
    setFormPers((current) => ({ ...current, [name]: value }));
    setError("");
  };

  const handleProfileChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      setFormPers((current) => ({ ...current, profilePath: null }));
      setProfileFileName("");
      return;
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      e.target.value = "";
      setFormPers((current) => ({ ...current, profilePath: null }));
      setProfileFileName("");
      setError("La photo doit être au format PNG ou JPG.");
      return;
    }

    setFormPers((current) => ({ ...current, profilePath: file }));
    setProfileFileName(file.name);
    setError("");
  };

  useEffect(() => {
    if (!formPers.profilePath) {
      setProfilePreviewUrl("");
      return undefined;
    }

    const previewUrl = URL.createObjectURL(formPers.profilePath);
    setProfilePreviewUrl(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [formPers.profilePath]);

  const handleSuivant = (event) => {
    event.preventDefault();
    const requiredFields = [
      ["nom", "le nom"],
      ["prenom", "le prénom"],
      ["email", "l’email"],
      ["password", "le mot de passe"],
      ["adresse", "l’adresse"],
      ["telephone", "le téléphone"],
      ["date_naissance", "la date de naissance"],
    ];
    const missingField = requiredFields.find(([key]) => !String(formPers[key] || "").trim());

    if (missingField) {
      setError(`Information manquante : ${missingField[1]}.`);
      return;
    }

    setError("");
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
            id="profile-input-candidat"
            name="profilePath"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleProfileChange}
          />
          <label htmlFor="profile-input-candidat">
            {profilePreviewUrl && (
              <img className="profile-preview" src={profilePreviewUrl} alt="Aperçu du profil" />
            )}
            <span className="profile-upload-copy">
              <strong>{profileFileName ? "Photo de profil sélectionnée" : "Ajouter une photo de profil"}</strong>
              <small>{profileFileName || "PNG ou JPG · cliquez pour choisir une image"}</small>
            </span>
            <span className="profile-upload-action">
              {profileFileName ? "Modifier" : "Choisir"} <i className="fas fa-arrow-up" aria-hidden="true"></i>
            </span>
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
        {error && <p className="signup_error" role="alert">{error}</p>}
      </form>
    </div>
  );
};

export default InfosPrsnlCandidat;
