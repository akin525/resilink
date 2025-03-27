import axios from "axios";

const unauth_api = axios.create();

unauth_api.interceptors.request.use(
  async (config) => {
    if (config.headers) {
      config.headers.set("Content-Type", "application/json");
      config.headers.set("x-api-key", "9ad07a9b7091e49b6afefa0c29d94d33:4449927ec0f020683862aa898eaf1f02c5087aed610ee170878b7381674ae453");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { unauth_api };
