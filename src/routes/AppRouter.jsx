import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CharactersPage from "../pages/CharactersPage";
import TeamBuilderPage from "../pages/TeamBuilderPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/team-builder" element={<TeamBuilderPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
