import { useState, useEffect } from 'react';
import { ListCharacters } from './components/ListCharacters';
import { CharacterDetail } from './components/CharacterDetail';
import styles from './styles/MeeksPediaApp.module.css';

export const MeeksPediaApp = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);

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
        <button
          className={`${styles.favoriteBadge} ${showFavoritesOnly ? styles.activeBadge : ''}`}
          onClick={() => setShowFavoritesOnly((prev) => !prev)}
          title={showFavoritesOnly ? 'Show all characters' : 'Show favorite characters'}
        >
          ⭐ Favorites: <strong>{favorites.length}</strong>
        </button>
      </header>

      {selectedId === null ? (
        <ListCharacters
          onSelectCharacter={setSelectedId}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          showFavoritesOnly={showFavoritesOnly}
        />
      ) : (
        <CharacterDetail id={selectedId} onBack={() => setSelectedId(null)} />
      )}
    </>
  );
};