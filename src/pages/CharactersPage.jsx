/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { fetchCharacters } from "../services/api";
import CharacterCard from "../components/CharacterCard";
import "../styles/pages/charactersPage.css";

const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [uid, setUid] = useState("");
  const [nickname, setNickname] = useState("");

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

  const replaceNickname = (name) => {
    return name.replace("{NICKNAME}", nickname);
  };

  return (
    <div className="characters-page">
      <div className="characters-page-background"></div>
      <h2>Liste des personnages</h2>
      {characters.length > 0 ? (
        <div className="card-container">
          {characters.map((char) => (
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
