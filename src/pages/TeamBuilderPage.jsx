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

  const loadCharacters = async () => {
    const result = await fetchCharacters();
    if (result?.success) {
      setCharacters(result.data);
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

  useEffect(() => {
    loadCharacters();
  }, []);

  const availableCharacters = characters
    .filter(
      (char) =>
        char.id !== team.mainDps?.id &&
        char.id !== team.secondDps?.id &&
        char.id !== team.support?.id &&
        char.id !== team.sustain?.id
    )
    .sort((a, b) => a.name.localeCompare(b.name));

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
      <div className="characters-grid">
        {availableCharacters.map((char) => (
          <CharacterIcon
            key={char.id}
            character={char}
            onClick={() => handleCharacterClick(char)}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamBuilderPage;
