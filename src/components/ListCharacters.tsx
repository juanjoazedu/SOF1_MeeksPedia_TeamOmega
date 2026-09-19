import { useEffect, useState } from 'react';
import type { Character } from '../types/character';
import { getAllCharacters, getCharactersByName, getMultipleCharacters } from '../services/apiClient';
import { CharacterCard } from './CharacterCard';
import { StatusMessage } from './StatusMessage';
import styles from '../styles/ListCharacters.module.css';

interface ListCharactersProps {
  onSelectCharacter: (id: number) => void;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  showFavoritesOnly: boolean;
}

export const ListCharacters = ({
  onSelectCharacter,
  favorites,
  onToggleFavorite,
  showFavoritesOnly,
}: ListCharactersProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  const handleRetry = () => setRetryCount((prev) => prev + 1);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (showFavoritesOnly) {
          if (favorites.length === 0) {
            setCharacters([]);
            setLoading(false);
            return;
          }

          const data = await getMultipleCharacters(favorites, controller.signal);
          const filtered = searchTerm.trim()
            ? data.filter((c) => c.name.toLowerCase().includes(searchTerm.trim().toLowerCase()))
            : data;

          setCharacters(filtered);
        } else {
          const data = searchTerm.trim()
            ? await getCharactersByName(searchTerm.trim(), controller.signal)
            : await getAllCharacters(controller.signal);

          setCharacters(data.results);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError('The characters could not be loaded. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchData, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchTerm, showFavoritesOnly, favorites, retryCount]);

  return (
    <section className={styles.container}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder={showFavoritesOnly ? 'Search in favorites...' : 'Search character...'}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <StatusMessage type="loading" message="Loading characters..." />}

      {error && !loading && <StatusMessage type="error" message={error} onRetry={handleRetry} />}

      {!loading && !error && characters.length === 0 && (
        <StatusMessage
          type="empty"
          message={showFavoritesOnly ? 'No favorite characters found.' : 'No characters were found.'}
        />
      )}

      {!loading && !error && characters.length > 0 && (
        <div className={styles.grid}>
          {characters.map((char) => (
            <CharacterCard
              key={char.id}
              character={char}
              onSelect={onSelectCharacter}
              isFavorite={favorites.includes(char.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  );
};