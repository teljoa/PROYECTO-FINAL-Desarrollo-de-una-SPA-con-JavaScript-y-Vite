import { getPokemon } from "../services/api.js";
import Loader from "../components/Loader.js";

export default function PokemonDetails(params) {
  const container = document.createElement("div");
  container.className = "pokemon-details";

  container.appendChild(Loader());

  async function load() {
    const data = await getPokemon(params.id);

    container.innerHTML = `
      <h2>${data.name.toUpperCase()}</h2>
      <img src="${data.sprites.front_default}" alt="${data.name}">
      
      <h3>Tipos:</h3>
      <ul>
        ${data.types.map(t => `<li>${t.type.name}</li>`).join("")}
      </ul>

      <h3>Stats:</h3>
      <ul>
        ${data.stats.map(s => `<li>${s.stat.name}: ${s.base_stat}</li>`).join("")}
      </ul>

      <a class="btn" href="#/pokemons">Volver</a>
    `;
  }

  load();

  return container;
}