import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Global 401 handler
export const setupInterceptors = (logout: () => void) => {
  api.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        logout();
      }
      return Promise.reject(err);
    }
  );
};

export default api;