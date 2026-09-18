import { useEffect, useState } from 'react';
import type { Character } from '../types/character';
import { getAllCharacters } from '../services/apiClient';
import { CharacterCard } from './CharacterCard';
import { StatusMessage } from './StatusMessage';

export const ListCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getAllCharacters(controller.signal);
        setCharacters(data.results);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError('The characters could not be loaded. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <StatusMessage type="loading" message="Loading characters..." />;
  }

  if (error) {
    return <StatusMessage type="error" message={error} />;
  }

    if (characters.length === 0) {
    return <StatusMessage type="empty" message="No characters were found." />;
  }

  return (
    <section className="character-list">
      {characters.map((char) => (
        <CharacterCard key={char.id} character={char} />
      ))}
    </section>
  );
};