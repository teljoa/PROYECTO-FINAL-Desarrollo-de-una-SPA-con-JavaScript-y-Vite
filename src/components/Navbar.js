export default function Navbar() {
  const nav = document.createElement("nav");
  nav.className = "navbar";

  nav.innerHTML = `
    <div class="nav-logo">
      <img src="./src/assets/Logo.png" alt="Logo Pokémon">
      <span>Pokédex JSVite</span>
    </div>

    <div class="nav-links">
      <a href="#/">Inicio</a>
      <a href="#/pokemons">Pokémons</a>
      <a href="#/favorites">Favoritos</a>
      <a href="#/login">Login</a>
    </div>
  `;

  return nav;
}