// marketplaceSellerActions.js
import axios from "axios";
import {
  CREATE_MARKETPLACE_SELLER_REQUEST,
  CREATE_MARKETPLACE_SELLER_SUCCESS,
  CREATE_MARKETPLACE_SELLER_FAIL,
  MARKETPLACE_SELLER_PHOTO_REQUEST,
  MARKETPLACE_SELLER_PHOTO_SUCCESS,
  MARKETPLACE_SELLER_PHOTO_FAIL,
  POST_FREE_AD_REQUEST,
  POST_FREE_AD_SUCCESS,
  POST_FREE_AD_FAIL,
  POST_PAID_AD_REQUEST,
  POST_PAID_AD_SUCCESS,
  POST_PAID_AD_FAIL,
  GET_SELLER_ACCOUNT_REQUEST,
  GET_SELLER_ACCOUNT_SUCCESS,
  GET_SELLER_ACCOUNT_FAIL,
  UPDATE_SELLER_ACCOUNT_REQUEST,
  UPDATE_SELLER_ACCOUNT_SUCCESS,
  UPDATE_SELLER_ACCOUNT_FAIL,
  GET_SELLER_PHOTO_REQUEST,
  GET_SELLER_PHOTO_SUCCESS,
  GET_SELLER_PHOTO_FAIL,
  UPDATE_SELLER_PHOTO_REQUEST,
  UPDATE_SELLER_PHOTO_SUCCESS,
  UPDATE_SELLER_PHOTO_FAIL,
  GET_FREE_AD_REQUEST,
  GET_FREE_AD_SUCCESS,
  GET_FREE_AD_FAIL,
  UPDATE_FREE_AD_REQUEST,
  UPDATE_FREE_AD_SUCCESS,
  UPDATE_FREE_AD_FAIL,
  GET_ALL_FREE_AD_REQUEST,
  GET_ALL_FREE_AD_SUCCESS,
  GET_ALL_FREE_AD_FAIL,
  GET_PAID_AD_REQUEST,
  GET_PAID_AD_SUCCESS,
  GET_PAID_AD_FAIL,
  UPDATE_PAID_AD_REQUEST,
  UPDATE_PAID_AD_SUCCESS,
  UPDATE_PAID_AD_FAIL,
  GET_ALL_PAID_AD_REQUEST,
  GET_ALL_PAID_AD_SUCCESS,
  GET_ALL_PAID_AD_FAIL,
  DELETE_FREE_AD_REQUEST,
  DELETE_FREE_AD_SUCCESS,
  DELETE_FREE_AD_FAIL,
  DELETE_PAID_AD_REQUEST,
  DELETE_PAID_AD_SUCCESS,
  DELETE_PAID_AD_FAIL,
  GET_FREE_AD_DETAIL_REQUEST,
  GET_FREE_AD_DETAIL_SUCCESS,
  GET_FREE_AD_DETAIL_FAIL,
  GET_PAID_AD_DETAIL_REQUEST,
  GET_PAID_AD_DETAIL_SUCCESS,
  GET_PAID_AD_DETAIL_FAIL,
  GET_SELLER_API_KEY_REQUEST,
  GET_SELLER_API_KEY_SUCCESS,
  GET_SELLER_API_KEY_FAIL,
  UPDATE_SELLER_API_KEY_REQUEST,
  UPDATE_SELLER_API_KEY_SUCCESS,
  UPDATE_SELLER_API_KEY_FAIL,
  CREATE_PAID_AD_MESSAGE_REQUEST,
  CREATE_PAID_AD_MESSAGE_SUCCESS,
  CREATE_PAID_AD_MESSAGE_FAIL,
  LIST_PAID_AD_MESSAGE_REQUEST,
  LIST_PAID_AD_MESSAGE_SUCCESS,
  LIST_PAID_AD_MESSAGE_FAIL,
  CREATE_FREE_AD_MESSAGE_REQUEST,
  CREATE_FREE_AD_MESSAGE_SUCCESS,
  CREATE_FREE_AD_MESSAGE_FAIL,
  LIST_FREE_AD_MESSAGE_REQUEST,
  LIST_FREE_AD_MESSAGE_SUCCESS,
  LIST_FREE_AD_MESSAGE_FAIL,
  EDIT_PAID_AD_REQUEST,
  EDIT_PAID_AD_SUCCESS,
  EDIT_PAID_AD_FAIL,
  DEACTIVATE_PAID_AD_REQUEST,
  DEACTIVATE_PAID_AD_SUCCESS,
  DEACTIVATE_PAID_AD_FAIL,
  REACTIVATE_PAID_AD_REQUEST,
  REACTIVATE_PAID_AD_SUCCESS,
  REACTIVATE_PAID_AD_FAIL,
  DEACTIVATE_FREE_AD_REQUEST,
  DEACTIVATE_FREE_AD_SUCCESS,
  DEACTIVATE_FREE_AD_FAIL,
  REACTIVATE_FREE_AD_REQUEST,
  REACTIVATE_FREE_AD_SUCCESS,
  REACTIVATE_FREE_AD_FAIL,
  EDIT_FREE_AD_REQUEST,
  EDIT_FREE_AD_SUCCESS,
  EDIT_FREE_AD_FAIL,
  GET_SELLER_ACTIVE_PAID_ADS_REQUEST,
  GET_SELLER_ACTIVE_PAID_ADS_SUCCESS,
  GET_SELLER_ACTIVE_PAID_ADS_FAIL,
  GET_SELLER_ACTIVE_FREE_ADS_REQUEST,
  GET_SELLER_ACTIVE_FREE_ADS_SUCCESS,
  GET_SELLER_ACTIVE_FREE_ADS_FAIL,
  GET_SELLER_USERNAME_SEARCH_REQUEST,
  GET_SELLER_USERNAME_SEARCH_SUCCESS,
  GET_SELLER_USERNAME_SEARCH_FAIL,
  GET_SELLER_DETAIL_REQUEST,
  GET_SELLER_DETAIL_SUCCESS,
  GET_SELLER_DETAIL_FAIL,
  SEARCH_ADS_REQUEST,
  SEARCH_ADS_SUCCESS,
  SEARCH_ADS_FAIL,
  GET_SELLER_SHOPFRONT_LINK_REQUEST,
  GET_SELLER_SHOPFRONT_LINK_SUCCESS,
  GET_SELLER_SHOPFRONT_LINK_FAIL,
  REPORT_FREE_AD_REQUEST,
  REPORT_FREE_AD_SUCCESS,
  REPORT_FREE_AD_FAIL,
  REPORT_PAID_AD_REQUEST,
  REPORT_PAID_AD_SUCCESS,
  REPORT_PAID_AD_FAIL,
  SELLER_REPLY_FREE_AD_MESSAGE_REQUEST,
  SELLER_REPLY_FREE_AD_MESSAGE_SUCCESS,
  SELLER_REPLY_FREE_AD_MESSAGE_FAIL,
  SELLER_REPLY_PAID_AD_MESSAGE_REQUEST,
  SELLER_REPLY_PAID_AD_MESSAGE_SUCCESS,
  SELLER_REPLY_PAID_AD_MESSAGE_FAIL,
  LIST_SELLER_FREE_AD_MESSAGES_REQUEST,
  LIST_SELLER_FREE_AD_MESSAGES_SUCCESS,
  LIST_SELLER_FREE_AD_MESSAGES_FAIL,
  LIST_SELLER_PAID_AD_MESSAGES_REQUEST,
  LIST_SELLER_PAID_AD_MESSAGES_SUCCESS,
  LIST_SELLER_PAID_AD_MESSAGES_FAIL,
  GET_BUYER_FREE_AD_MESSAGES_REQUEST,
  GET_BUYER_FREE_AD_MESSAGES_SUCCESS,
  GET_BUYER_FREE_AD_MESSAGES_FAIL,
  GET_BUYER_PAID_AD_MESSAGES_REQUEST,
  GET_BUYER_PAID_AD_MESSAGES_SUCCESS,
  GET_BUYER_PAID_AD_MESSAGES_FAIL,
  TOGGLE_FREE_AD_SAVE_REQUEST,
  TOGGLE_FREE_AD_SAVE_SUCCESS,
  TOGGLE_FREE_AD_SAVE_FAIL,
  TOGGLE_PAID_AD_SAVE_REQUEST,
  TOGGLE_PAID_AD_SAVE_SUCCESS,
  TOGGLE_PAID_AD_SAVE_FAIL,
  TRACK_FREE_AD_VIEW_REQUEST,
  TRACK_FREE_AD_VIEW_SUCCESS,
  TRACK_FREE_AD_VIEW_FAIL,
  TRACK_PAID_AD_VIEW_REQUEST,
  TRACK_PAID_AD_VIEW_SUCCESS,
  TRACK_PAID_AD_VIEW_FAIL,
  GET_USER_VIEWED_FREE_ADS_REQUEST,
  GET_USER_VIEWED_FREE_ADS_SUCCESS,
  GET_USER_VIEWED_FREE_ADS_FAIL,
  GET_USER_VIEWED_PAID_ADS_REQUEST,
  GET_USER_VIEWED_PAID_ADS_SUCCESS,
  GET_USER_VIEWED_PAID_ADS_FAIL,
  GET_USER_SAVED_FREE_ADS_REQUEST,
  GET_USER_SAVED_FREE_ADS_SUCCESS,
  GET_USER_SAVED_FREE_ADS_FAIL,
  GET_USER_SAVED_PAID_ADS_REQUEST,
  GET_USER_SAVED_PAID_ADS_SUCCESS,
  GET_USER_SAVED_PAID_ADS_FAIL,
  REVIEW_SELLER_FREE_ADS_REQUEST,
  REVIEW_SELLER_FREE_ADS_SUCCESS,
  REVIEW_SELLER_FREE_ADS_FAIL,
  REVIEW_SELLER_PAID_ADS_REQUEST,
  REVIEW_SELLER_PAID_ADS_SUCCESS,
  REVIEW_SELLER_PAID_ADS_FAIL,
  GET_REVIEW_SELLER_FREE_ADS_REQUEST,
  GET_REVIEW_SELLER_FREE_ADS_SUCCESS,
  GET_REVIEW_SELLER_FREE_ADS_FAIL,
  GET_REVIEW_SELLER_PAID_ADS_REQUEST,
  GET_REVIEW_SELLER_PAID_ADS_SUCCESS,
  GET_REVIEW_SELLER_PAID_ADS_FAIL,
  APPLY_PROMO_CODE_REQUEST,
  APPLY_PROMO_CODE_SUCCESS,
  APPLY_PROMO_CODE_FAIL,
  GET_SELLER_PAID_ADS_CHARGES_REQUEST,
  GET_SELLER_PAID_ADS_CHARGES_SUCCESS,
  GET_SELLER_PAID_ADS_CHARGES_FAIL,
  PAY_ADS_CHARGES_REQUEST,
  PAY_ADS_CHARGES_SUCCESS,
  PAY_ADS_CHARGES_FAIL,
  GET_PAID_ADS_CHARGES_RECEIPT_REQUEST,
  GET_PAID_ADS_CHARGES_RECEIPT_SUCCESS,
  GET_PAID_ADS_CHARGES_RECEIPT_FAIL,
  CLEAR_SELLER_FREE_AD_MESSAGE_COUNTER_REQUEST,
  CLEAR_SELLER_FREE_AD_MESSAGE_COUNTER_SUCCESS,
  CLEAR_SELLER_FREE_AD_MESSAGE_COUNTER_FAIL,
  CLEAR_BUYER_FREE_AD_MESSAGE_COUNTER_REQUEST,
  CLEAR_BUYER_FREE_AD_MESSAGE_COUNTER_SUCCESS,
  CLEAR_BUYER_FREE_AD_MESSAGE_COUNTER_FAIL,
  CLEAR_SELLER_PAID_AD_MESSAGE_COUNTER_REQUEST,
  CLEAR_SELLER_PAID_AD_MESSAGE_COUNTER_SUCCESS,
  CLEAR_SELLER_PAID_AD_MESSAGE_COUNTER_FAIL,
  CLEAR_BUYER_PAID_AD_MESSAGE_COUNTER_REQUEST,
  CLEAR_BUYER_PAID_AD_MESSAGE_COUNTER_SUCCESS,
  CLEAR_BUYER_PAID_AD_MESSAGE_COUNTER_FAIL,
  GET_ACTIVE_BUYER_FREE_AD_MESSAGES_REQUEST,
  GET_ACTIVE_BUYER_FREE_AD_MESSAGES_SUCCESS,
  GET_ACTIVE_BUYER_FREE_AD_MESSAGES_FAIL,
  GET_ACTIVE_BUYER_PAID_AD_MESSAGES_REQUEST,
  GET_ACTIVE_BUYER_PAID_AD_MESSAGES_SUCCESS,
  GET_ACTIVE_BUYER_PAID_AD_MESSAGES_FAIL,
  GET_SELLER_AD_STATISTICS_REQUEST,
  GET_SELLER_AD_STATISTICS_SUCCESS,
  GET_SELLER_AD_STATISTICS_FAIL,
  TOGGLE_FOLLOW_SELLER_REQUEST,
  TOGGLE_FOLLOW_SELLER_SUCCESS,
  TOGGLE_FOLLOW_SELLER_FAIL,
  GET_FOLLOWED_SELLER_REQUEST,
  GET_FOLLOWED_SELLER_SUCCESS,
  GET_FOLLOWED_SELLER_FAIL,
} from "../constants/marketplaceSellerConstants";

