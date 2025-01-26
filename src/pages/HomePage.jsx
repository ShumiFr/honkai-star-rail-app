import { useState, useEffect } from "react";
import "../styles/pages/homePage.css";

const HomePage = () => {
  const [uid, setUid] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Charger l'UID depuis le localStorage lorsque la page se charge
    const savedUid = localStorage.getItem("userUID");
    if (savedUid) {
      setUid(savedUid);
      fetchUser(savedUid);
    }
  }, []);

  const handleUidChange = (event) => {
    const newUid = event.target.value;
    setUid(newUid);
    // Sauvegarder l'UID dans le localStorage
    localStorage.setItem("userUID", newUid);
    fetchUser(newUid);
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
        setUserName(data.nickname);
      } else {
        setUserName("");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données utilisateur :",
        error
      );
      setUserName("");
    }
  };

  return (
    <div className="home-page">
      <div className="welcome-container">
        <h1>Bienvenue !</h1>
        {userName ? (
          <h2>Utilisateur : {userName}</h2>
        ) : (
          <>
            <p>
              Veuillez entrer votre UID Honkai Star Rail pour vous connecter à
              votre compte.
            </p>
            <div className="uid-input">
              <label htmlFor="uid">Entrez votre UID :</label>
              <input
                type="text"
                id="uid"
                value={uid}
                onChange={handleUidChange}
              />
            </div>
          </>
        )}
        <p>
          Cette application sert principalement à créer et enregistrer ses
          équipes pour le jeu.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
