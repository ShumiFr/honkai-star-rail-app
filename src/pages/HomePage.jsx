import { useState } from "react";
import { fetchData } from "../services/api";

const HomePage = () => {
  const [data, setData] = useState(null);

  const handleFetchData = async () => {
    const result = await fetchData();
    setData(result);
  };

  return (
    <div>
      <h1>Bienvenue sur mon projet React !</h1>
      <button onClick={handleFetchData}>Récupérer les données</button>
      {data && <p>{data.message}</p>}
    </div>
  );
};

export default HomePage;
