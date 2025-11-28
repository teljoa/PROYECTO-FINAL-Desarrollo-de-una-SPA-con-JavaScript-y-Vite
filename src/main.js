import "./css/style.css";
import { initRouter } from "./router/router.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";

document.addEventListener("DOMContentLoaded", () => {
  
  const nav = document.getElementById("navbar");
  nav.appendChild(Navbar());

  const footer = document.getElementById("footer");
  footer.appendChild(Footer());

  initRouter();
});