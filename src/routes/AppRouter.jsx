import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CharactersPage from "../pages/CharactersPage";
import TeamBuilderPage from "../pages/TeamBuilderPage";
import TeamsPage from "../pages/TeamsPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/team-builder" element={<TeamBuilderPage />} />
        <Route path="/teams" element={<TeamsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
