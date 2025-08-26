import appConfig from "./index";
import axios from "axios";

const Client = axios.create({
  baseURL: appConfig.backendBaseURL,
});

Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    console.log(error,'error in axiosClient');
    Promise.reject(error);
  }
);

// Export your Axios Client to use within your app
export default Client;
