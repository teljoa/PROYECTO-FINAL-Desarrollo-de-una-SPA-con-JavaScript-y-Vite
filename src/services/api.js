const BASE_URL = "https://pokeapi.co/api/v2";

async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export async function getPokemons(offset = 0, limit = 20) {
  const url = `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`;
  return await fetchData(url);
}

export async function getPokemon(id) {
  const url = `${BASE_URL}/pokemon/${id}`;
  return await fetchData(url);
}

export async function getTypes() {
  const url = `${BASE_URL}/type`;
  return await fetchData(url);
}

export async function getPokemonsByType(typeName) {
  const url = `${BASE_URL}/type/${typeName}`;
  const data = await fetchData(url);

  return data.pokemon.map(p => ({
    name: p.pokemon.name,
    url: p.pokemon.url
  }));
}