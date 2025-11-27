import { login, isLoggedIn } from "../services/auth.js";

export default function Login() {
  const container = document.createElement("div");
  container.className = "login";

  if (isLoggedIn()) {
    container.innerHTML = `<p>Ya estás logueado.</p>`;
    return container;
  }

  container.innerHTML = `
    <h2>Iniciar Sesión</h2>
    <form id="loginForm">
      <input type="text" id="username" placeholder="Usuario" required />
      <input type="password" id="password" placeholder="Contraseña" required />
      <button type="submit" class="btn">Entrar</button>
    </form>
  `;

  container.querySelector("#loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const username = container.querySelector("#username").value;
    const password = container.querySelector("#password").value;

    const ok = login(username, password);

    if (!ok) {
      alert("Usuario o contraseña incorrectos");
      return;
    }

    window.location.hash = "#/";
  });

  return container;
}