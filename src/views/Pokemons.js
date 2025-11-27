import { getPokemons, getTypes, getPokemonsByType } from "../services/api.js";
import PokemonCard from "../components/PokemonCard.js";
import Loader from "../components/Loader.js";

//Listado de pokemons
export default function Pokemons() {
  const container = document.createElement("div");
  container.className = "pokemon-list";

  let offset = 0;
  const limit = 20;

  container.appendChild(Loader());

  //Funcion estructural
  async function loadPokemons() {
    container.innerHTML = `
      <h2>Pokémons</h2>
      <div id="filters"></div>
      <div id="list" class="grid"></div>
      <button id="loadMore" class="btn">Cargar más</button>
    `;

    const list = container.querySelector("#list");
    const loadMore = container.querySelector("#loadMore");

    renderTypes();

    const data = await getPokemons(offset, limit);
    renderPokemons(data.results);

    loadMore.addEventListener("click", async () => {
      offset += limit;
      const more = await getPokemons(offset, limit);
      renderPokemons(more.results);
    });
  }

  //Funcion filtral por tipos
  async function renderTypes() {
    const filters = container.querySelector("#filters");
    const types = await getTypes();

    filters.innerHTML = `
      <label>Filtrar por tipo:</label>
      <select id="typeFilter">
        <option value="">Todos</option>
        ${types.results.map(t => `<option value="${t.name}">${t.name}</option>`).join("")}
      </select>
    `;

    filters.querySelector("#typeFilter").addEventListener("change", async (e) => {
      const type = e.target.value;
      const list = container.querySelector("#list");

      list.innerHTML = "";

      if (!type) {
        offset = 0;
        const data = await getPokemons(offset, limit);
        renderPokemons(data.results);
        return;
      }

      const pokemonList = await getPokemonsByType(type);
      pokemonList.forEach(p => list.appendChild(PokemonCard(p)));
    });
  }

  //Funcion que recibe la lista de pokemons y los mete en las cards
  async function renderPokemons(list) {
    const grid = container.querySelector("#list");

    for (const p of list) {
      grid.appendChild(PokemonCard(p));
    }
  }

  loadPokemons();

  return container;
}