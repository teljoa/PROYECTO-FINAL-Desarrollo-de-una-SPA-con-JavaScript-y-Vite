import { getPokemons, getTypes, getPokemonsByType } from "../services/api.js";
import PokemonCard from "../components/PokemonCard.js";
import Loader from "../components/Loader.js";

// VISTA DE LISTADO DE POKÉMONS
export default function Pokemons() {
  const container = document.createElement("div");
  container.className = "pokemon-list center";

  let offset = 0;
  const limit = 20;

  let allPokemonsCache = null; 

  container.appendChild(Loader());

  // Carga inicial
  async function loadPokemons() {
    container.innerHTML = `
    <h2>Pokémons</h2>
    <input id="searchInput" class="search" placeholder="Buscar por nombre...">
    <div id="filters" class="filters"></div>
    <div id="list" class="grid"></div>
    <div class="btn-group">
      <button id="scrollTop" class="btn btn-secondary">Volver arriba</button>
      <button id="loadMore" class="btn">Cargar más</button>
    </div>
    `;

    const list = container.querySelector("#list");
    const loadMore = container.querySelector("#loadMore");
    const btnTop = container.querySelector("#scrollTop");
    const searchInput = container.querySelector("#searchInput");

    renderFilters();

    const data = await getPokemons(offset, limit);
    renderPokemons(data.results);

    // Botón cargar más
    loadMore.addEventListener("click", async () => {
      offset += limit;
      const more = await getPokemons(offset, limit);
      renderPokemons(more.results);
    });

    // Volver arriba
    btnTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Buscar por nombre
    searchInput.addEventListener("input", () => applyFilters());
  }

  // Filtros : Tipo + Generación + Nombre
  async function renderFilters() {
    const filters = container.querySelector("#filters");
    const types = await getTypes();

    filters.innerHTML = `
      <div class="filter-box">
        <label>Tipo:</label>
        <select id="typeFilter">
          <option value="">Todos</option>
          ${types.results.map(t => `<option value="${t.name}">${t.name}</option>`).join("")}
        </select>
      </div>

      <div class="filter-box">
        <label>Generación:</label>
        <select id="genFilter">
          <option value="">Todas</option>
          <option value="1">Gen 1 (1–151)</option>
          <option value="2">Gen 2 (152–251)</option>
          <option value="3">Gen 3 (252–386)</option>
          <option value="4">Gen 4 (387–493)</option>
          <option value="5">Gen 5 (494–649)</option>
          <option value="6">Gen 6 (650–721)</option>
          <option value="7">Gen 7 (722–809)</option>
          <option value="8">Gen 8 (810–905)</option>
          <option value="9">Gen 9 (906–1025)</option>
        </select>
      </div>
    `;

    filters.querySelector("#typeFilter").addEventListener("change", applyFilters);
    filters.querySelector("#genFilter").addEventListener("change", applyFilters);
  }

  // APLICACIÓN DE FILTROS
  async function applyFilters() {
    const list = container.querySelector("#list");
    const type = document.querySelector("#typeFilter").value;
    const gen = document.querySelector("#genFilter").value;
    const search = document.querySelector("#searchInput").value.toLowerCase();

    list.innerHTML = "";

    let pokemons = [];

    //Obtener lista completa si no está en cache
    if (!allPokemonsCache) {
      const fullData = await getPokemons(0, 1025);
      allPokemonsCache = fullData.results;
    }

    pokemons = [...allPokemonsCache];

    //Filtrar por tipo
    if (type) {
      const byType = await getPokemonsByType(type);
      pokemons = pokemons.filter(p => byType.some(t => t.name === p.name));
    }

    //Filtrar por generación
    if (gen) {
      const ranges = {
        1: [1, 151],
        2: [152, 251],
        3: [252, 386],
        4: [387, 493],
        5: [494, 649],
        6: [650, 721],
        7: [722, 809],
        8: [810, 905],
        9: [906, 1025]
      };

      const [min, max] = ranges[gen];

      pokemons = pokemons.filter(p => {
        const id = p.url.split("/").filter(Boolean).pop();
        return id >= min && id <= max;
      });
    }

    //Filtro por nombre
    if (search.trim() !== "") {
      pokemons = pokemons.filter(p =>
        p.name.toLowerCase().includes(search)
      );
    }

    //Pintar resultados
    pokemons.forEach(p => list.appendChild(PokemonCard(p)));
  }

  // Render cards normales
  function renderPokemons(list) {
    const grid = container.querySelector("#list");
    for (const p of list) grid.appendChild(PokemonCard(p));
  }

  loadPokemons();
  return container;
}