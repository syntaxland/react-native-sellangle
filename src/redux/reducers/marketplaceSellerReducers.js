// marketplaceSellerReducers.js
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
  RESET_APPLY_PROMO_CODE_STATE,
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

const initialState = {
  loading: false,
  success: false,
  error: null,
  sellerAccount: [],
  sellerPhoto: [],
  adMessages: [],
  sellerAdMessages: [],
  freeAdMessages: [],
  paidAdMessages: [],
  sellerApiKey: [],
  sellerAvatarUrl: [],
  isSellerVerified: [],
  sellerRating: [],
  sellerReviewCount: [],
  sellerFreeAdReviews: [],
  sellerPaidAdReviews: [],
  serachResults: [],
  ads: [],
  savedAds: [],
  viewedAds: [],
  freeSearchAds: [],
  paidSearchAds: [],
  freeAds: [],
  paidAds: [],
  sellerDetail: [],
  shopfrontLink: [],
  discountPercentage: [],
  promoDiscount: [],

  totalAdCharges: [],
  paidAdCharges: [],
  // adCpsCharges: [],
  paidAdReceipt: [],

  activeBuyerFreeAdMessages: [],
  activeBuyerPaidAdMessages: [],

  totalSellerAdsViews: [],
  totalSellerAdSaved: [],
  totalFollwersCount: [],

  followedSellers: [],
};

export const getFollowedSellersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FOLLOWED_SELLER_REQUEST:
      return { loading: true };
    case GET_FOLLOWED_SELLER_SUCCESS:
      return {
        loading: false,
        success: true,
        followedSellers: action.payload.data,
      };
    case GET_FOLLOWED_SELLER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const toggleFollowSellerReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FOLLOW_SELLER_REQUEST:
      return { loading: true };
    case TOGGLE_FOLLOW_SELLER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case TOGGLE_FOLLOW_SELLER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSellerAdStatisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_AD_STATISTICS_REQUEST:
      return { loading: true };
    case GET_SELLER_AD_STATISTICS_SUCCESS:
      return {
        loading: false,
        success: true,
        totalSellerAdsViews: action.payload.totalSellerAdsViews,
        totalSellerAdSaved: action.payload.totalSellerAdSaved,
        totalFollwersCount: action.payload.totalFollwersCount,
      };
    case GET_SELLER_AD_STATISTICS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const GetActiveBuyerFreeAdMessagesReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_ACTIVE_BUYER_FREE_AD_MESSAGES_REQUEST:
      return { loading: true };
    case GET_ACTIVE_BUYER_FREE_AD_MESSAGES_SUCCESS:
      return {
        loading: false,
        success: true,
        activeBuyerFreeAdMessages: action.payload,
      };

    case GET_ACTIVE_BUYER_FREE_AD_MESSAGES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const GetActiveBuyerPaidAdMessagesReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_ACTIVE_BUYER_PAID_AD_MESSAGES_REQUEST:
      return { loading: true };
    case GET_ACTIVE_BUYER_PAID_AD_MESSAGES_SUCCESS:
      return {
        loading: false,
        success: true,
        activeBuyerPaidAdMessages: action.payload,
      };

    case GET_ACTIVE_BUYER_PAID_AD_MESSAGES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const clearSellerFreeAdMsgCounterReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CLEAR_SELLER_FREE_AD_MESSAGE_COUNTER_REQUEST:
      return { loading: true };
    case CLEAR_SELLER_FREE_AD_MESSAGE_COUNTER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CLEAR_SELLER_FREE_AD_MESSAGE_COUNTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const clearBuyerFreeAdMsgCounterReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CLEAR_BUYER_FREE_AD_MESSAGE_COUNTER_REQUEST:
      return { loading: true };
    case CLEAR_BUYER_FREE_AD_MESSAGE_COUNTER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CLEAR_BUYER_FREE_AD_MESSAGE_COUNTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const clearSellerPaidAdMsgCounterReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CLEAR_SELLER_PAID_AD_MESSAGE_COUNTER_REQUEST:
      return { loading: true };
    case CLEAR_SELLER_PAID_AD_MESSAGE_COUNTER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CLEAR_SELLER_PAID_AD_MESSAGE_COUNTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const clearBuyerPaidAdMsgCounterReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CLEAR_BUYER_PAID_AD_MESSAGE_COUNTER_REQUEST:
      return { loading: true };
    case CLEAR_BUYER_PAID_AD_MESSAGE_COUNTER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CLEAR_BUYER_PAID_AD_MESSAGE_COUNTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAdChargesReceiptReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAID_ADS_CHARGES_RECEIPT_REQUEST:
      return { loading: true };
    case GET_PAID_ADS_CHARGES_RECEIPT_SUCCESS:
      return {
        loading: false,
        success: true,
        paidAdReceipt: action.payload,
        // paidAdReceipt: action.payload.pdf_data,
      };
    case GET_PAID_ADS_CHARGES_RECEIPT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const payAdChargesReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAY_ADS_CHARGES_REQUEST:
      return { loading: true };
    case PAY_ADS_CHARGES_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PAY_ADS_CHARGES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSellerPaidAdChargesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_PAID_ADS_CHARGES_REQUEST:
      return { loading: true };
    case GET_SELLER_PAID_ADS_CHARGES_SUCCESS:
      return {
        loading: false,
        success: true,
        // paidAdCharges: action.payload.response_data,
        paidAdCharges: action.payload.ad_charges,
        totalAdCharges: action.payload.total_ad_charges,
        // paidAdCharges: action.payload.response_data.ad_charges,
        // totalAdCharges: action.payload.response_data.total_ad_charges,
      };
    case GET_SELLER_PAID_ADS_CHARGES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const applyPomoCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPLY_PROMO_CODE_REQUEST:
      return { loading: true };
    case APPLY_PROMO_CODE_SUCCESS:
      return {
        loading: false,
        success: true,
        discountPercentage: action.payload.discount_percentage,
        promoDiscount: action.payload.promo_discount,
      };
    case APPLY_PROMO_CODE_FAIL:
      return { loading: false, error: action.payload };
    case RESET_APPLY_PROMO_CODE_STATE:
      return {};
    default:
      return state;
  }
};

