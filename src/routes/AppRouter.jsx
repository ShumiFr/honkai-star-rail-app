import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CharactersPage from "./pages/CharactersPage";
import TeamBuilderPage from "./pages/TeamBuilderPage";
import TeamsPage from "./pages/TeamsPage";
import Header from "./components/Header";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/characters" component={CharactersPage} />
        <Route path="/team-builder" component={TeamBuilderPage} />
        <Route path="/teams" component={TeamsPage} />
      </Switch>
    </div>
  );
};

export default App;
