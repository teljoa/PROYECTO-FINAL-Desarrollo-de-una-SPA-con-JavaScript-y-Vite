//Guarda un valor en localStorage convirtiéndolo a JSON.
export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

//Obtiene un valor desde localStorage y lo parsea desde JSON.
export function load(key, defaultValue = null) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
}

//Elimina un elemento de localStorage.
export function remove(key) {
  localStorage.removeItem(key);
}

//Agrega un elemento a una lista almacenada en localStorage.
export function pushToList(key, item) {
  const list = load(key, []);
  list.push(item);
  save(key, list);
}

//Elimina un elemento de una lista usando un callback como filtro.
export function removeFromList(key, filterFn) {
  const list = load(key, []);
  const newList = list.filter(filterFn);
  save(key, newList);
}

//Verifica si un ítem existe dentro de una lista.
export function existsInList(key, checkFn) {
  const list = load(key, []);
  return list.some(checkFn);
}