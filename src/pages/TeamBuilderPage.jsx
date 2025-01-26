import { useState, useEffect } from "react";
import { fetchCharacters } from "../services/api";
import CharacterIcon from "../components/CharacterIcon";
import "../styles/pages/teamBuilderPage.css";

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

const TeamBuilderPage = () => {
  const [characters, setCharacters] = useState([]);
  const [team, setTeam] = useState({
    mainDps: null,
    secondDps: null,
    support: null,
    sustain: null,
  });
  const [filter, setFilter] = useState("All");
  const [uid, setUid] = useState("");
  const [teamName, setTeamName] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const savedUid = localStorage.getItem("userUID");
    if (savedUid) {
      setUid(savedUid);
      loadCharacters();
      fetchUser(savedUid);
    }
  }, []);

  const loadCharacters = async () => {
    const result = await fetchCharacters();
    if (result?.success) {
      setCharacters(result.data);
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

  const saveTeam = async () => {
    if (!teamName) {
      alert("Le nom de l'équipe est obligatoire");
      return;
    }

    try {
      const response = await fetch(
        "https://honkai-star-rail-backend.onrender.com/api/saveTeam",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid, name: teamName, team }),
        }
      );
      const result = await response.json();
      if (result?.success) {
        alert("Équipe enregistrée avec succès !");
        setTeamName("");
        setTeam({
          mainDps: null,
          secondDps: null,
          support: null,
          sustain: null,
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'équipe :", error);
    }
  };

  const handleCharacterClick = (character) => {
    if (!team.mainDps) {
      setTeam((prev) => ({ ...prev, mainDps: character }));
    } else if (!team.secondDps) {
      setTeam((prev) => ({ ...prev, secondDps: character }));
    } else if (!team.support) {
      setTeam((prev) => ({ ...prev, support: character }));
    } else if (!team.sustain) {
      setTeam((prev) => ({ ...prev, sustain: character }));
    }
  };

  const handleRemoveCharacter = (role) => {
    setTeam((prev) => ({ ...prev, [role]: null }));
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

  const getRoleClass = (role) => {
    return role.toLowerCase().replace(" ", "-");
  };

  const replaceNickname = (name) => {
    return name.replace("{NICKNAME}", nickname);
  };

  const availableCharacters = characters
    .filter(
      (char) =>
        char.id !== team.mainDps?.id &&
        char.id !== team.secondDps?.id &&
        char.id !== team.support?.id &&
        char.id !== team.sustain?.id
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const filteredCharacters = availableCharacters.filter((char) => {
    const role = getRole(char);
    if (filter === "All") return true;
    if (filter === "DPS Principal" && role === "DPS Principal") return true;
    if (filter === "DPS Secondaire" && role === "DPS Secondaire") return true;
    if (filter === "Soutien" && role === "Soutien") return true;
    if (filter === "Support" && role === "Support") return true;
    return false;
  });

  const dpsPrincipalCharacters = filteredCharacters.filter(
    (char) => getRole(char) === "DPS Principal"
  );

  const dpsSecondaireCharacters = filteredCharacters.filter(
    (char) => getRole(char) === "DPS Secondaire"
  );

  return (
    <div className="team-builder-page">
      <div className="roles">
        <div
          className={`role-slot ${
            team.mainDps ? getRoleClass(getRole(team.mainDps)) : "dps-principal"
          }`}
          onClick={() => handleRemoveCharacter("mainDps")}
        >
          <h4>{team.mainDps ? getRole(team.mainDps) : "DPS Principal"}</h4>
          {team.mainDps ? (
            <CharacterIcon character={team.mainDps} inBuilder />
          ) : (
            <div className="character-icon-container">
              <p>Vide</p>
            </div>
          )}
        </div>
        <div
          className={`role-slot ${
            team.secondDps
              ? getRoleClass(getRole(team.secondDps))
              : "dps-secondaire"
          }`}
          onClick={() => handleRemoveCharacter("secondDps")}
        >
          <h4>{team.secondDps ? getRole(team.secondDps) : "DPS Secondaire"}</h4>
          {team.secondDps ? (
            <CharacterIcon character={team.secondDps} inBuilder />
          ) : (
            <div className="character-icon-container">
              <p>Vide</p>
            </div>
          )}
        </div>
        <div
          className={`role-slot ${
            team.support ? getRoleClass(getRole(team.support)) : "soutien"
          }`}
          onClick={() => handleRemoveCharacter("support")}
        >
          <h4>{team.support ? getRole(team.support) : "Soutien"}</h4>
          {team.support ? (
            <CharacterIcon character={team.support} inBuilder />
          ) : (
            <div className="character-icon-container">
              <p>Vide</p>
            </div>
          )}
        </div>
        <div
          className={`role-slot ${
            team.sustain ? getRoleClass(getRole(team.sustain)) : "support"
          }`}
          onClick={() => handleRemoveCharacter("sustain")}
        >
          <h4>{team.sustain ? getRole(team.sustain) : "Support"}</h4>
          {team.sustain ? (
            <CharacterIcon character={team.sustain} inBuilder />
          ) : (
            <div className="character-icon-container">
              <p>Vide</p>
            </div>
          )}
        </div>
      </div>
      <div className="filter-buttons">
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("DPS Principal")}>
          DPS Principal
        </button>
        <button onClick={() => setFilter("DPS Secondaire")}>
          DPS Secondaire
        </button>
        <button onClick={() => setFilter("Soutien")}>Soutien</button>
        <button onClick={() => setFilter("Support")}>Support</button>
      </div>
      <div className="team-name-input">
        <input
          type="text"
          placeholder="Nom de l'équipe"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </div>
      <button className="save-team-button" onClick={saveTeam}>
        Enregistrer l&apos;équipe
      </button>
      {filter === "DPS Principal" || filter === "All" ? (
        <div className="dps-principal-characters">
          <h3>DPS Principal</h3>
          <div className="characters-grid">
            {dpsPrincipalCharacters.map((char) => (
              <CharacterIcon
                key={char.id}
                character={{ ...char, name: replaceNickname(char.name) }}
                onClick={() => handleCharacterClick(char)}
              />
            ))}
          </div>
        </div>
      ) : null}
      {filter === "DPS Secondaire" || filter === "All" ? (
        <div className="dps-secondaire-characters">
          <h3>DPS Secondaire</h3>
          <div className="characters-grid">
            {dpsSecondaireCharacters.map((char) => (
              <CharacterIcon
                key={char.id}
                character={{ ...char, name: replaceNickname(char.name) }}
                onClick={() => handleCharacterClick(char)}
              />
            ))}
          </div>
        </div>
      ) : null}
      {filter === "Soutien" || filter === "All" ? (
        <div className="soutien-characters">
          <h3>Soutien</h3>
          <div className="characters-grid">
            {filteredCharacters
              .filter((char) => getRole(char) === "Soutien")
              .map((char) => (
                <CharacterIcon
                  key={char.id}
                  character={{ ...char, name: replaceNickname(char.name) }}
                  onClick={() => handleCharacterClick(char)}
                />
              ))}
          </div>
        </div>
      ) : null}
      {filter === "Support" || filter === "All" ? (
        <div className="support-characters">
          <h3>Support</h3>
          <div className="characters-grid">
            {filteredCharacters
              .filter((char) => getRole(char) === "Support")
              .map((char) => (
                <CharacterIcon
                  key={char.id}
                  character={{ ...char, name: replaceNickname(char.name) }}
                  onClick={() => handleCharacterClick(char)}
                />
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TeamBuilderPage;
