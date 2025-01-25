const API_URL = "http://localhost:5000/api";

export const fetchCharacters = async () => {
  try {
    const response = await fetch(`${API_URL}/starrail/characters`);
    if (!response.ok)
      throw new Error("Erreur lors de la récupération des personnages.");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur API (personnages) :", error);
    return null;
  }
};
