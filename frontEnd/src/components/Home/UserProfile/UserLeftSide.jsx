import React from "react";
import { Link } from "react-router-dom";
import "../../../style/UserProfile/UserLeftSide.css";

export default function LeftSide(userData) {
  const user = userData.userData;
  console.log(user);
  return (
    <div className="container">
      <aside className="card">
        <div className="userInfo">
          <div className="cardBackground"></div>
          <Link to={"/profile-utilisateur"}>
            <div className="photo"></div>
          </Link>
          <div className="userName">
            {user.prenom} {user.nom}
          </div>
          <div className="userEmail">{user.email}</div>
        </div>

        <div className="details">
          <h3 className="sectionTitle">Adresse</h3>
          <div className="sectionContent">{user.adresse}</div>

          <h3 className="sectionTitle">Téléphone</h3>
          <div className="sectionContent">{user.telephone}</div>

          <h3 className="sectionTitle">Date de Naissance</h3>
          <div className="sectionContent">{user.date_naissance}</div>

          {user.id_entreprise ? (
            <>
              <h3 className="sectionTitle">Entreprise</h3>
              <div className="sectionContent">{new Date(user.id_entreprise).toLocaleDateString("en-CA")}</div>
            </>
          ):<></>}
        </div>
      </aside>

      {!user.id_entreprise ? (
        <>
          <aside className="card">
            <div className="details">
              <h3 className="sectionTitle">Éducation</h3>
              {user.educations && user.educations.map((edu, index) => (
                <div className="sectionContent" key={index}>
                  <strong>{edu.diplome}</strong> - {edu.institut} (
                  {new Date(edu.date_debut).toLocaleDateString("en-CA")} -{" "}
                  {new Date(edu.date_fin).toLocaleDateString("en-CA")})
                  <br />
                  <em>{edu.description}</em>
                </div>
              ))}
            </div>
          </aside>

          <aside className="card">
            <div className="details">
              <h3 className="sectionTitle">Expériences</h3>
              {user.experiences && user.experiences.map((exp) => (
                <div className="sectionContent" key={exp.index}>
                  <strong>{exp.poste}</strong> {exp.entreprise} ({" "}
                  {new Date(exp.date_debut).toLocaleDateString("en-CA")} -{" "}
                  {new Date(exp.date_fin).toLocaleDateString("en-CA")}))
                  <br />
                  <em>{exp.description}</em>
                </div>
              ))}
            </div>
          </aside>

          <aside className="card">
            <div className="details">
              <h3 className="sectionTitle">Compétences</h3>
              <div className="sectionContent">
                {user.competences && user.competences.map((com) => (
                  <span className="skill" key={com.index}>
                    {com.competence}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </>
      ):<></>}
    </div>
  );
}
