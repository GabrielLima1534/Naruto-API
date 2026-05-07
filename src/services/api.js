import axios from "axios";

const api = axios.create({
  baseURL: "https://dattebayo-api.onrender.com",
});

export default api;