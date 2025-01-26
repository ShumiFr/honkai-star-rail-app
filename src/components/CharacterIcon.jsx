/* eslint-disable react/prop-types */
import notFoundImage from "../assets/not-found.png";

const CharacterIcon = ({ character, onClick, inBuilder }) => {
  const rarityClass = character.stars === 5 ? "rarity-5" : "rarity-4";

  const handleIconError = (e) => {
    e.target.src = notFoundImage;
  };

  return (
    <div className={`character-icon ${rarityClass}`} onClick={onClick}>
      <img
        className={`${
          inBuilder ? "character-icon-container" : "character-icon"
        } ${rarityClass}`}
        src={character.icon}
        alt={`${character.name} - Icon`}
        onError={handleIconError}
      />
      <div className="character-icon-overlay">
        {character.combatType.icon && (
          <img
            className="character-combat-type-icon"
            src={character.combatType.icon}
            alt={`${character.combatType.name} Icon`}
            onError={handleIconError}
          />
        )}
      </div>
    </div>
  );
};

export default CharacterIcon;
