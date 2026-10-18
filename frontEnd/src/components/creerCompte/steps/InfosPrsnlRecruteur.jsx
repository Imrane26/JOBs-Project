import React, { useState, useEffect } from "react";
import "../../../style/steps/infos_prsnl_recruteur.css";
import StatutOptions from "./StatutOptions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InfosPrsnlRecruteur = () => {
  const navigate = useNavigate();
  const [entreprises, setEntreprises] = useState([]);
  const [newCompany, setNewCompany] = useState(false);
  const [retour, setRetour] = useState(false);
  const [profileFileName, setProfileFileName] = useState("");
  const [profilePreviewUrl, setProfilePreviewUrl] = useState("");
  const [formData, setFormData] = useState({
    nom: "",
    siret: "",
    adresse: "",
    activite: "",
    site_web: "",
    logo: "",
  });
  const [recruteurData, setRecruteurData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    adresse: "",
    telephone: "",
    date_naissance: "",
    idEntreprise: "",
    type_user: "recruteur",
    profilePath: "",
  });

  useEffect(() => {
    const fetchEntreprises = async () => {
      const response = await axios.get("http://localhost:3000/api/entreprise");
      const data = await response.data;
      setEntreprises(data);
    };

    fetchEntreprises();
  }, []);

  const handleRetour = () => {
    setRetour(true);
  };

  const handleNewCompanyChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRecruteurChange = (e) => {
    const { name, value } = e.target;
    setRecruteurData({ ...recruteurData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      setRecruteurData((current) => ({ ...current, profilePath: null }));
      setProfileFileName("");
      return;
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      e.target.value = "";
      setRecruteurData((current) => ({ ...current, profilePath: null }));
      setProfileFileName("");
      return;
    }

    setRecruteurData((current) => ({ ...current, profilePath: file }));
    setProfileFileName(file.name);
  };

  useEffect(() => {
    if (!recruteurData.profilePath) {
      setProfilePreviewUrl("");
      return undefined;
    }

    const previewUrl = URL.createObjectURL(recruteurData.profilePath);
    setProfilePreviewUrl(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [recruteurData.profilePath]);
  const handleRedirecthome = () => {
    navigate("/home");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let companyId = recruteurData.idEntreprise;

    if (newCompany) {
      console.log(formData)
      try {
        const newCompanyResponse = await axios.post(
          "http://localhost:3000/api/entreprise",
          formData
        );
        console.log(newCompanyResponse)
        companyId =newCompanyResponse.data.entreprise._id;
        console.log(companyId)
      } catch (error) {
        console.error("Error creating new company", error);
        return;
      }
    }

    try {
      const finalRecruteurData = { ...recruteurData, idEntreprise: companyId };

      // Handling file upload with FormData
      const formDataToSend = new FormData();
      for (const key in finalRecruteurData) {
        formDataToSend.append(key, finalRecruteurData[key]);
      }

      if (finalRecruteurData.profilePath) {
        formDataToSend.append("profilePath", finalRecruteurData.profilePath);
      }
      console.log(finalRecruteurData)
      const response = await axios.post(
        "http://localhost:3000/api/signup",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("SignUp successful!", response.data);
      navigate('/');
    } catch (error) {
      console.error("Error creating recruteur", error);
    }
  };

  if (retour) {
    return <StatutOptions />;
  }

  return (
    <div className="infos_prsnl_recruteur_container">
      <form onSubmit={handleSubmit}>
        <div className="recruteur">
          <input
            type="file"
            name="profilePath"
            onChange={handleFileChange}
            className="profile-input"
            id="profile-input-recruteur"
          />
          <label htmlFor="profile-input-recruteur">
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

        <div className="entreprise_select">
          <div className="company-select-wrap">
          <select
            className="company-select"
            name="idEntreprise"
            id="entrepriseSelect"
            value={recruteurData.idEntreprise}
            onChange={handleRecruteurChange}
            disabled={newCompany}
          >
            <option value="">Sélectionnez votre entreprise</option>
            {entreprises.map((x) => (
              <option key={x._id} value={x._id}>
                {x.nom}
              </option>
            ))}
          </select>
          <span className="company-select-arrow" aria-hidden="true"></span>
          </div>

          <div className="entr_non_affiche">
            <label htmlFor="new-company-toggle">Mon entreprise n’est pas affichée</label>
            <input
              id="new-company-toggle"
              type="checkbox"
              checked={newCompany}
              onChange={(e) => setNewCompany(e.target.checked)}
            />
          </div>
        </div>

        {/* -------------------------------------------------------------------------------------------------------------------  */}

        {newCompany && (
          <div className="new_company_form">
            <div>
              <input
                placeholder="Nom de l'entreprise"
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleNewCompanyChange}
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="siret"
                placeholder="Siret"
                value={formData.siret}
                onChange={handleNewCompanyChange}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Adresse"
                name="adresse"
                value={formData.adresse}
                onChange={handleNewCompanyChange}
                required
              />
            </div>
            <div>
              <input
                placeholder="Activité"
                type="text"
                name="activite"
                value={formData.activite}
                onChange={handleNewCompanyChange}
                required
              />
            </div>
            <div>
              <input
                placeholder="Site Web"
                type="text"
                name="site_web"
                value={formData.site_web}
                onChange={handleNewCompanyChange}
              />
            </div>
            <div>
              <input
                placeholder="Logo"
                type="text"
                name="logo"
                value={formData.logo}
                onChange={handleNewCompanyChange}
              />
            </div>
          </div>
        )}

        <div className="recruteur_infos">
          <input
            type="text"
            placeholder="Nom"
            name="nom"
            value={recruteurData.nom}
            onChange={handleRecruteurChange}
            required
          />
          <input
            type="text"
            placeholder="Prénom"
            name="prenom"
            value={recruteurData.prenom}
            onChange={handleRecruteurChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={recruteurData.email}
            onChange={handleRecruteurChange}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            value={recruteurData.password}
            onChange={handleRecruteurChange}
            required
          />
          <input
            type="text"
            placeholder="Adresse"
            name="adresse"
            value={recruteurData.adresse}
            onChange={handleRecruteurChange}
            required
          />
          <input
            type="number"
            placeholder="Téléphone"
            name="telephone"
            value={recruteurData.telephone}
            onChange={handleRecruteurChange}
            required
          />
          <div className="input_date">
            <label>Date de naissance</label>
            <input
              type="date"
              name="date_naissance"
              value={recruteurData.date_naissance}
              onChange={handleRecruteurChange}
              required
            />
          </div>
        </div>

        <div className="btn">
          <button type="button" id="retour" onClick={handleRetour}>
            Retour
          </button>
          <button type="submit" id="suivant">
            Confirmer
          </button>
        </div>
      </form>
    </div>
  );
};

export default InfosPrsnlRecruteur;
