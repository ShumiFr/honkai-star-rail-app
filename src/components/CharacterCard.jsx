/* eslint-disable react/prop-types */
import "../styles/styles.css";

const CharacterCard = ({ character }) => {
  return (
    <div className="card">
      <div className="card-header">
        <img
          className="card-image"
          src={character.image}
          alt={`${character.name} - Image`}
        />
      </div>
      <div className="card-body">
        <h3 className="card-title">{character.name}</h3>
        <p className="card-description">{character.description}</p>
        <div className="combat-type">
          <span className="combat-type-title">Type de combat :</span>
          <span className="combat-type-name">{character.combatType.name}</span>
        </div>
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
