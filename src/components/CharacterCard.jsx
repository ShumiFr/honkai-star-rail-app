/* eslint-disable react/prop-types */
import "../styles/components/CharacterCard.css";
import notFoundImage from "../assets/not-found.png";

const CharacterCard = ({ character }) => {
  const rarityClass = character.stars === 5 ? "rarity-5" : "rarity-4";

  const handleImageError = (e) => {
    e.target.src = notFoundImage;
    e.target.className = "card-image not-found-image";
  };

  const handleIconError = (e) => {
    e.target.src = notFoundImage;
    e.target.className = "combat-type-icon not-found-icon";
  };

  return (
    <div className={`card ${rarityClass}`}>
      <div className="card-content">
        <img
          className="card-image"
          src={character.image}
          alt={`${character.name} - Image`}
          onError={handleImageError}
        />
      </div>
      <div className="card-body">
        <h3 className="card-title">{character.name}</h3>
      </div>
      <div className="card-combat-type">
        {character.combatType.icon && (
          <img
            className="combat-type-icon"
            src={character.combatType.icon}
            alt={`${character.combatType.name} Icon`}
            onError={handleIconError}
          />
        )}
      </div>
    </div>
  );
};

export default CharacterCard;
