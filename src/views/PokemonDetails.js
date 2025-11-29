import { getPokemon } from "../services/api.js";
//import { isFavorite, toggleFavorite } from "../utils/Favorites.js";
import Loader from "../components/Loader.js";

export default function PokemonDetails(params) {
  const container = document.createElement("div");
  container.className = "pokemon-details center";

  container.appendChild(Loader());

  async function load() {
    const data = await getPokemon(params.id);
    const fav = isFavorite(params.id);

    container.innerHTML = `
      <h2>
        ${data.name.toUpperCase()}
        <span id="favBtn" class="fav-icon ${fav ? "fav" : ""}">★</span>
      </h2>

      <div class="details-wrapper">
        <div class="details-left">
          <img src="${data.sprites.front_default}" alt="${data.name}">
        </div>

        <div class="details-right">
          <h3>Tipos:</h3>
          <ul>
            ${data.types.map(t => `<li>${t.type.name}</li>`).join("")}
          </ul>

          <h3>Stats:</h3>
          <ul>
            ${data.stats.map(s => `<li>${s.stat.name}: ${s.base_stat}</li>`).join("")}
          </ul>
        </div>
      </div>

      <a class="btn back-btn" href="#/pokemons">Volver</a>
    `;

    const favBtn = container.querySelector("#favBtn");

    favBtn.addEventListener("click", () => {
      toggleFavorite(params.id);
      favBtn.classList.toggle("fav");
    });
  }

  load();

  return container;
}
