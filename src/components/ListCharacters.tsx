import { useEffect, useState } from 'react';
import type { Character } from '../types/character';
import { getAllCharacters } from '../services/apiClient';
import { CharacterCard } from './CharacterCard';

export const ListCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    getAllCharacters(controller.signal)
      .then((data) => setCharacters(data.results))
      .catch(() => {});

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <section className="character-list">
      {characters.map((char) => (
        <CharacterCard key={char.id} character={char} />
      ))}
    </section>
  );
};