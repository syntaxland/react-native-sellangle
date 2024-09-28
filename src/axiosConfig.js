// axiosConfig.js
// import { logout } from "./redux/actions/userActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "./config/apiConfig"; 
// import { navigationRef } from '../App';

// let store;

// export const setAxiosStore = (_store) => {
//   store = _store;
// };

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
        await AsyncStorage.removeItem("userInfo");
        console.log("userInfo removed");

        // store.dispatch(logout());
        // console.log("user logged out removed");

        // if (navigationRef.isReady()) {
        //   navigationRef.navigate("Login");
        // console.log("user redirected to Login");
        // } else {
        //   console.error("Navigation not ready");
        // }

        return Promise.reject(error);
      } catch (refreshError) {
        await AsyncStorage.removeItem("userInfo");
        console.error("Error during logout:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
export { axiosInstance as axios };
