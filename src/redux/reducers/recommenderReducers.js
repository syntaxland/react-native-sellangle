// recommenderReducers.js
import {
  GET_USER_RECOMMENDED_FREE_ADS_REQUEST,
  GET_USER_RECOMMENDED_FREE_ADS_SUCCESS,
  GET_USER_RECOMMENDED_FREE_ADS_FAIL,
  GET_USER_RECOMMENDED_PAID_ADS_REQUEST,
  GET_USER_RECOMMENDED_PAID_ADS_SUCCESS,
  GET_USER_RECOMMENDED_PAID_ADS_FAIL,
} from "../constants/recommenderConstants";

const initialState = {
  recommendedAds: [],
  loading: false,
  success: false,
  error: null,
};

export const getUserRecommendedFreeAdsReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_USER_RECOMMENDED_FREE_ADS_REQUEST:
      return { loading: true };
    case GET_USER_RECOMMENDED_FREE_ADS_SUCCESS:
      return {
        loading: false,
        success: true,
        recommendedAds: action.payload,
      };

    case GET_USER_RECOMMENDED_FREE_ADS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserRecommendedPaidAdsReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_USER_RECOMMENDED_PAID_ADS_REQUEST:
      return { loading: true };
    case GET_USER_RECOMMENDED_PAID_ADS_SUCCESS:
      return {
        loading: false,
        success: true,
        recommendedAds: action.payload,
      };

    case GET_USER_RECOMMENDED_PAID_ADS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
