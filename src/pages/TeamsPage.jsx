import { useState, useEffect } from "react";
import CharacterIcon from "../components/CharacterIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandFist,
  faVirus,
  faFlask,
  faMedkit,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/pages/teamsPage.css";

const roleIcons = {
  mainDps: faHandFist,
  secondDps: faVirus,
  support: faFlask,
  sustain: faMedkit,
};

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [uid, setUid] = useState("");

  useEffect(() => {
    const savedUid = localStorage.getItem("userUID");
    if (savedUid) {
      setUid(savedUid);
      loadUserTeams(savedUid);
    }
  }, []);

  const loadUserTeams = async (uid) => {
    try {
      const response = await fetch(
        "https://honkai-star-rail-backend.onrender.com/api/getTeams",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid }),
        }
      );
      const result = await response.json();
      if (result?.success) {
        setTeams(result.teams);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des équipes :", error);
    }
  };

  const deleteTeam = async (name) => {
    try {
      const response = await fetch(
        "https://honkai-star-rail-backend.onrender.com/api/deleteTeam",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid, name }),
        }
      );
      const result = await response.json();
      if (result?.success) {
        alert("Équipe supprimée avec succès !");
        setTeams(result.userTeam.teams);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'équipe :", error);
    }
  };

  return (
    <div className="teams-page">
      <h2>Équipes enregistrées</h2>
      {teams.length > 0 ? (
        <div className="teams-container">
          {teams.map((team, index) => (
            <div key={index} className="team">
              <h3>{team.name}</h3>
              <div className="team-characters">
                {Object.keys(team.team[0]).map((role) => (
                  <div key={role} className="team-character">
                    <FontAwesomeIcon icon={roleIcons[role]} size="2x" />
                    {team.team[0][role] && team.team[0][role].name ? (
                      <CharacterIcon character={team.team[0][role]} />
                    ) : (
                      <p>Vide</p>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={() => deleteTeam(team.name)}>Supprimer</button>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucune équipe enregistrée.</p>
      )}
    </div>
  );
};

export default TeamsPage;
