//Crea un elemento con clases y contenido opcional. 
export function createElement(tag, className = "", html = "") {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (html) el.innerHTML = html;
  return el;
}

//Limpia completamente un elemento.
export function clear(element) {
  if (element) element.innerHTML = "";
}

//Inserta varios nodos dentro de un elemento.
export function appendAll(parent, children = []) {
  children.forEach(child => parent.appendChild(child));
}

//Crea un texto estilizado de error.
export function errorMessage(msg = "Error al cargar datos") {
  const div = document.createElement("div");
  div.style.color = "red";
  div.style.padding = "10px";
  div.innerText = msg;
  return div;
}