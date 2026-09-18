import type { Character } from '../types/character';
import styles from '../styles/CharacterCard.module.css';

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <article className={styles.card}>
      <img className={styles.image} src={character.image} alt={character.name} />
      <div className={styles.content}>
        <h3 className={styles.title}>{character.name}</h3>
        <p className={styles.text}>State: {character.status}</p>
        <p className={styles.text}>Species: {character.species}</p>
        <p className={styles.text}>Gender: {character.gender}</p>
        <p className={styles.text}>Origin: {character.origin.name}</p>
        <p className={styles.text}>Location: {character.location.name}</p>
      </div>
    </article>
  );
};