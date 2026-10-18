import React, { useState } from "react";
import "../../../style/steps/statut_options.css";
import InfosPrsnlCandidat from "./InfosPrsnlCandidat";
import InfosPrsnlRecruteur from "./InfosPrsnlRecruteur";

const StatutOptions = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [error, setError] = useState("");

  const handleSelect = (option) => {
    setSelectedOption(option);
    setButtonClicked(false);
    setDropdownActive(false);
  };

  const handleButtonClick = () => {
    if (selectedOption) {
      setButtonClicked(true);
      setError("");
    } else {
      setError("Sélectionnez votre profil pour continuer.");
    }
  };

  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  return (
    <div className="statut_options_container">
      {!buttonClicked ? (
        <>
          <div className="role-selector-heading">
            <span className="role-selector-step">01</span>
            <div>
              <label className="role-selector-label">Votre parcours</label>
              <p className="role-selector-helper">Choisissez l’espace qui correspond à votre objectif.</p>
            </div>
          </div>
          <div
            className={`dropdown ${dropdownActive ? "active" : ""}`}
            onClick={toggleDropdown}
            role="listbox"
            aria-expanded={dropdownActive}
            aria-label="Choisir votre parcours"
          >
            <span className={`dropdown-copy ${selectedOption ? "selected" : ""}`}>
              <span className="dropdown-kicker">Choisissez votre espace</span>
              <span className="dropdown-value">
                {selectedOption
                  ? selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)
                  : "Sélectionner un parcours"}
              </span>
            </span>
            <span className="dropdown-toggle" aria-hidden="true">
              <span className="left-icon"></span>
              <span className="right-icon"></span>
            </span>
            <div className="items">
              <button
                type="button"
                className={selectedOption === "candidat" ? "chosen" : ""}
                onClick={(event) => { event.stopPropagation(); handleSelect("candidat"); }}
                style={{ "--i": 1 }}
              >
                <span className="option-icon" aria-hidden="true">↗</span>
                <span className="option-copy"><strong>Candidat</strong><small>Je cherche une opportunité</small></span>
                <span className="option-check" aria-hidden="true">✓</span>
              </button>
              <button
                type="button"
                className={selectedOption === "recruteur" ? "chosen" : ""}
                onClick={(event) => { event.stopPropagation(); handleSelect("recruteur"); }}
                style={{ "--i": 2 }}
              >
                <span className="option-icon" aria-hidden="true">+</span>
                <span className="option-copy"><strong>Recruteur</strong><small>Je recrute un nouveau talent</small></span>
                <span className="option-check" aria-hidden="true">✓</span>
              </button>
            </div>
          </div>

          <div className="btnSuivant">
            <button onClick={handleButtonClick}>Continuer <span aria-hidden="true">→</span></button>
          </div>
          {error && <p className="signup_error" role="alert">{error}</p>}
        </>
      ) : (
        <>
          {selectedOption === "candidat" && <InfosPrsnlCandidat />}
          {selectedOption === "recruteur" && <InfosPrsnlRecruteur />}
        </>
      )}
    </div>
  );
};

export default StatutOptions;
