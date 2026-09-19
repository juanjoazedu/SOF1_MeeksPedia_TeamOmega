import { useState } from 'react';
import { ListCharacters } from './components/ListCharacters';
import { CharacterDetail } from './components/CharacterDetail';

export const MeeksPediaApp = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <>
        <h1>MeeksPedia</h1>
        {selectedId === null ? (
            <ListCharacters onSelectCharacter={setSelectedId} />
        ) : (
            <CharacterDetail id={selectedId} onBack={() => setSelectedId(null)} />
        )}
        </>
    );
}