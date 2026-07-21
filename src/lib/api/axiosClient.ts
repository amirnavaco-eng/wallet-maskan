import axios, { type InternalAxiosRequestConfig } from "axios";

// TODO(backend): replace with the real Bank Maskan API base URL via env var.
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.bankmaskan.example/v1";

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// TODO(backend): read the persisted session token (e.g. from secure storage)
// and attach it to every outgoing request once authentication is wired up.
axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = typeof window !== "undefined" ? window.localStorage.getItem("bm_token") : null;
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

// TODO(backend): centralize error normalization (401 -> logout, 5xx -> retry, etc.)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosClient;