import { API_URL } from "../../config/apiConfig";

export const getFollowedSellers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_FOLLOWED_SELLER_REQUEST });

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
      `${API_URL}/api/get-followed-sellers/`,
      config
    );

    dispatch({
      type: GET_FOLLOWED_SELLER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_FOLLOWED_SELLER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const toggleFollowSeller =
  (toggleData) => async (dispatch, getState) => {
    try {
      dispatch({ type: TOGGLE_FOLLOW_SELLER_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/toggle-follow-seller/`,
        toggleData,
        config
      );

      dispatch({
        type: TOGGLE_FOLLOW_SELLER_SUCCESS,
        payload: data,
      });
      return data;
    } catch (error) {
      dispatch({
        type: TOGGLE_FOLLOW_SELLER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getSellerAdStatistics = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SELLER_AD_STATISTICS_REQUEST });

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
      `${API_URL}/api/get-seller-ad-statistics/`,
      config
    );

    dispatch({
      type: GET_SELLER_AD_STATISTICS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SELLER_AD_STATISTICS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const GetActiveBuyerFreeAdMessages =
  () => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_ACTIVE_BUYER_FREE_AD_MESSAGES_REQUEST });

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
        `${API_URL}/api/get-active-buyer-free-ad-messages/`,

        config
      );

      dispatch({
        type: GET_ACTIVE_BUYER_FREE_AD_MESSAGES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ACTIVE_BUYER_FREE_AD_MESSAGES_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const GetActiveBuyerPaidAdMessages =
  () => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_ACTIVE_BUYER_PAID_AD_MESSAGES_REQUEST });

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
        `${API_URL}/api/get-active-buyer-paid-ad-messages/`,

        config
      );

      dispatch({
        type: GET_ACTIVE_BUYER_PAID_AD_MESSAGES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ACTIVE_BUYER_PAID_AD_MESSAGES_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const clearSellerFreeAdMessageCounter =
  (counterData) => async (dispatch, getState) => {
    try {
      dispatch({ type: CLEAR_SELLER_FREE_AD_MESSAGE_COUNTER_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/clear-seller-free-ad-message-counter/`,
        counterData,
        config
      );

      dispatch({
        type: CLEAR_SELLER_FREE_AD_MESSAGE_COUNTER_SUCCESS,
        payload: data,
      });
      return data;
    } catch (error) {
      dispatch({
        type: CLEAR_SELLER_FREE_AD_MESSAGE_COUNTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const clearBuyerFreeAdMessageCounter =
  (counterData) => async (dispatch, getState) => {
    try {
      dispatch({ type: CLEAR_BUYER_FREE_AD_MESSAGE_COUNTER_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/clear-buyer-free-ad-message-counter/`,
        counterData,
        config
      );

      dispatch({
        type: CLEAR_BUYER_FREE_AD_MESSAGE_COUNTER_SUCCESS,
        payload: data,
      });
      return data;
    } catch (error) {
      dispatch({
        type: CLEAR_BUYER_FREE_AD_MESSAGE_COUNTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const clearSellerPaidAdMessageCounter =
  (counterData) => async (dispatch, getState) => {
    try {
      dispatch({ type: CLEAR_SELLER_PAID_AD_MESSAGE_COUNTER_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/clear-seller-paid-ad-message-counter/`,
        counterData,
        config
      );

      dispatch({
        type: CLEAR_SELLER_PAID_AD_MESSAGE_COUNTER_SUCCESS,
        payload: data,
      });
      return data;
    } catch (error) {
      dispatch({
        type: CLEAR_SELLER_PAID_AD_MESSAGE_COUNTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const clearBuyerPaidAdMessageCounter =
  (counterData) => async (dispatch, getState) => {
    try {
      dispatch({ type: CLEAR_BUYER_PAID_AD_MESSAGE_COUNTER_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/clear-buyer-paid-ad-message-counter/`,
        counterData,
        config
      );

      dispatch({
        type: CLEAR_BUYER_PAID_AD_MESSAGE_COUNTER_SUCCESS,
        payload: data,
      });
      return data;
    } catch (error) {
      dispatch({
        type: CLEAR_BUYER_PAID_AD_MESSAGE_COUNTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getAdChargesReceipt = (adData) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_PAID_ADS_CHARGES_RECEIPT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { ad_charges_receipt_month } = adData;
    const url = `${API_URL}/api/get-ad-charges-receipt/?ad_charges_receipt_month=${ad_charges_receipt_month}/`;
    const { data } = await axios.get(url, config);

    dispatch({
      type: GET_PAID_ADS_CHARGES_RECEIPT_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: GET_PAID_ADS_CHARGES_RECEIPT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const payAdCharges = (promoData) => async (dispatch, getState) => {
  try {
    dispatch({ type: PAY_ADS_CHARGES_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/pay-ad-charges/`,
      promoData,
      config
    );

    dispatch({
      type: PAY_ADS_CHARGES_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: PAY_ADS_CHARGES_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getSellerPaidAdCharges = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SELLER_PAID_ADS_CHARGES_REQUEST });

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
      `${API_URL}/api/get-seller-paid-ads-charges/`,

      config
    );

    dispatch({
      type: GET_SELLER_PAID_ADS_CHARGES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SELLER_PAID_ADS_CHARGES_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const applyPromoCode = (promoData) => async (dispatch, getState) => {
  try {
    dispatch({ type: APPLY_PROMO_CODE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/apply-promo-code/`,
      promoData,
      config
    );

    dispatch({
      type: APPLY_PROMO_CODE_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: APPLY_PROMO_CODE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getFreeAdSellerReviews =
  (reviewData) => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_REVIEW_SELLER_FREE_ADS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { ad_id } = reviewData;
      const url = `${API_URL}/api/get-seller-free-ad-reviews/?ad_id=${ad_id}/`;
      const { data } = await axios.get(url, config);

      // const { data } = await axios.get(
      //   `${API_URL}/api/get-seller-free-ad-reviews/${reviewData}`,
      //   reviewData,
      //   config
      // );

      dispatch({
        type: GET_REVIEW_SELLER_FREE_ADS_SUCCESS,
        payload: data,
      });
      return data;
    } catch (error) {
      dispatch({
        type: GET_REVIEW_SELLER_FREE_ADS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getPaidAdSellerReviews =
  (reviewData) => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_REVIEW_SELLER_PAID_ADS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { ad_id } = reviewData;
      const url = `${API_URL}/api/get-seller-paid-ad-reviews/?ad_id=${ad_id}/`;
      const { data } = await axios.get(url, config);

      // const { data } = await axios.get(
      //   `${API_URL}/api/get-seller-paid-ad-reviews/`,
      //   reviewData,
      //   config
      // );

      dispatch({
        type: GET_REVIEW_SELLER_PAID_ADS_SUCCESS,
        payload: data,
      });
      return data;
    } catch (error) {
      dispatch({
        type: GET_REVIEW_SELLER_PAID_ADS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const reviewFreeAdSeller =
  (reviewData) => async (dispatch, getState) => {
    try {
      dispatch({ type: REVIEW_SELLER_FREE_ADS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/review-free-ad-seller/`,
        reviewData,

        config
      );

      dispatch({
        type: REVIEW_SELLER_FREE_ADS_SUCCESS,
        payload: data,
      });
      return data;
    } catch (error) {
      dispatch({
        type: REVIEW_SELLER_FREE_ADS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const reviewPaidAdSeller =
  (reviewData) => async (dispatch, getState) => {
    try {
      dispatch({ type: REVIEW_SELLER_PAID_ADS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/review-paid-ad-seller/`,
        reviewData,

        config
      );

      dispatch({
        type: REVIEW_SELLER_PAID_ADS_SUCCESS,
        payload: data,
      });
      return data;
    } catch (error) {
      dispatch({
        type: REVIEW_SELLER_PAID_ADS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const toggleFreeAdSave = (toggleData) => async (dispatch, getState) => {
  try {
    dispatch({ type: TOGGLE_FREE_AD_SAVE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/toggle-free-ad-save/`,
      toggleData,

      config
    );

    dispatch({
      type: TOGGLE_FREE_AD_SAVE_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: TOGGLE_FREE_AD_SAVE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const togglePaidAdSave = (toggleData) => async (dispatch, getState) => {
  try {
    dispatch({ type: TOGGLE_PAID_AD_SAVE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/toggle-paid-ad-save/`,
      toggleData,

      config
    );

    dispatch({
      type: TOGGLE_PAID_AD_SAVE_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: TOGGLE_PAID_AD_SAVE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const trackFreeAdView = (adData) => async (dispatch, getState) => {
  try {
    dispatch({ type: TRACK_FREE_AD_VIEW_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/track-free-ad-view/`,
      adData,

      config
    );

    dispatch({
      type: TRACK_FREE_AD_VIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRACK_FREE_AD_VIEW_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const trackPaidAdView = (adData) => async (dispatch, getState) => {
  try {
    dispatch({ type: TRACK_PAID_AD_VIEW_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/track-paid-ad-view/`,
      adData,

      config
    );

    dispatch({
      type: TRACK_PAID_AD_VIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRACK_PAID_AD_VIEW_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUserFreeAdsViews = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_VIEWED_FREE_ADS_REQUEST });

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
      `${API_URL}/api/get-user-viewed-free-ads/`,

      config
    );

    dispatch({
      type: GET_USER_VIEWED_FREE_ADS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_VIEWED_FREE_ADS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUserPaidAdsViews = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_VIEWED_PAID_ADS_REQUEST });

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
      `${API_URL}/api/get-user-viewed-paid-ads/`,

      config
    );

    dispatch({
      type: GET_USER_VIEWED_PAID_ADS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_VIEWED_PAID_ADS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUserSavedFreeAds = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_SAVED_FREE_ADS_REQUEST });

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
      `${API_URL}/api/get-user-saved-free-ads/`,

      config
    );

    dispatch({
      type: GET_USER_SAVED_FREE_ADS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_SAVED_FREE_ADS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUserSavedPaidAds = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_SAVED_PAID_ADS_REQUEST });

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
      `${API_URL}/api/get-user-saved-paid-ads/`,

      config
    );

    dispatch({
      type: GET_USER_SAVED_PAID_ADS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_SAVED_PAID_ADS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const sellerReplyFreeAdMessage =
  (messageData) => async (dispatch, getState) => {
    try {
      dispatch({ type: SELLER_REPLY_FREE_AD_MESSAGE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/seller-reply-free-ad-message/`,
        messageData,

        config
      );

      dispatch({
        type: SELLER_REPLY_FREE_AD_MESSAGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SELLER_REPLY_FREE_AD_MESSAGE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const sellerReplyPaidAdMessage =
  (messageData) => async (dispatch, getState) => {
    try {
      dispatch({ type: SELLER_REPLY_PAID_AD_MESSAGE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/seller-reply-paid-ad-message/`,
        messageData,

        config
      );

      dispatch({
        type: SELLER_REPLY_PAID_AD_MESSAGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SELLER_REPLY_PAID_AD_MESSAGE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listSellerFreeAdMessages = (pk) => async (dispatch, getState) => {
  try {
    dispatch({ type: LIST_SELLER_FREE_AD_MESSAGES_REQUEST });

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
      `${API_URL}/api/list-seller-free-ad-messages/${pk}`,

      config
    );

    dispatch({
      type: LIST_SELLER_FREE_AD_MESSAGES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_SELLER_FREE_AD_MESSAGES_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listSellerPaidAdMessages = (pk) => async (dispatch, getState) => {
  try {
    dispatch({ type: LIST_SELLER_PAID_AD_MESSAGES_REQUEST });

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
      `${API_URL}/api/list-seller-paid-ad-messages/${pk}`,

      config
    );

    dispatch({
      type: LIST_SELLER_PAID_AD_MESSAGES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_SELLER_PAID_AD_MESSAGES_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listBuyerFreeAdMessages = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_BUYER_FREE_AD_MESSAGES_REQUEST });

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
      `${API_URL}/api/get-buyer-free-ad-messages/`,

      config
    );

    dispatch({
      type: GET_BUYER_FREE_AD_MESSAGES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BUYER_FREE_AD_MESSAGES_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listBuyerPaidAdMessages = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_BUYER_PAID_AD_MESSAGES_REQUEST });

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
      `${API_URL}/api/get-buyer-paid-ad-messages/`,

      config
    );

    dispatch({
      type: GET_BUYER_PAID_AD_MESSAGES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BUYER_PAID_AD_MESSAGES_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const reportFreeAd = (adReportData) => async (dispatch, getState) => {
  try {
    dispatch({ type: REPORT_FREE_AD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/report-free-ad/`,
      adReportData,
      config
    );

    dispatch({
      type: REPORT_FREE_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REPORT_FREE_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const reportPaidAd = (adReportData) => async (dispatch, getState) => {
  try {
    dispatch({ type: REPORT_PAID_AD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/report-paid-ad/`,
      adReportData,
      config
    );

    dispatch({
      type: REPORT_PAID_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REPORT_PAID_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getSellerShopfrontLink = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SELLER_SHOPFRONT_LINK_REQUEST });

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
      `${API_URL}/api/get-seller-shopfront-link/`,
      config
    );

    dispatch({
      type: GET_SELLER_SHOPFRONT_LINK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SELLER_SHOPFRONT_LINK_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const searchAds = (searchData) => async (dispatch, getState) => {
  try {
    dispatch({ type: SEARCH_ADS_REQUEST });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { search_term, selected_country, selected_state, selected_city } =
      searchData;
    const url = `${API_URL}/api/search-ads/?search_term=${search_term}&country=${selected_country}&state=${selected_state}&city=${selected_city}/`;
    const { data } = await axios.get(url, config);

    // const { data } = await axios.get(
    //   `${API_URL}/api/search-ads/${searchTerm}/`,
    //   config
    // );

    dispatch({
      type: SEARCH_ADS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_ADS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getSellerUsernameSearch =
  (lowerCaseUsername) => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_SELLER_USERNAME_SEARCH_REQUEST });

      // const {
      //   userLogin: { userInfo },
      // } = getState();

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.get(
        `${API_URL}/api/search-seller-username/${lowerCaseUsername}/`,
        config
      );

      dispatch({
        type: GET_SELLER_USERNAME_SEARCH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SELLER_USERNAME_SEARCH_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getSellerDetail =
  (seller_username) => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_SELLER_DETAIL_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          // "Content-Type": "multipart/form-data",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.get(
        `${API_URL}/api/get-seller-detail/${seller_username}/`,
        config
      );

      dispatch({
        type: GET_SELLER_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SELLER_DETAIL_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getSellerActivePaidAds =
  (seller_username) => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_SELLER_ACTIVE_PAID_ADS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          // "Content-Type": "multipart/form-data",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.get(
        `${API_URL}/api/get-seller-active-paid-ads/${seller_username}/`,
        config
      );

      dispatch({
        type: GET_SELLER_ACTIVE_PAID_ADS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SELLER_ACTIVE_PAID_ADS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getSellerActiveFreeAds =
  (seller_username) => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_SELLER_ACTIVE_FREE_ADS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          // "Content-Type": "multipart/form-data",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.get(
        `${API_URL}/api/get-seller-active-free-ads/${seller_username}/`,
        config
      );

      dispatch({
        type: GET_SELLER_ACTIVE_FREE_ADS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SELLER_ACTIVE_FREE_ADS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const deactivateFreeAd = (adData) => async (dispatch, getState) => {
  try {
    dispatch({ type: DEACTIVATE_FREE_AD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/deactivate-free-ad/`,
      adData,
      config
    );

    dispatch({
      type: DEACTIVATE_FREE_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DEACTIVATE_FREE_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const reactivateFreeAd = (adData) => async (dispatch, getState) => {
  try {
    dispatch({ type: REACTIVATE_FREE_AD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/reactivate-free-ad/`,
      adData,

      config
    );

    dispatch({
      type: REACTIVATE_FREE_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REACTIVATE_FREE_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const editFreeAd = (adData) => async (dispatch, getState) => {
  try {
    dispatch({ type: EDIT_FREE_AD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.put(
      `${API_URL}/api/edit-free-ad/`,
      adData,

      config
    );

    dispatch({
      type: EDIT_FREE_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_FREE_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const editPaidAd = (adData) => async (dispatch, getState) => {
  try {
    dispatch({ type: EDIT_PAID_AD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.put(
      `${API_URL}/api/edit-paid-ad/`,
      adData,

      config
    );

    dispatch({
      type: EDIT_PAID_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_PAID_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deactivatePaidAd = (adData) => async (dispatch, getState) => {
  try {
    dispatch({ type: DEACTIVATE_PAID_AD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/deactivate-paid-ad/`,
      adData,
      config
    );

    dispatch({
      type: DEACTIVATE_PAID_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DEACTIVATE_PAID_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const reactivatePaidAd = (adData) => async (dispatch, getState) => {
  try {
    dispatch({ type: REACTIVATE_PAID_AD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/reactivate-paid-ad/`,
      adData,

      config
    );

    dispatch({
      type: REACTIVATE_PAID_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REACTIVATE_PAID_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const buyerCreatePaidAdMessage =
  (messageData) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_PAID_AD_MESSAGE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/buyer-create-paid-ad-message/`,
        messageData,

        config
      );

      dispatch({
        type: CREATE_PAID_AD_MESSAGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_PAID_AD_MESSAGE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listPaidAdMessages =
  (messageData) => async (dispatch, getState) => {
    try {
      dispatch({ type: LIST_PAID_AD_MESSAGE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      // const { data } = await axios.get(
      //   `${API_URL}/api/list-paid-ad-messages/${pk}`,
      //   config
      // );

      const { ad_id, paid_ad_message_id } = messageData;
      const url = `${API_URL}/api/list-paid-ad-messages/?ad_id=${ad_id}&paid_ad_message_id=${paid_ad_message_id}/`;
      const { data } = await axios.get(url, config);

      dispatch({
        type: LIST_PAID_AD_MESSAGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LIST_PAID_AD_MESSAGE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const buyerCreateFreeAdMessage =
  (messageData) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_FREE_AD_MESSAGE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/buyer-create-free-ad-message/`,
        messageData,

        config
      );

      dispatch({
        type: CREATE_FREE_AD_MESSAGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_FREE_AD_MESSAGE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listFreeAdMessages =
  (messageData) => async (dispatch, getState) => {
    try {
      dispatch({ type: LIST_FREE_AD_MESSAGE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      // const { data } = await axios.get(
      //   `${API_URL}/api/list-free-ad-messages/${pk}`,
      //   config
      // );

      const { ad_id, free_ad_message_id } = messageData;
      const url = `${API_URL}/api/list-free-ad-messages/?ad_id=${ad_id}&free_ad_message_id=${free_ad_message_id}/`;
      const { data } = await axios.get(url, config);

      dispatch({
        type: LIST_FREE_AD_MESSAGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LIST_FREE_AD_MESSAGE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getSellerFreeAd = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_FREE_AD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        // "Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-seller-free-ad/`,
      config
    );

    dispatch({
      type: GET_FREE_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_FREE_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getFreeAdDetail = (pk) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_FREE_AD_DETAIL_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        // "Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-free-ad-detail/${pk}`,

      config
    );

    dispatch({
      type: GET_FREE_AD_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_FREE_AD_DETAIL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteFreeAd = (adData) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_FREE_AD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/delete-free-ad/`,
      adData,
      config
    );

    dispatch({
      type: DELETE_FREE_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_FREE_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateFreeAd =
  (businessFormData) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_FREE_AD_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.put(
        `${API_URL}/api/update-free-ad/`,
        businessFormData,
        config
      );

      dispatch({
        type: UPDATE_FREE_AD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_FREE_AD_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getAllFreeAd = (adData) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_FREE_AD_REQUEST });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    const config = {
      headers: {
        // "Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
        // Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { selected_country, selected_state, selected_city } = adData;
    const url = `${API_URL}/api/get-all-free-ad/?country=${selected_country}&state=${selected_state}&city=${selected_city}/`;
    const { data } = await axios.get(url, config);

    // const { data } = await axios.get(
    //   `${API_URL}/api/get-all-free-ad/`,
    //   adData,
    //   config
    // );

    dispatch({
      type: GET_ALL_FREE_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_FREE_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getPaidAd = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_PAID_AD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        // "Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-seller-paid-ad/`,

      config
    );

    dispatch({
      type: GET_PAID_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PAID_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getPaidAdDetail = (pk) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_PAID_AD_DETAIL_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        // "Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-paid-ad-detail/${pk}`,

      config
    );

    dispatch({
      type: GET_PAID_AD_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PAID_AD_DETAIL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updatePaidAd =
  (businessFormData) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_PAID_AD_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.put(
        `${API_URL}/api/update-paid-ad/`,
        businessFormData,
        config
      );

      dispatch({
        type: UPDATE_PAID_AD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PAID_AD_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const deletePaidAd = (adData) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_PAID_AD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/delete-paid-ad/`,
      adData,
      config
    );

    dispatch({
      type: DELETE_PAID_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PAID_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getAllPaidAd = (adData) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_PAID_AD_REQUEST });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    const config = {
      headers: {
        // "Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
        // Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { selected_country, selected_state, selected_city } = adData;
    const url = `${API_URL}/api/get-all-paid-ad/?country=${selected_country}&state=${selected_state}&city=${selected_city}/`;
    const { data } = await axios.get(url, config);

    // const { data } = await axios.get(
    //   `${API_URL}/api/get-all-paid-ad/`,
    //   adData,
    //   config
    // );

    dispatch({
      type: GET_ALL_PAID_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PAID_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const postPaidAd = (sellerData) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_PAID_AD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/create-paid-ad/`,
      sellerData,
      config
    );

    dispatch({
      type: POST_PAID_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_PAID_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const postFreeAd = (sellerData) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_FREE_AD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/create-free-ad/`,
      sellerData,
      config
    );

    dispatch({
      type: POST_FREE_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_FREE_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createMarketplaceSeller =
  (sellerData) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_MARKETPLACE_SELLER_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/create-marketplace-seller/`,
        sellerData,
        config
      );

      dispatch({
        type: CREATE_MARKETPLACE_SELLER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_MARKETPLACE_SELLER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getSellerAccount = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SELLER_ACCOUNT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        // "Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-marketplace-seller-account/`,
      config
    );

    dispatch({
      type: GET_SELLER_ACCOUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SELLER_ACCOUNT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateSellerAccount =
  (businessFormData) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_SELLER_ACCOUNT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.put(
        `${API_URL}/api/update-marketplace-seller-account/`,
        businessFormData,
        config
      );

      dispatch({
        type: UPDATE_SELLER_ACCOUNT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SELLER_ACCOUNT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const sellerPhoto = (sellerData) => async (dispatch, getState) => {
  try {
    dispatch({ type: MARKETPLACE_SELLER_PHOTO_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/marketplace-seller-photo/`,
      sellerData,
      config
    );

    dispatch({
      type: MARKETPLACE_SELLER_PHOTO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MARKETPLACE_SELLER_PHOTO_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getSellerPhoto = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SELLER_PHOTO_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        // "Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-marketplace-seller-photo/`,
      config
    );

    dispatch({
      type: GET_SELLER_PHOTO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SELLER_PHOTO_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateSellerPhoto =
  (photoFormData) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_SELLER_PHOTO_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.put(
        `${API_URL}/api/update-marketplace-seller-photo/`,
        photoFormData,
        config
      );

      dispatch({
        type: UPDATE_SELLER_PHOTO_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SELLER_PHOTO_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getSellerPaysofterApiKey = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SELLER_API_KEY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        // "Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-seller-api-key/`,
      config
    );

    dispatch({
      type: GET_SELLER_API_KEY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SELLER_API_KEY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateSellerPaysofterApiKey =
  (apiKeyFormData) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_SELLER_API_KEY_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.put(
        `${API_URL}/api/save-seller-api-key/`,
        apiKeyFormData,
        config
      );

      dispatch({
        type: UPDATE_SELLER_API_KEY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SELLER_API_KEY_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
