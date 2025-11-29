import { existsInList, pushToList, removeFromList } from "../utils/storage.js";

const FAVORITES_KEY = "favorites";

export default function PokemonCard(pokemon) {
  const card = document.createElement("div");
  card.className = "pokemon-card";

  const id = pokemon.url.split("/").filter(Boolean).pop();
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  let isFav = existsInList(FAVORITES_KEY, p => p.id == id);

  card.innerHTML = `
    <div class="fav-icon ${isFav ? "fav" : ""}">★</div>
    <img src="${imgUrl}" alt="${pokemon.name}">
    <h3>${pokemon.name.toUpperCase()}</h3>
  `;

  card.addEventListener("click", () => {
    window.location.hash = `#/pokemon/${id}`;
  });

  const favBtn = card.querySelector(".fav-icon");
  
  favBtn.addEventListener("click", (e) => {
    e.stopPropagation(); 

    isFav = !isFav; 

    if (isFav) {
      pushToList(FAVORITES_KEY, { id, name: pokemon.name, url: pokemon.url });
      favBtn.classList.add("fav");
    } else {
      removeFromList(FAVORITES_KEY, item => item.id != id);
      favBtn.classList.remove("fav");
    }
  });

  return card;
}