import { useEffect, useState } from 'react';
import type { Character } from '../types/character';
import { getAllCharacters, getCharactersByName } from '../services/apiClient';
import { CharacterCard } from './CharacterCard';
import { StatusMessage } from './StatusMessage';
import styles from './styles/ListCharacters.module.css';

interface ListCharactersProps {
  onSelectCharacter: (id: number) => void;
}

export const ListCharacters = ({ onSelectCharacter }: ListCharactersProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const data = searchTerm.trim()
          ? await getCharactersByName(searchTerm.trim(), controller.signal)
          : await getAllCharacters(controller.signal);

        setCharacters(data.results);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError('The characters could not be loaded. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchTerm]);

  return (
    <section className={styles.container}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search character..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <StatusMessage type="loading" message="Loading characters..." />}

      {error && !loading && <StatusMessage type="error" message={error} />}

      {!loading && !error && characters.length === 0 && (
        <StatusMessage type="empty" message="No characters were found." />
      )}

      {!loading && !error && characters.length > 0 && (
        <div className={styles.grid}>
          {characters.map((char) => (
            <CharacterCard key={char.id} character={char} onSelect={onSelectCharacter} />
          ))}
        </div>
      )}
    </section>
  );
};