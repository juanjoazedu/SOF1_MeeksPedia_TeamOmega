import type { Character } from '../types/character';
import styles from '../styles/CharacterCard.module.css';

interface CharacterCardProps {
  character: Character;
  onSelect: (id: number) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export const CharacterCard = ({
  character,
  onSelect,
  isFavorite,
  onToggleFavorite,
}: CharacterCardProps) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(character.id);
  };

  return (
    <article className={styles.card} onClick={() => onSelect(character.id)}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={character.image} alt={character.name} />
        <button
          type="button"
          className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ''}`}
          onClick={handleFavoriteClick}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{character.name}</h3>
        <p className={styles.text}>State: {character.status}</p>
        <p className={styles.text}>Species: {character.species}</p>
        <p className={styles.text}>Gender: {character.gender}</p>
      </div>
    </article>
  );
};