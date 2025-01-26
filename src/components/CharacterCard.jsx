/* eslint-disable react/prop-types */
import "../styles/components/CharacterCard.css";

const CharacterCard = ({ character }) => {
  const rarityClass = character.stars === 5 ? "rarity-5" : "rarity-4";

  return (
    <div className={`card ${rarityClass}`}>
      <div className="card-content">
        <img
          className="card-image"
          src={character.image}
          alt={`${character.name} - Image`}
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
          />
        )}
      </div>
    </div>
  );
};

export default CharacterCard;
