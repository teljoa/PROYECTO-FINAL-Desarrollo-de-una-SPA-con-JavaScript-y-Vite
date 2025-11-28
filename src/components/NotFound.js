export default function NotFound() {
  const div = document.createElement("div");
  div.className = "center";

  div.innerHTML = `
    <h2>404 - Página no encontrada</h2>
    <p>La ruta que intentas visitar no existe.</p>
    <a class="btn" href="#/">Volver al inicio</a>
  `;

  return div;
}