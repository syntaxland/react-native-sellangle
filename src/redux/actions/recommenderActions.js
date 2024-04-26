// recommenderActions.js
import axios from "axios";
import {
  GET_USER_RECOMMENDED_FREE_ADS_REQUEST,
  GET_USER_RECOMMENDED_FREE_ADS_SUCCESS,
  GET_USER_RECOMMENDED_FREE_ADS_FAIL,
  GET_USER_RECOMMENDED_PAID_ADS_REQUEST,
  GET_USER_RECOMMENDED_PAID_ADS_SUCCESS,
  GET_USER_RECOMMENDED_PAID_ADS_FAIL,
  
} from "../constants/recommenderConstants";  

// const API_URL = process.env.REACT_APP_API_URL;
import { API_URL } from "../../config/apiConfig";

export const getUserRecommendedFreeAds = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_RECOMMENDED_FREE_ADS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-recommended-free-ads/`,

      config
    );

    dispatch({
      type: GET_USER_RECOMMENDED_FREE_ADS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_RECOMMENDED_FREE_ADS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUserRecommendedPaidAds = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_RECOMMENDED_PAID_ADS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-recommended-paid-ads/`,

      config
    );

    dispatch({
      type: GET_USER_RECOMMENDED_PAID_ADS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_RECOMMENDED_PAID_ADS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
