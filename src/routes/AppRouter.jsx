import { Switch, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CharactersPage from "../pages/CharactersPage";
import TeamBuilderPage from "../pages/TeamBuilderPage";
import TeamsPage from "../pages/TeamsPage";
import Header from "../components/Header";

const AppRouter = () => {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/team-builder" element={<TeamBuilderPage />} />
        <Route path="/teams" element={<TeamsPage />} />
      </Switch>
    </div>
  );
};

export default AppRouter;
