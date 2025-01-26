import "../styles/components/header.css";

const Header = () => {
  return (
    <header className="header">
      <a className="header-link" href="/">
        Accueil
      </a>
      <a className="header-link" href="/characters">
        Personnages
      </a>
      <a className="header-link" href="/team-builder">
        Créateur d&apos;équipe
      </a>
      <a className="header-link" href="/teams">
        Équipes
      </a>
    </header>
  );
};

export default Header;
