export default function Home() {
  const container = document.createElement("div");
  container.className = "home";

  container.innerHTML = `
    <h1>Enciclopedia Pokémon</h1>
    <p>Explora, busca y guarda tus Pokémon favoritos.</p>
    <a class="btn" href="#/pokemons">Ver Pokémons</a>
  `;

  return container;
}