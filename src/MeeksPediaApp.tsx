import { useState, useEffect } from 'react';
import { ListCharacters } from './components/ListCharacters';
import { CharacterDetail } from './components/CharacterDetail';
import styles from './styles/MeeksPediaApp.module.css';

export const MeeksPediaApp = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('meekspedia_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('meekspedia_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>MeeksPedia</h1>
        <div className={styles.favoriteBadge}>
          ⭐ Favorites: <strong>{favorites.length}</strong>
        </div>
      </header>

      {selectedId === null ? (
        <ListCharacters
          onSelectCharacter={setSelectedId}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      ) : (
        <CharacterDetail id={selectedId} onBack={() => setSelectedId(null)} />
      )}
    </>
  );
};