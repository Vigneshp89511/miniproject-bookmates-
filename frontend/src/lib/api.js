import axios from 'axios';

const API_BASE_URL =
  window.location.hostname.includes("localhost")
    ? "http://localhost:4000/api"
    : "https://bookmates-31ak.onrender.com/api";
    
const TOKEN_STORAGE_KEY = 'token';
const USER_STORAGE_KEY = 'bookmates_user';

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token);
  else localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY) || '';
}

export function setUser(user) {
  if (user) localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  else localStorage.removeItem(USER_STORAGE_KEY);
}

export function getUser() {
  const raw = localStorage.getItem(USER_STORAGE_KEY);
  try { return raw ? JSON.parse(raw) : null; } catch { return null; }
}

export function logout() {
  setToken('');
  setUser(null);
}

export const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function signup({ name, email, password, accountType, favoriteGenre }) {
  const { data } = await api.post('/signup', { name, email, password, accountType, favoriteGenre });
  return data;
}

export async function login({ email, password }) {
  const { data } = await api.post('/login', { email, password });
  return data;
}

export async function getReaderProfile() {
  const { data } = await api.get('/reader/profile');
  return data;
}

export async function searchReaderBooks(query = '') {
  const { data } = await api.get('/reader/books', { params: { query } });
  return data;
}

// Contributor endpoints
export async function listMyBooks() {
  const { data } = await api.get('/contributor/books');
  return data;
}

export async function createMyBook(payload) {
  const { data } = await api.post('/contributor/books', payload);
  return data;
}

export async function deleteMyBook(id) {
  const { data } = await api.delete(`/contributor/books/${id}`);
  return data;
}

export async function getContributorAnalytics() {
  const { data } = await api.get('/contributor/analytics');
  return data;
}

export async function getContributorRequests() {
  const { data } = await api.get('/contributor/requests');
  return data;
}


