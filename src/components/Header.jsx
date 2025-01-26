import { Link } from "react-router-dom";
import "../styles/components/header.css";

const Header = () => {
  return (
    <header className="header">
      <Link className="header-link" to="/">
        Accueil
      </Link>
      <Link className="header-link" to="/characters">
        Personnages
      </Link>
      <Link className="header-link" to="/team-builder">
        Créateur d&apos;équipe
      </Link>
      <Link className="header-link" to="/teams">
        Équipes
      </Link>
    </header>
  );
};

export default Header;
