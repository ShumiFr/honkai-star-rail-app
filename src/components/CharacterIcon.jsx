/* eslint-disable react/prop-types */
const CharacterIcon = ({ character, onClick, inBuilder }) => {
  const rarityClass = character.stars === 5 ? "rarity-5" : "rarity-4";

  return (
    <div className="character-icon" onClick={onClick}>
      <img
        className={`${
          inBuilder ? "character-icon-container" : "character-icon"
        } ${rarityClass}`}
        src={character.icon}
        alt={`${character.name} - Icon`}
      />
    </div>
  );
};

export default CharacterIcon;
