import type { Character } from '../types/character';

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <article className="character-card">
      <img src={character.image} alt={character.name} />
      <div>
        <h3>{character.name}</h3>
        <p>State: {character.status}</p>
        <p>Species: {character.species}</p>
        <p>Gender: {character.gender}</p>
        <p>Origin: {character.origin.name}</p>
        <p>Location: {character.location.name}</p>
      </div>
    </article>
  );
};