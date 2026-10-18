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
  const [cvError, setCvError] = useState("");
  const [cvStatus, setCvStatus] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleCVChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setCV(undefined);
      setCvStatus("");
      return;
    }

    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    const isImage = file.type.startsWith("image/");
    if (!isPdf && !isImage) {
      setCV(undefined);
      setCvStatus("");
      setCvError("Choisissez un fichier PDF ou une image (PNG, JPG, JPEG). ");
      e.target.value = "";
      return;
    }

    setCV(file);
    setCvError("");
    setCvStatus(`Fichier prêt : ${file.name}`);
  };

  const normalizeText = (value) => value || "";

  const normalizeDate = (value) => {
    if (!value || typeof value !== "string") {
      return "";
    }

    const normalizedValue = value.trim().toLowerCase();
    if (
      normalizedValue.includes("présent") ||
      normalizedValue.includes("present") ||
      normalizedValue.includes("actuel") ||
      normalizedValue.includes("maintenant")
    ) {
      return "";
    }

    const yearMatch = normalizedValue.match(/\b(19|20)\d{2}\b/);
    if (!yearMatch) {
      return "";
    }

    const months = {
      janvier: "01",
      février: "02",
      fevrier: "02",
      mars: "03",
      avril: "04",
      mai: "05",
      juin: "06",
      juillet: "07",
      août: "08",
      aout: "08",
      septembre: "09",
      octobre: "10",
      novembre: "11",
      décembre: "12",
      decembre: "12",
    };

    const monthName = Object.keys(months).find((month) =>
      normalizedValue.includes(month)
    );
    const month = monthName ? months[monthName] : "01";

    return `${yearMatch[0]}-${month}-01`;
  };

  const extractJsonObject = (value) => {
    if (typeof value !== "string") {
      return value || {};
    }

    const start = value.indexOf("{");
    const end = value.lastIndexOf("}");

    if (start === -1 || end === -1 || end <= start) {
      return {};
    }

    try {
      return JSON.parse(value.slice(start, end + 1));
    } catch (error) {
      console.error("Réponse AI non lisible en JSON", error, value);
      return {};
    }
  };

  const normalizeAiResponse = (data) => {
    const payload = extractJsonObject(data);

    return {
    ...payload,
    educations: (payload.educations || payload.education || []).map((education) => ({
      diplome: normalizeText(education.diplome),
      institut: normalizeText(education.institut),
      date_debut: normalizeDate(education.date_debut),
      date_fin: normalizeDate(education.date_fin),
      description: normalizeText(education.description),
    })),
    experiences: (payload.experiences || []).map((experience) => ({
      poste: normalizeText(experience.poste),
      entreprise: normalizeText(experience.entreprise),
      date_debut: normalizeDate(experience.date_debut),
      date_fin: normalizeDate(experience.date_fin),
      description: normalizeText(experience.description),
    })),
    competences: (payload.competences || []).map((competence) => ({
      competence: Array.isArray(competence.competence)
        ? competence.competence.join(", ")
        : normalizeText(competence.competence || competence),
    })),
  };
  };

  const handleCVSubmit = async (e) => {
    e.preventDefault();
    if (!CV) {
      setCvError("Ajoutez d’abord votre CV pour lancer l’analyse.");
      return;
    }

    try {
      setLoading(true);
      setCvError("");
      setCvStatus("Analyse de votre CV en cours…");
      const formDataToSend = new FormData();
      formDataToSend.append("cv", CV);

      const response = await axios.post(
        "http://127.0.0.1:5000/process_cv",
        formDataToSend
      );

      const aiPayload = response.data?.response || response.data;
      const formattedResponseData = normalizeAiResponse(aiPayload);

      console.log("Réponse CV brute", response.data);
      console.log("Réponse CV formatée", formattedResponseData);

      // Update the state with formatted data
      setFormData(formattedResponseData);
      setCvStatus("CV analysé. Vérifiez maintenant les informations ci-dessous.");
    } catch (error) {
      console.error("Erreur de traitement OCR extraction !! ", error);
      setCvError(error.response?.data?.error || "L’analyse du CV a échoué. Vérifiez le fichier puis réessayez.");
      setCvStatus("");
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
    setSubmitError("");

    const personalData = inforpersonnel[0] || {};
    const missingEducation = formData.educations.findIndex((item) =>
      !item.diplome || !item.institut || !item.date_debut
    );
    const missingExperience = formData.experiences.findIndex((item) =>
      !item.poste || !item.entreprise || !item.date_debut
    );
    const missingCompetence = formData.competences.findIndex((item) => !item.competence);
    const missingPersonalField = [
      ["nom", "le nom"], ["prenom", "le prénom"], ["email", "l’email"],
      ["password", "le mot de passe"], ["adresse", "l’adresse"],
      ["telephone", "le téléphone"], ["date_naissance", "la date de naissance"],
    ].find(([key]) => !personalData[key]);

    if (missingPersonalField) {
      setSubmitError(`Information manquante : ${missingPersonalField[1]}. Retournez à l’étape précédente pour la compléter.`);
      return;
    }
    if (missingEducation !== -1) {
      setSubmitError(`Formation ${missingEducation + 1} incomplète : renseignez le diplôme, l’établissement et la date de début.`);
      return;
    }
    if (missingExperience !== -1) {
      setSubmitError(`Expérience ${missingExperience + 1} incomplète : renseignez le poste, l’entreprise et la date de début.`);
      return;
    }
    if (missingCompetence !== -1) {
      setSubmitError(`Compétence ${missingCompetence + 1} incomplète : renseignez une compétence ou supprimez cette ligne.`);
      return;
    }

    setIsSubmitting(true);
    const dataInputs = {
      ...formData,
      ...inforpersonnel[0],
    };
    try {
      const profilePath = dataInputs.profilePath;
      const hasProfileFile = profilePath instanceof File;
      const requestBody = hasProfileFile ? new FormData() : dataInputs;

      if (hasProfileFile) {
        Object.entries(dataInputs).forEach(([key, value]) => {
          if (key !== "profilePath") {
            requestBody.append(key, typeof value === "object" ? JSON.stringify(value) : value ?? "");
          }
        });
        requestBody.append("profilePath", profilePath);
      }

      const response = await axios.post(
        "http://localhost:3000/api/signup",
        requestBody,
        hasProfileFile ? { headers: { "Content-Type": "multipart/form-data" } } : undefined
      );
      console.log("SignUp successful!", response.data);
      handleRedirecthome();
    } catch (error) {
      console.error("SignUp failed!", error);
      const serverMessage = error.response?.data?.error;
      const networkMessage = error.request
        ? "Le serveur d’inscription ne répond pas. Vérifiez que l’API Express est démarrée sur le port 3000."
        : error.message;
      setSubmitError(serverMessage || networkMessage || "La publication a échoué. Vérifiez les informations puis réessayez.");
    } finally {
      setIsSubmitting(false);
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
      <div className="profile_editor_header">
        <div>
          <span className="profile_editor_eyebrow">Étape 3 sur 3</span>
          <h2>Votre parcours professionnel</h2>
          <p>Vérifiez les informations importées et complétez votre profil avant de le publier.</p>
        </div>
        <div className="profile_progress" aria-label="Progression : étape 3 sur 3">
          <span className="profile_progress_value">100%</span>
          <span className="profile_progress_track"><span></span></span>
          <small>Profil presque prêt</small>
        </div>
      </div>

      <form action=""  onSubmit={handleCVSubmit}>
        <div className="candidat_cv">
          <div className="cv_upload_icon" aria-hidden="true">↑</div>
          <div className="cv_upload_copy">
            <strong>Importez votre CV</strong>
            <span>PDF, PNG ou JPG · 10 Mo maximum · le contenu préremplira votre profil.</span>
            <label htmlFor="profile-input-candidat">Choisir un fichier <i className="fas fa-arrow-up"></i></label>
          </div>
          <input type="file" accept=".pdf,image/png,image/jpeg,image/jpg" className="profile-input" id="profile-input-candidat" name="cv" onChange={handleCVChange} />
          <input type="submit" value="Analyser le CV" disabled={!CV || loding} />
        </div>
        <div className={`cv_feedback ${cvError ? "is-error" : cvStatus ? "is-success" : ""}`} role="status" aria-live="polite">
          {cvError || cvStatus || "Aucun fichier sélectionné pour le moment."}
        </div>
      </form>


      <form action="" onSubmit={handleSubmit} noValidate>
        {/* Education Section */}
        {formData.educations.map((education, index) => (
          <details className="infos profile_section" key={index} open={index === 0}>
            <summary>
              <span className="section-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="summary-copy"><strong>Formation {index + 1}</strong><small>Diplôme, établissement et dates</small></span>
              <span className="summary-chevron" aria-hidden="true">⌄</span>
            </summary>
            <label className="profile_field">Diplôme
              <input type="text" name="diplome" placeholder="Ex. Ingénierie Informatique" value={education.diplome || ""} onChange={(e) => handleChange(e, index, "educations")} required />
            </label>
            <label className="profile_field">Établissement
              <input type="text" name="institut" placeholder="Ex. EMSI Marrakech" value={education.institut || ""} onChange={(e) => handleChange(e, index, "educations")} required />
            </label>
            <div className="date_debut">
              <label>Date de début</label>
              <input
                type="date"
                name="date_debut"
                value={education.date_debut || ""}
                onChange={(e) => handleChange(e, index, "educations")}
                required
              />
            </div>
            <div className="date_debut">
              <label>Date de fin</label>
              <input
                type="date"
                name="date_fin"
                value={education.date_fin || ""}
                onChange={(e) => handleChange(e, index, "educations")}
              />
            </div>
            <label className="profile_field profile_field_full">Description
              <textarea name="description" placeholder="Décrivez brièvement cette formation" value={education.description || ""} onChange={(e) => handleChange(e, index, "educations")}></textarea>
            </label>
            <div className="btn">
              <button
                type="button"
                className="ajouter"
                onClick={() => handleAjouter("educations")}
              >
                Ajouter une éducation
              </button>
              <button
                type="button"
                className="supprimer"
                onClick={() => handleSupprimer("educations")}
              >
                Supprimer
              </button>
            </div>
          </details>
        ))}

        {/* Experience Section */}
        {formData.experiences.map((experience, index) => (
          <details className="infos profile_section" key={index} open={index === 0}>
            <summary>
              <span className="section-number">{String(formData.educations.length + index + 1).padStart(2, "0")}</span>
              <span className="summary-copy"><strong>Expérience {index + 1}</strong><small>Poste, entreprise et missions</small></span>
              <span className="summary-chevron" aria-hidden="true">⌄</span>
            </summary>
            <label className="profile_field">Poste occupé
              <input type="text" name="poste" placeholder="Ex. Développeur Full Stack" value={experience.poste || ""} onChange={(e) => handleChange(e, index, "experiences")} required />
            </label>
            <label className="profile_field">Entreprise
              <input type="text" name="entreprise" placeholder="Ex. JOB'S" value={experience.entreprise || ""} onChange={(e) => handleChange(e, index, "experiences")} required />
            </label>
            <div className="date_debut">
              <label>Date de début</label>
              <input
                type="date"
                name="date_debut"
                value={experience.date_debut || ""}
                onChange={(e) => handleChange(e, index, "experiences")}
                required
              />
            </div>
            <div className="date_debut">
              <label>Date de fin</label>
              <input
                type="date"
                name="date_fin"
                value={experience.date_fin || ""}
                onChange={(e) => handleChange(e, index, "experiences")}
              />
            </div>
            <label className="profile_field profile_field_full">Missions et réalisations
              <textarea name="description" placeholder="Décrivez vos missions principales" value={experience.description || ""} onChange={(e) => handleChange(e, index, "experiences")}></textarea>
            </label>
            <div className="btn">
              <button
                type="button"
                className="ajouter"
                onClick={() => handleAjouter("experiences")}
              >
                Ajouter une expérience
              </button>
              <button
                type="button"
                className="supprimer"
                onClick={() => handleSupprimer("experiences")}
              >
                Supprimer
              </button>
            </div>
          </details>
        ))}

        {/* Competence Section */}
        {formData.competences.map((competence, index) => (
          <details className="infos profile_section" key={index} open={index === 0}>
            <summary>
              <span className="section-number">{String(formData.educations.length + formData.experiences.length + index + 1).padStart(2, "0")}</span>
              <span className="summary-copy"><strong>Compétence {index + 1}</strong><small>Une compétence qui vous représente</small></span>
              <span className="summary-chevron" aria-hidden="true">⌄</span>
            </summary>
            <label className="profile_field profile_field_full">Compétence
              <input type="text" name="competence" placeholder="Ex. React JS" value={competence.competence || ""} onChange={(e) => handleChange(e, index, "competences")} required />
            </label>
            <div className="btn">
              <button
                type="button"
                className="ajouter"
                onClick={() => handleAjouter("competences")}
              >
                Ajouter une compétence
              </button>
              <button
                type="button"
                className="supprimer"
                onClick={() => handleSupprimer("competences")}
              >
                Supprimer
              </button>
            </div>
          </details>
        ))}

        <div className="profile_form_actions">
          <button type="button" onClick={handleRedirect}>← Retour</button>
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Publication…" : "Publier mon profil"} <span aria-hidden="true">→</span></button>
        </div>
        {submitError && <p className="profile_submit_error" role="alert">{submitError}</p>}
      </form>
    </div>
  );
};

export default InfosProsCandidat;
