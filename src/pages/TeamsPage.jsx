/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "../styles/pages/teamsPage.css";

const TeamsPage = () => {
  const [team, setTeam] = useState(null);
  const [uid, setUid] = useState("");

  useEffect(() => {
    const savedUid = localStorage.getItem("userUID");
    if (savedUid) {
      setUid(savedUid);
      loadUserTeam(savedUid);
    }
  }, []);

  const loadUserTeam = async (uid) => {
    try {
      const response = await fetch("http://localhost:5000/api/getTeam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid }),
      });
      const result = await response.json();
      if (result?.success && result.team) {
        setTeam(result.team);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'équipe :", error);
    }
  };

  return (
    <div className="teams-page">
      <h2>Équipe enregistrée</h2>
      {team ? (
        <div className="team-container">
          <div className="team-character">
            <h4>DPS Principal</h4>
            {team.mainDps ? (
              <>
                <img src={team.mainDps.icon} alt={team.mainDps.name} />
                <p>{team.mainDps.name}</p>
              </>
            ) : (
              <p>Vide</p>
            )}
          </div>
          <div className="team-character">
            <h4>DPS Secondaire</h4>
            {team.secondDps ? (
              <>
                <img src={team.secondDps.icon} alt={team.secondDps.name} />
                <p>{team.secondDps.name}</p>
              </>
            ) : (
              <p>Vide</p>
            )}
          </div>
          <div className="team-character">
            <h4>Soutien</h4>
            {team.support ? (
              <>
                <img src={team.support.icon} alt={team.support.name} />
                <p>{team.support.name}</p>
              </>
            ) : (
              <p>Vide</p>
            )}
          </div>
          <div className="team-character">
            <h4>Support</h4>
            {team.sustain ? (
              <>
                <img src={team.sustain.icon} alt={team.sustain.name} />
                <p>{team.sustain.name}</p>
              </>
            ) : (
              <p>Vide</p>
            )}
          </div>
        </div>
      ) : (
        <p>Aucune équipe enregistrée.</p>
      )}
    </div>
  );
};

export default TeamsPage;
