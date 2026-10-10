import React, { useState } from "react";
import "../../../style/steps/statut_options.css";
import InfosPrsnlCandidat from "./InfosPrsnlCandidat";
import InfosPrsnlRecruteur from "./InfosPrsnlRecruteur";

const StatutOptions = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setButtonClicked(false);
    setDropdownActive(false);
  };

  const handleButtonClick = () => {
    if (selectedOption) {
      setButtonClicked(true);
    } else {
      alert("Veuillez sélectionner une option avant de continuer.");
    }
  };

  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  return (
    <div className="statut_options_container">
      {!buttonClicked ? (
        <>
          <div
            className={`dropdown ${dropdownActive ? "active" : ""}`}
            onClick={toggleDropdown}
          >
            {selectedOption
              ? selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)
              : "--sélectionner votre option professionnelle--"}
            <span className="left-icon"></span>
            <span className="right-icon"></span>
            <div className="items">
              <a
                href="#"
                onClick={() => handleSelect("candidat")}
                style={{ "--i": 1 }}
              >
                <span></span>Candidat
              </a>
              <a
                href="#"
                onClick={() => handleSelect("recruteur")}
                style={{ "--i": 2 }}
              >
                <span></span>Recruteur
              </a>
            </div>
          </div>

          <div className="btnSuivant">
            <button onClick={handleButtonClick}>Suivant</button>
          </div>
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
