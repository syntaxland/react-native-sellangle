// axiosConfig.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "./config/apiConfig";
import { navigationRef } from "./navigation/navigationRef";
import { logout } from "./redux/actions/logoutAction";

import { initializeStore } from "./redux/store";

let storePromise;

const initStore = async () => {
  if (!storePromise) {
    storePromise = initializeStore();
  }
  return storePromise;
};

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const store = await initStore();
        store.dispatch(logout());
        await AsyncStorage.removeItem("userInfo");
        console.log("store:", store);

        console.log("user logged out");

        if (navigationRef.isReady()) {
          navigationRef.navigate("Login");
        } else {
          console.error("Navigation not ready");
        }
        console.log("user redirected to Login");

        return Promise.reject(error);
      } catch (refreshError) {
        await AsyncStorage.removeItem("userInfo");
        console.error("Error when logging out:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
export { axiosInstance as axios };
