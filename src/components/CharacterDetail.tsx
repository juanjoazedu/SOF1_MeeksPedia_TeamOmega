import { useEffect, useState } from 'react';
import type { Character } from '../types/character';
import { getCharacterById } from '../services/apiClient';
import { StatusMessage } from './StatusMessage';
import styles from '../styles/CharacterDetail.module.css';

interface CharacterDetailProps {
  id: number;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export const CharacterDetail = ({
  id,
  onBack,
  isFavorite,
  onToggleFavorite,
}: CharacterDetailProps) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCharacter = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getCharacterById(id, controller.signal);
        setCharacter(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError('The character details could not be loaded. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();

    return () => {
      controller.abort();
    };
  }, [id]);

  return (
    <section className={styles.container}>
      <button className={styles.backButton} onClick={onBack}>
        ← Back to list
      </button>

      {loading && <StatusMessage type="loading" message="Loading character..." />}

      {error && !loading && <StatusMessage type="error" message={error} />}

      {!loading && !error && character && (
        <article className={styles.detail}>
          <div className={styles.imageContainer}>
            <img className={styles.image} src={character.image} alt={character.name} />
            <button
              type="button"
              className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ''}`}
              onClick={() => onToggleFavorite(character.id)}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? '★' : '☆'}
            </button>
          </div>

          <div className={styles.info}>
            <h2 className={styles.title}>{character.name}</h2>
            <p className={styles.text}>Status: {character.status}</p>
            <p className={styles.text}>Species: {character.species}</p>
            <p className={styles.text}>Gender: {character.gender}</p>
            <p className={styles.text}>Origin: {character.origin.name}</p>
            <p className={styles.text}>Location: {character.location.name}</p>

            {character.type && <p className={styles.text}>Type: {character.type}</p>}
            <p className={styles.text}>Episodes appeared in: {character.episode.length}</p>
            <p className={styles.text}>
              Added to the API on: {new Date(character.created).toLocaleDateString()}
            </p>
          </div>
        </article>
      )}
    </section>
  );
};