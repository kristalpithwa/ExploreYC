import { create } from "axios";
import { BASE_URL } from "@/network/config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const axiosInterceptor = create({
  baseURL: BASE_URL,
  headers: headers,
  // Disable withCredentials to prevent iOS from overriding our Cookie header
  withCredentials: false,
});

// Add a request interceptor
axiosInterceptor.interceptors.request.use(
  async (value) => {
    return value;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInterceptor.interceptors.response.use(
  (value) => {
    return value;
  },
  (error) => {
    return Promise.reject(error.response);
  },
);
