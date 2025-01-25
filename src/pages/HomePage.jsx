import { useState, useEffect } from "react";
import { fetchCharacters } from "../services/api";
import CharacterCard from "../components/CharacterCard";
import "../styles/styles.css";

const HomePage = () => {
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
    <div className="home-page">
      <h1>Bienvenue sur mon projet React !</h1>
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

export default HomePage;
