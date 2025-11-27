import "./css/style.css"; 
import { initRouter } from "./router/router.js";  
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";

document.addEventListener("DOMContentLoaded", () => {
  
  const app = document.getElementById("app");
  app.innerHTML = "";
  app.appendChild(Navbar());


  const main = document.createElement("main");
  main.id = "view";
  app.appendChild(main);
  app.appendChild(Footer());

  initRouter();
});