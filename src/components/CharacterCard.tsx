import type { Character } from '../types/character';
import styles from '../styles/CharacterCard.module.css';

interface CharacterCardProps {
  character: Character;
  onSelect: (id: number) => void;
}

export const CharacterCard = ({ character, onSelect }: CharacterCardProps) => {
  return (
    <article className={styles.card} onClick={() => onSelect(character.id)}>
      <img className={styles.image} src={character.image} alt={character.name} />
      <div className={styles.content}>
        <h3 className={styles.title}>{character.name}</h3>
        <p className={styles.text}>State: {character.status}</p>
        <p className={styles.text}>Species: {character.species}</p>
        <p className={styles.text}>Gender: {character.gender}</p>
      </div>
    </article>
  );
};