const STORAGE_KEY = "pokemon_user";

export function login(username, password) {
  const user = mockUsers.find(
    u => u.username === username && u.password === password
  );

  if (!user) return false;

  localStorage.setItem(STORAGE_KEY, JSON.stringify({ username }));

  return true;
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

export function isLoggedIn() {
  return localStorage.getItem(STORAGE_KEY) !== null;
}

export function getCurrentUser() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}