import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './config/apiConfig';
import { navigate } from './navigation/RootNavigation'; 

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      const token = userInfo ? JSON.parse(userInfo).access : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error('Error retrieving token:', error);
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const userInfo = await AsyncStorage.getItem('userInfo');
        const refreshToken = userInfo ? JSON.parse(userInfo).refresh : null;

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const { data } = await axios.post(`${API_URL}/api/token/refresh/`, { refresh: refreshToken });

        const updatedUserInfo = {
          ...JSON.parse(userInfo),
          access: data.access,
        };

        await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
        originalRequest.headers['Authorization'] = `Bearer ${data.access}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        await AsyncStorage.removeItem('userInfo');
        navigate('Login'); // Redirect to the login screen
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
