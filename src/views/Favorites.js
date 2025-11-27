import PokemonCard from "../components/PokemonCard.js";

export default function Favorites() {
  const container = document.createElement("div");
  container.className = "favorites";

  container.innerHTML = "<h2>Favoritos</h2>";

  const list = document.createElement("div");
  list.className = "grid";
  container.appendChild(list);

  const favs = JSON.parse(localStorage.getItem("favorites") || "[]");

  if (favs.length === 0) {
    container.innerHTML += "<p>No tienes Pokémon favoritos aún.</p>";
    return container;
  }

  favs.forEach(p => list.appendChild(PokemonCard(p)));

  return container;
}