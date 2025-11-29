const STORAGE_KEY = "pokemon_user";

const mockUsers = [
  { username: "ash", password: "pikachu" },
  { username: "misty", password: "togepi" },
  { username: "brock", password: "onix" },
  { username: "admin", password: "1234" }
];

//Función que simula un login sin backend real.
export function login(username, password) {
  const user = mockUsers.find(
    u => u.username === username && u.password === password
  );

  if (!user) return false;

  localStorage.setItem(STORAGE_KEY, JSON.stringify({ username }));

  return true;
}

//Cierra la sesión del usuario eliminando su registro de localStorage.
export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

//Verifica si hay un usuario guardado en localStorage.
export function isLoggedIn() {
  return localStorage.getItem(STORAGE_KEY) !== null;
}

//Devuelve los datos del usuario actualmente logueado.
export function getCurrentUser() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}