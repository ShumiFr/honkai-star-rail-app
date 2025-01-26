/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { fetchCharacters } from "../services/api";
import CharacterCard from "../components/CharacterCard";
import "../styles/pages/charactersPage.css";
import fireIcon from "../assets/element/fire.webp";
import iceIcon from "../assets/element/ice.webp";
import windIcon from "../assets/element/wind.webp";
import electricIcon from "../assets/element/lightning.webp";
import quantumIcon from "../assets/element/quantum.webp";
import imaginaryIcon from "../assets/element/imaginary.webp";
import allIcon from "../assets/element/all.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandFist,
  faVirus,
  faFlask,
  faMedkit,
  faAsterisk,
} from "@fortawesome/free-solid-svg-icons";

const rolesByPath = {
  "L'Abondance": "Support",
  "La Destruction": "DPS Principal",
  "L'Érudition": "DPS Principal",
  "L'Harmonie": "Soutien",
  "La Chasse": "DPS Principal",
  "La Nihilité": "Soutien",
  "La Préservation": "Support",
};

const exceptions = {
  Herta: "DPS Secondaire",
  Jade: "DPS Secondaire",
  Serval: "DPS Secondaire",
  Moze: "DPS Secondaire",
  "Topaz et Compti": "DPS Secondaire",
  Acheron: "DPS Principal",
  "Cygne noir": "DPS Secondaire",
  Kafka: "DPS Principal",
  Luka: "DPS Principal",
  Sampo: "DPS Secondaire",
  Welt: "DPS Secondaire",
  "March 7th": {
    Chasse: "DPS Secondaire",
    Préservation: "Support",
  },
};

const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [uid, setUid] = useState("");
  const [nickname, setNickname] = useState("");
  const [elementFilter, setElementFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");

  useEffect(() => {
    const savedUid = localStorage.getItem("userUID");
    if (savedUid) {
      setUid(savedUid);
      fetchUser(savedUid);
      loadCharacters();
    }
  }, []);

  const loadCharacters = async () => {
    const result = await fetchCharacters();
    if (result?.success) {
      const charactersWithRolesAndElements = result.data.map((char) => {
        const role = getRole(char);
        const element = char.combatType.name; // Assurez-vous que l'API renvoie l'élément du personnage
        return { ...char, role, element };
      });
      setCharacters(charactersWithRolesAndElements);
    }
  };

  const fetchUser = async (uid) => {
    try {
      const response = await fetch(
        "https://honkai-star-rail-backend.onrender.com/api/fetchUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid }),
        }
      );
      const data = await response.json();
      if (data && data.nickname) {
        setNickname(data.nickname);
      } else {
        setNickname("");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données utilisateur :",
        error
      );
      setNickname("");
    }
  };

  const getRole = (character) => {
    const characterName = character.name;
    const characterPath = character.path;
    if (exceptions[characterName]) {
      if (typeof exceptions[characterName] === "string") {
        return exceptions[characterName];
      }
      return exceptions[characterName][characterPath] || "Soutien";
    }
    return rolesByPath[characterPath] || "Soutien";
  };

  const replaceNickname = (name) => {
    return name.replace("{NICKNAME}", nickname);
  };

  const handleElementFilter = (element) => {
    setElementFilter(element);
  };

  const handleRoleFilter = (role) => {
    setRoleFilter(role);
  };

  const filteredCharacters = characters.filter((char) => {
    const matchesElement =
      elementFilter === "All" || char.element === elementFilter;
    const matchesRole = roleFilter === "All" || char.role === roleFilter;
    return matchesElement && matchesRole;
  });

  return (
    <div className="characters-page">
      <div className="characters-page-background"></div>
      <h2>Liste des personnages</h2>
      <div className="filters">
        <div className="element-filters">
          <div
            className={`element-choice ${
              elementFilter === "All" ? "active" : ""
            }`}
            onClick={() => handleElementFilter("All")}
          >
            <FontAwesomeIcon icon={faAsterisk} color="white" />
          </div>
          <div
            className={`element-choice ${
              elementFilter === "Feu" ? "active" : ""
            }`}
            onClick={() => handleElementFilter("Feu")}
          >
            <img src={fireIcon} alt="Feu" />
          </div>
          <div
            className={`element-choice ${
              elementFilter === "Glace" ? "active" : ""
            }`}
            onClick={() => handleElementFilter("Glace")}
          >
            <img src={iceIcon} alt="Glace" />
          </div>
          <div
            className={`element-choice ${
              elementFilter === "Vent" ? "active" : ""
            }`}
            onClick={() => handleElementFilter("Vent")}
          >
            <img src={windIcon} alt="Vent" />
          </div>
          <div
            className={`element-choice ${
              elementFilter === "Électricité" ? "active" : ""
            }`}
            onClick={() => handleElementFilter("Électricité")}
          >
            <img src={electricIcon} alt="Électricité" />
          </div>
          <div
            className={`element-choice ${
              elementFilter === "Quantique" ? "active" : ""
            }`}
            onClick={() => handleElementFilter("Quantique")}
          >
            <img src={quantumIcon} alt="Quantique" />
          </div>
          <div
            className={`element-choice ${
              elementFilter === "Imaginaire" ? "active" : ""
            }`}
            onClick={() => handleElementFilter("Imaginaire")}
          >
            <img src={imaginaryIcon} alt="Imaginaire" />
          </div>
        </div>
        <div className="role-filters">
          <div
            className={`role-choice ${roleFilter === "All" ? "active" : ""}`}
            onClick={() => handleRoleFilter("All")}
          >
            <FontAwesomeIcon icon={faAsterisk} color="white" />
          </div>
          <div
            className={`role-choice ${
              roleFilter === "DPS Principal" ? "active" : ""
            }`}
            onClick={() => handleRoleFilter("DPS Principal")}
          >
            <FontAwesomeIcon icon={faHandFist} color="red" />
          </div>
          <div
            className={`role-choice ${
              roleFilter === "DPS Secondaire" ? "active" : ""
            }`}
            onClick={() => handleRoleFilter("DPS Secondaire")}
          >
            <FontAwesomeIcon icon={faVirus} color="darkviolet" />
          </div>
          <div
            className={`role-choice ${
              roleFilter === "Soutien" ? "active" : ""
            }`}
            onClick={() => handleRoleFilter("Soutien")}
          >
            <FontAwesomeIcon icon={faFlask} color="yellow" />
          </div>
          <div
            className={`role-choice ${
              roleFilter === "Support" ? "active" : ""
            }`}
            onClick={() => handleRoleFilter("Support")}
          >
            <FontAwesomeIcon icon={faMedkit} color="green" />
          </div>
        </div>
      </div>
      {filteredCharacters.length > 0 ? (
        <div className="card-container">
          {filteredCharacters.map((char) => (
            <CharacterCard
              key={char.id}
              character={{ ...char, name: replaceNickname(char.name) }}
            />
          ))}
        </div>
      ) : (
        <p>Chargement des personnages...</p>
      )}
    </div>
  );
};

export default CharactersPage;
