export default function PokemonCard(pokemon) {
  const card = document.createElement("div");
  card.className = "pokemon-card";

  const id = pokemon.url.split("/").filter(Boolean).pop();

  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  card.innerHTML = `
    <img src="${imgUrl}" alt="${pokemon.name}">
    <h3>${pokemon.name.toUpperCase()}</h3>
  `;

  card.addEventListener("click", () => {
    window.location.hash = `#/pokemon/${id}`;
  });

  return card;
}