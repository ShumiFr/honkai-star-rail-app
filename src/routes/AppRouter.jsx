import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CharactersPage from "../pages/CharactersPage";
import TeamBuilderPage from "../pages/TeamBuilderPage";
import TeamsPage from "../pages/TeamsPage";
import Header from "../components/Header";

const AppRouter = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/team-builder" element={<TeamBuilderPage />} />
        <Route path="/teams" element={<TeamsPage />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
