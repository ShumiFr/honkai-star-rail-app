import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/components/header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <button className="menu-button" onClick={toggleMenu}>
        Menu
      </button>
      <nav className={`side-menu ${isMenuOpen ? "open" : ""}`}>
        <button className="close-button" onClick={toggleMenu}>
          &times;
        </button>
        <Link className="header-link" to="/" onClick={toggleMenu}>
          Accueil
        </Link>
        <Link className="header-link" to="/characters" onClick={toggleMenu}>
          Personnages
        </Link>
        <Link className="header-link" to="/team-builder" onClick={toggleMenu}>
          Créateur d&apos;équipe
        </Link>
        <Link className="header-link" to="/teams" onClick={toggleMenu}>
          Équipes
        </Link>
      </nav>
    </header>
  );
};

export default Header;
