import axios from "axios";

// Prefer explicit VITE_API_URL when deploying frontend separately (e.g., Vercel) and backend on another domain (e.g., Render)
// Examples:
//  - VITE_API_URL=https://your-backend.onrender.com/api
// Development fallback remains localhost:3000/api
const API_BASE_URL =
  import.meta.env.VITE_API_URL?.trim() ||
  (import.meta.env.MODE === "development"
    ? "http://localhost:3000/api"
    : "/api");

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
