import type { ApiResponse } from '../types/api';
import type { Character } from '../types/character';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const getAllCharacters = async (signal?: AbortSignal): Promise<ApiResponse<Character>> => {
  const response = await fetch(`${BASE_URL}/character`, { signal });
  if (!response.ok) {
    throw new Error('Error fetching characters');
  }
  return response.json();
};