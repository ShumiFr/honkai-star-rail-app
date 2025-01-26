import { useState, useEffect } from "react";
import { fetchCharacters } from "../services/api";
import CharacterCard from "../components/CharacterCard";
import "../styles/pages/CharactersPage.css";

const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);

  const loadCharacters = async () => {
    const result = await fetchCharacters();
    if (result?.success) {
      setCharacters(result.data);
    }
  };

  useEffect(() => {
    loadCharacters();
  }, []);

  return (
    <div className="characters-page">
      <div className="characters-page-background"></div>
      <h2>Liste des personnages</h2>
      {characters.length > 0 ? (
        <div className="card-container">
          {characters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      ) : (
        <p>Chargement des personnages...</p>
      )}
    </div>
  );
};

export default CharactersPage;
