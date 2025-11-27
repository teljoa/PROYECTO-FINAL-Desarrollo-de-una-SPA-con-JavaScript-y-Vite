import Home from "../views/Home.js";
import Login from "../views/Login.js";
import Pokemons from "../views/Pokemons.js";
import PokemonDetails from "../views/PokemonDetails.js";
import Favorites from "../views/Favorites.js";
import NotFound from "../components/NotFound.js";

const routes = {
  "/": Home,
  "/login": Login,
  "/pokemons": Pokemons,
  "/pokemon/:id": PokemonDetails,
  "/favorites": Favorites
};

//Inicializa las rutas
export function initRouter() {
  window.addEventListener("hashchange", () => router());
  router(); 
}

//Dectertar rutas dinamicas
function parseRoute(hash) {
  const cleanHash = hash.replace("#", "") || "/";
  const routeParts = cleanHash.split("/").filter(Boolean);

  if (routeParts[0] === "pokemon" && routeParts[1]) {
    return {
      path: "/pokemon/:id",
      params: { id: routeParts[1] }
    };
  }

  return {
    path: cleanHash,
    params: {}
  };
}

//Si la ruta no existe, te mando a 404
function router() {
  const hash = window.location.hash || "#/";
  const { path, params } = parseRoute(hash);
  const viewFunction = routes[path] || NotFound;
  const app = document.getElementById("app");
  app.innerHTML = "";
  app.appendChild(viewFunction(params));
}