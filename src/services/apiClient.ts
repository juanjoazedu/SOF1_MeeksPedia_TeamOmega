import type { ApiResponse } from '../types/api';
import type { Character } from '../types/character';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const getAllCharacters = async (signal?: AbortSignal): Promise<ApiResponse<Character>> => {
  const response = await fetch(`${BASE_URL}/character`, { signal });

  if (!response.ok) {
    throw new Error('Error to fetch characters');
  }

  return response.json();
};
//const response = await fetch(`${BASE_URL}/character?name=${name}`, { signal });
export const getCharactersByName = async (name: string, signal?: AbortSignal): Promise<ApiResponse<Character>> => {
  const response = await fetch(`${BASE_URL}/character?name=${encodeURIComponent(name)}`, { signal });

  if (response.status === 404) {
    return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
  }

  if (!response.ok) {
    throw new Error('Error to fetch characters by name');
  }

  return response.json();
};

export const getCharacterById = async (id: number, signal?: AbortSignal): Promise<Character> => {
  const response = await fetch(`${BASE_URL}/character/${id}`, { signal });

  if (!response.ok) {
    throw new Error('Error to fetch character by id');
  }

  return response.json();
};