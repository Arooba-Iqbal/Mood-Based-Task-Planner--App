import axios from "axios";

const trimTrailingSlash = (url) => url.replace(/\/$/, "");

const resolveBaseURL = () => {
  const fromEnv = import.meta.env.VITE_API_URL;
  if (fromEnv) {
    return trimTrailingSlash(fromEnv);
  }
  if (import.meta.env.DEV) {
    return "http://localhost:5000/api";
  }
  return `${window.location.origin}/api`;
};

const api = axios.create({
  baseURL: resolveBaseURL()
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
