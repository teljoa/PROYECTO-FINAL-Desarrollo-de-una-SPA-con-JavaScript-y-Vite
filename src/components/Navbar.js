export default function Navbar() {
  const nav = document.createElement("nav");

  nav.innerHTML = `
    <h1>Pokédex SPA</h1>

    <div>
      <a href="#/">Inicio</a>
      <a href="#/pokemons">Pokémons</a>
      <a href="#/favorites">Favoritos</a>
      <a href="#/login">Login</a>
    </div>
  `;

  return nav;
}