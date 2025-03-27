import axios from "axios";
import { TOKEN } from "../../utils/helpers";

const auth_api = axios.create();

// Request interceptor for API calls for authenticated routes
auth_api.interceptors.request.use(
  async (config) => {
    if (config.headers) {
      config.headers.set("Authorization", `Bearer ${TOKEN}`);
      config.headers.set("Content-Type", "application/json");
      config.headers.set("x-api-key", "9ad07a9b7091e49b6afefa0c29d94d33:4449927ec0f020683862aa898eaf1f02c5087aed610ee170878b7381674ae453");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls for unauthenticated routes
auth_api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { auth_api };
