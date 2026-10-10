import "../../../style/steps/infos_pro_candidat.css";
import React, { useState } from "react";
import InfosPrsnlCandidat from "./InfosPrsnlCandidat";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../Home/Layouts/LoadingScreen";

const InfosProsCandidat = ({ infos_prsnl_candidat }) => {
  const [loding, setLoading] = useState(false);
  const inforpersonnel = useState(infos_prsnl_candidat);
  const [formData, setFormData] = useState({
    educations: [
      {
        diplome: "",
        institut: "",
        date_debut: "",
        date_fin: "",
        description: "",
      },
    ],
    experiences: [
      {
        poste: "",
        entreprise: "",
        date_debut: "",
        date_fin: "",
        description: "",
      },
    ],
    competences: [{ competence: "" }],
  });
  const [CV, setCV] = useState();
  const handleCVChange = (e) => {
    setCV(e.target.files[0]);
  };
  const handleCVSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("cv", CV);

      const response = await axios.post(
        "http://127.0.0.1:5000/process_cv",
        formDataToSend
      );

      // Formatting dates
      const formattedResponseData = {
        ...response.data.response,
        educations: response.data.response.educations.map((education) => ({
          ...education,
          date_debut: education.date_debut
            ? new Date(education.date_debut).toLocaleDateString("en-CA")
            : null,
          date_fin: education.date_fin
            ? new Date(education.date_fin).toLocaleDateString("en-CA")
            : null,
        })),
        experiences: response.data.response.experiences.map((experience) => ({
          ...experience,
          date_debut: experience.date_debut
            ? new Date(experience.date_debut).toLocaleDateString("en-CA")
            : null,
          date_fin: experience.date_fin
            ? new Date(experience.date_fin).toLocaleDateString("en-CA")
            : null,
        })),
      };

      console.log(formattedResponseData);

      // Update the state with formatted data
      setFormData(formattedResponseData);
    } catch (error) {
      console.error("Erreur de traitement OCR extraction !! ", error);
    } finally {
      setLoading(false);
    }
  };

  const [retour, setRetour] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e, index, type) => {
    const { name, value } = e.target;
    const updatedItems = formData[type].map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setFormData({ ...formData, [type]: updatedItems });
  };

  const handleAjouter = (type) => {
    setFormData({
      ...formData,
      [type]: [...formData[type], {}],
    });
  };

  const handleSupprimer = (type) => {
    setFormData({
      ...formData,
      [type]: formData[type].slice(0, -1),
    });
  };

  const handleRedirect = () => {
    setRetour(true);
  };

  if (retour) {
    return <InfosPrsnlCandidat />;
  }

  const handleRedirecthome = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataInputs = { ...formData, ...inforpersonnel[0] };
    try {
      console.log(dataInputs);
      const response = await axios.post(
        "http://localhost:3000/api/signup",
        dataInputs
      );
      console.log("SignUp successful!", response.data);
      handleRedirecthome();
    } catch (error) {
      console.error("SignUp failed!", error);
    }
  };

  return loding ? (
    <>
      {" "}
      <LoadingScreen />
      <h1>Traitemant de l'extraxtion des donnés de votre cv</h1>
    </>
  ) : (
    <div className="infos_pro_candidat_container">
      <form action=""  onSubmit={handleCVSubmit}>
        <div className="candidat_cv">
          <input
            type="file"
            className="profile-input"
            id="profile-input-candidat"
            name="cv"
            onChange={handleCVChange}
          />
          <label htmlFor="profile-input-candidat">
            Télécharger le cv <i className="fas fa-download"></i>
          </label>
          <input type="submit" value="traitement de AI" />
        </div>
      </form>


      <form action="" onSubmit={handleSubmit}>
        {/* Education Section */}
        {formData.educations.map((education, index) => (
          <div className="infos" key={index}>
            <h3>Education {index + 1}</h3>
            <input
              type="text"
              name="diplome"
              placeholder="Diplôme"
              value={education.diplome}
              onChange={(e) => handleChange(e, index, "educations")}
              required
            />
            <input
              type="text"
              name="institut"
              placeholder="Institut"
              value={education.institut}
              onChange={(e) => handleChange(e, index, "educations")}
              required
            />
            <div className="date_debut">
              <label>Date de début</label>
              <input
                type="date"
                name="date_debut"
                value={education.date_debut}
                onChange={(e) => handleChange(e, index, "educations")}
                required
              />
            </div>
            <div className="date_debut">
              <label>Date de fin</label>
              <input
                type="date"
                name="date_fin"
                value={education.date_fin}
                onChange={(e) => handleChange(e, index, "educations")}
                required
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              value={education.description}
              onChange={(e) => handleChange(e, index, "educations")}
              required
            ></textarea>
            <div className="btn">
              <button
                className="ajouter"
                onClick={() => handleAjouter("educations")}
              >
                Ajouter une éducation
              </button>
              <button
                className="supprimer"
                onClick={() => handleSupprimer("educations")}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}

        {/* Experience Section */}
        {formData.experiences.map((experience, index) => (
          <div className="infos" key={index}>
            <h3>Expérience {index + 1}</h3>
            <input
              type="text"
              name="poste"
              placeholder="Poste"
              value={experience.poste}
              onChange={(e) => handleChange(e, index, "experiences")}
              required
            />
            <input
              type="text"
              name="entreprise"
              placeholder="Entreprise"
              value={experience.entreprise}
              onChange={(e) => handleChange(e, index, "experiences")}
              required
            />
            <div className="date_debut">
              <label>Date de début</label>
              <input
                type="date"
                name="date_debut"
                value={experience.date_debut}
                onChange={(e) => handleChange(e, index, "experiences")}
                required
              />
            </div>
            <div className="date_debut">
              <label>Date de fin</label>
              <input
                type="date"
                name="date_fin"
                value={experience.date_fin}
                onChange={(e) => handleChange(e, index, "experiences")}
                required
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              value={experience.description}
              onChange={(e) => handleChange(e, index, "experiences")}
              required
            ></textarea>
            <div className="btn">
              <button
                className="ajouter"
                onClick={() => handleAjouter("experiences")}
              >
                Ajouter une expérience
              </button>
              <button
                className="supprimer"
                onClick={() => handleSupprimer("experiences")}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}

        {/* Competence Section */}
        {formData.competences.map((competence, index) => (
          <div className="infos" key={index}>
            <h3>Compétence {index + 1}</h3>
            <input
              type="text"
              name="competence"
              placeholder="Compétence"
              value={competence.competence}
              onChange={(e) => handleChange(e, index, "competences")}
              required
            />
            <div className="btn">
              <button
                className="ajouter"
                onClick={() => handleAjouter("competences")}
              >
                Ajouter une compétence
              </button>
              <button
                className="supprimer"
                onClick={() => handleSupprimer("competences")}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}

        <button type="button" onClick={handleRedirect}>
          Retour
        </button>
        <button type="submit">Confirmer</button>
      </form>
    </div>
  );
};

export default InfosProsCandidat;