export const getFreeAdSellerReviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEW_SELLER_FREE_ADS_REQUEST:
      return { loading: true };
    case GET_REVIEW_SELLER_FREE_ADS_SUCCESS:
      return {
        loading: false,
        success: true,
        sellerFreeAdReviews: action.payload.data,
        sellerAvatarUrl: action.payload.seller_avatar_url,
        sellerRating: action.payload.seller_rating,
        sellerReviewCount: action.payload.seller_review_count,
      };

    case GET_REVIEW_SELLER_FREE_ADS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getPaidAdSellerReviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEW_SELLER_PAID_ADS_REQUEST:
      return { loading: true };
    case GET_REVIEW_SELLER_PAID_ADS_SUCCESS:
      return {
        loading: false,
        success: true,
        sellerPaidAdReviews: action.payload.data,
        sellerAvatarUrl: action.payload.seller_avatar_url,
        sellerRating: action.payload.seller_rating,
        sellerReviewCount: action.payload.seller_review_count,
      };

    case GET_REVIEW_SELLER_PAID_ADS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reviewFreeAdSellerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REVIEW_SELLER_FREE_ADS_REQUEST:
      return { loading: true };
    case REVIEW_SELLER_FREE_ADS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REVIEW_SELLER_FREE_ADS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reviewPaidAdSellerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REVIEW_SELLER_PAID_ADS_REQUEST:
      return { loading: true };
    case REVIEW_SELLER_PAID_ADS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REVIEW_SELLER_PAID_ADS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const toggleFreeAdSaveReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FREE_AD_SAVE_REQUEST:
      return { loading: true };
    case TOGGLE_FREE_AD_SAVE_SUCCESS:
      return {
        loading: false,
        success: true,
        // adSaveCount: action.payload.ad_save_count,
      };
    case TOGGLE_FREE_AD_SAVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const togglePaidAdSaveReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_PAID_AD_SAVE_REQUEST:
      return { loading: true };
    case TOGGLE_PAID_AD_SAVE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case TOGGLE_PAID_AD_SAVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const trackFreeAdViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRACK_FREE_AD_VIEW_REQUEST:
      return { loading: true };
    case TRACK_FREE_AD_VIEW_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case TRACK_FREE_AD_VIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const trackPaidAdViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRACK_PAID_AD_VIEW_REQUEST:
      return { loading: true };
    case TRACK_PAID_AD_VIEW_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case TRACK_PAID_AD_VIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserViewedFreeAdsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_VIEWED_FREE_ADS_REQUEST:
      return { loading: true };
    case GET_USER_VIEWED_FREE_ADS_SUCCESS:
      return {
        loading: false,
        success: true,
        viewedAds: action.payload,
      };

    case GET_USER_VIEWED_FREE_ADS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserViewedPaidAdsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_VIEWED_PAID_ADS_REQUEST:
      return { loading: true };
    case GET_USER_VIEWED_PAID_ADS_SUCCESS:
      return {
        loading: false,
        success: true,
        viewedAds: action.payload,
      };

    case GET_USER_VIEWED_PAID_ADS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserSavedFreeAdsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SAVED_FREE_ADS_REQUEST:
      return { loading: true };
    case GET_USER_SAVED_FREE_ADS_SUCCESS:
      return {
        loading: false,
        success: true,
        savedAds: action.payload,
      };

    case GET_USER_SAVED_FREE_ADS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserSavedPaidAdsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SAVED_PAID_ADS_REQUEST:
      return { loading: true };
    case GET_USER_SAVED_PAID_ADS_SUCCESS:
      return {
        loading: false,
        success: true,
        savedAds: action.payload,
      };

    case GET_USER_SAVED_PAID_ADS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sellerReplyFreeAdMessageReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SELLER_REPLY_FREE_AD_MESSAGE_REQUEST:
      return { loading: true };
    case SELLER_REPLY_FREE_AD_MESSAGE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case SELLER_REPLY_FREE_AD_MESSAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sellerReplyPaidAdMessageReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SELLER_REPLY_PAID_AD_MESSAGE_REQUEST:
      return { loading: true };
    case SELLER_REPLY_PAID_AD_MESSAGE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case SELLER_REPLY_PAID_AD_MESSAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listSellerFreeAdMessagesReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LIST_SELLER_FREE_AD_MESSAGES_REQUEST:
      return { loading: true };
    case LIST_SELLER_FREE_AD_MESSAGES_SUCCESS:
      return {
        loading: false,
        success: true,
        sellerAdMessages: action.payload,
      };

    case LIST_SELLER_FREE_AD_MESSAGES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listSellerPaidAdMessagesReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LIST_SELLER_PAID_AD_MESSAGES_REQUEST:
      return { loading: true };
    case LIST_SELLER_PAID_AD_MESSAGES_SUCCESS:
      return {
        loading: false,
        success: true,
        sellerAdMessages: action.payload,
      };

    case LIST_SELLER_PAID_AD_MESSAGES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listBuyerFreeAdMessagesReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_BUYER_FREE_AD_MESSAGES_REQUEST:
      return { loading: true };
    case GET_BUYER_FREE_AD_MESSAGES_SUCCESS:
      return {
        loading: false,
        success: true,
        freeAdMessages: action.payload,
      };

    case GET_BUYER_FREE_AD_MESSAGES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listBuyerPaidAdMessagesReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_BUYER_PAID_AD_MESSAGES_REQUEST:
      return { loading: true };
    case GET_BUYER_PAID_AD_MESSAGES_SUCCESS:
      return {
        loading: false,
        success: true,
        paidAdMessages: action.payload,
      };

    case GET_BUYER_PAID_AD_MESSAGES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reportFreeAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPORT_FREE_AD_REQUEST:
      return { loading: true };
    case REPORT_FREE_AD_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REPORT_FREE_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reportPaidAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPORT_PAID_AD_REQUEST:
      return { loading: true };
    case REPORT_PAID_AD_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REPORT_PAID_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSellerShopfrontLinkReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_SHOPFRONT_LINK_REQUEST:
      return { loading: true };
    case GET_SELLER_SHOPFRONT_LINK_SUCCESS:
      return {
        loading: false,
        success: true,
        shopfrontLink: action.payload.shopfrontLink,
      };

    case GET_SELLER_SHOPFRONT_LINK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const searchAdsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_ADS_REQUEST:
      return { loading: true };
    case SEARCH_ADS_SUCCESS:
      return {
        loading: false,
        success: true,
        freeSearchAds: action.payload.free_ads,
        paidSearchAds: action.payload.paid_ads,
      };
    case SEARCH_ADS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSellerUsernameSearchReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_SELLER_USERNAME_SEARCH_REQUEST:
      return { loading: true };
    case GET_SELLER_USERNAME_SEARCH_SUCCESS:
      return {
        loading: false,
        success: true,
        serachResults: action.payload.data,
        sellerAvatarUrl: action.payload.seller_avatar_url,
      };

    case GET_SELLER_USERNAME_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSellerDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_DETAIL_REQUEST:
      return { loading: true };
    case GET_SELLER_DETAIL_SUCCESS:
      return {
        loading: false,
        success: true,
        sellerDetail: action.payload.data,
        sellerAvatarUrl: action.payload.seller_avatar_url,
      };

    case GET_SELLER_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSellerActivePaidAdsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_ACTIVE_PAID_ADS_REQUEST:
      return { loading: true };
    case GET_SELLER_ACTIVE_PAID_ADS_SUCCESS:
      return {
        loading: false,
        success: true,
        ads: action.payload,
      };

    case GET_SELLER_ACTIVE_PAID_ADS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSellerActiveFreeAdsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_ACTIVE_FREE_ADS_REQUEST:
      return { loading: true };
    case GET_SELLER_ACTIVE_FREE_ADS_SUCCESS:
      return {
        loading: false,
        success: true,
        ads: action.payload,
      };

    case GET_SELLER_ACTIVE_FREE_ADS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deactivateFreeAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEACTIVATE_FREE_AD_REQUEST:
      return { loading: true };
    case DEACTIVATE_FREE_AD_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DEACTIVATE_FREE_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reactivateFreeAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case REACTIVATE_FREE_AD_REQUEST:
      return { loading: true };
    case REACTIVATE_FREE_AD_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REACTIVATE_FREE_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const editFreeAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_FREE_AD_REQUEST:
      return { loading: true };
    case EDIT_FREE_AD_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case EDIT_FREE_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deactivatePaidAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEACTIVATE_PAID_AD_REQUEST:
      return { loading: true };
    case DEACTIVATE_PAID_AD_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DEACTIVATE_PAID_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reactivatePaidAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case REACTIVATE_PAID_AD_REQUEST:
      return { loading: true };
    case REACTIVATE_PAID_AD_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REACTIVATE_PAID_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const editPaidAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PAID_AD_REQUEST:
      return { loading: true };
    case EDIT_PAID_AD_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case EDIT_PAID_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createPaidAdMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PAID_AD_MESSAGE_REQUEST:
      return { loading: true };
    case CREATE_PAID_AD_MESSAGE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CREATE_PAID_AD_MESSAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listPaidAdMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_PAID_AD_MESSAGE_REQUEST:
      return { loading: true };
    case LIST_PAID_AD_MESSAGE_SUCCESS:
      return { loading: false, success: true, adMessages: action.payload };
    case LIST_PAID_AD_MESSAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createFreeAdMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FREE_AD_MESSAGE_REQUEST:
      return { loading: true };
    case CREATE_FREE_AD_MESSAGE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CREATE_FREE_AD_MESSAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listFreeAdMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_FREE_AD_MESSAGE_REQUEST:
      return { loading: true };
    case LIST_FREE_AD_MESSAGE_SUCCESS:
      return { loading: false, success: true, adMessages: action.payload };
    case LIST_FREE_AD_MESSAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSellerApiKeyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_API_KEY_REQUEST:
      return { loading: true };
    case GET_SELLER_API_KEY_SUCCESS:
      return { loading: false, success: true, sellerApiKey: action.payload };
    case GET_SELLER_API_KEY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateSellerApiKeyReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SELLER_API_KEY_REQUEST:
      return { loading: true };
    case UPDATE_SELLER_API_KEY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_SELLER_API_KEY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getFreeAdDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FREE_AD_DETAIL_REQUEST:
      return { loading: true };
    case GET_FREE_AD_DETAIL_SUCCESS:
      return {
        loading: false,
        success: true,
        ads: action.payload.data,
        sellerApiKey: action.payload.sellerApiKey,
        sellerAvatarUrl: action.payload.seller_avatar_url,
        isSellerVerified: action.payload.is_seller_verified,
        sellerRating: action.payload.seller_rating,
        sellerReviewCount: action.payload.seller_review_count,
      };
    case GET_FREE_AD_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getPaidAdDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAID_AD_DETAIL_REQUEST:
      return { loading: true };
    case GET_PAID_AD_DETAIL_SUCCESS:
      return {
        loading: false,
        success: true,
        ads: action.payload.data,
        sellerApiKey: action.payload.sellerApiKey,
        sellerAvatarUrl: action.payload.seller_avatar_url,
        isSellerVerified: action.payload.is_seller_verified,
        sellerRating: action.payload.seller_rating,
        sellerReviewCount: action.payload.seller_review_count,
      };
    case GET_PAID_AD_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getFreeAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FREE_AD_REQUEST:
      return { loading: true };
    case GET_FREE_AD_SUCCESS:
      return {
        loading: false,
        success: true,
        ads: action.payload,
      };

    case GET_FREE_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateFreeAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FREE_AD_REQUEST:
      return { loading: true };
    case UPDATE_FREE_AD_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_FREE_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteFreeAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_FREE_AD_REQUEST:
      return { loading: true };
    case DELETE_FREE_AD_SUCCESS:
      return { loading: false, success: true };
    case DELETE_FREE_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllFreeAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FREE_AD_REQUEST:
      return { loading: true };
    case GET_ALL_FREE_AD_SUCCESS:
      return {
        loading: false,
        success: true,
        freeAds: action.payload,
      };
    case GET_ALL_FREE_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getPaidAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAID_AD_REQUEST:
      return { loading: true };
    case GET_PAID_AD_SUCCESS:
      return { loading: false, success: true, ads: action.payload };
    case GET_PAID_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updatePaidAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PAID_AD_REQUEST:
      return { loading: true };
    case UPDATE_PAID_AD_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_PAID_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deletePaidAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PAID_AD_REQUEST:
      return { loading: true };
    case DELETE_PAID_AD_SUCCESS:
      return { loading: false, success: true };
    case DELETE_PAID_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllPaidAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PAID_AD_REQUEST:
      return { loading: true };
    case GET_ALL_PAID_AD_SUCCESS:
      return { loading: false, success: true, paidAds: action.payload };
    case GET_ALL_PAID_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postPaidAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_PAID_AD_REQUEST:
      return { loading: true };
    case POST_PAID_AD_SUCCESS:
      return { loading: false, success: true };
    case POST_PAID_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postFreeAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_FREE_AD_REQUEST:
      return { loading: true };
    case POST_FREE_AD_SUCCESS:
      return { loading: false, success: true };
    case POST_FREE_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSellerAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_ACCOUNT_REQUEST:
      return { loading: true };
    case GET_SELLER_ACCOUNT_SUCCESS:
      return { loading: false, success: true, sellerAccount: action.payload };
    case GET_SELLER_ACCOUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateSellerAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SELLER_ACCOUNT_REQUEST:
      return { loading: true };
    case UPDATE_SELLER_ACCOUNT_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_SELLER_ACCOUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const marketplaceSellerAccountReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CREATE_MARKETPLACE_SELLER_REQUEST:
      return { loading: true };
    case CREATE_MARKETPLACE_SELLER_SUCCESS:
      return { loading: false, success: true };
    case CREATE_MARKETPLACE_SELLER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const marketplaceSellerPhotoReducer = (state = initialState, action) => {
  switch (action.type) {
    case MARKETPLACE_SELLER_PHOTO_REQUEST:
      return { loading: true };
    case MARKETPLACE_SELLER_PHOTO_SUCCESS:
      return { loading: false, success: true };
    case MARKETPLACE_SELLER_PHOTO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSellerPhotoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_PHOTO_REQUEST:
      return { loading: true };
    case GET_SELLER_PHOTO_SUCCESS:
      return { loading: false, success: true, sellerPhoto: action.payload };
    case GET_SELLER_PHOTO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateSellerPhotoReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SELLER_PHOTO_REQUEST:
      return { loading: true };
    case UPDATE_SELLER_PHOTO_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_SELLER_PHOTO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
