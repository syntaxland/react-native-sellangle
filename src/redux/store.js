// store.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  productListReducers,
  productDetailsReducers,
  // productTrackSaveReducer, 
  saveProductReducer,
  userFavoriteProductsReducer,
  userViewedProductsReducer,
  removeProductReducer,
  updateProductSaveCountReducer,
  viewedProductReducer,
  recommendedProductsReducer,
  productSearchReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducers } from "./reducers/userReducers";
import { userRegisterReducers } from "./reducers/userReducers";
import {
  marketplaceSellerAccountReducer,
  marketplaceSellerPhotoReducer,
  getSellerAccountReducer,
  updateSellerAccountReducer,
  getSellerPhotoReducer,
  updateSellerPhotoReducer,
  postFreeAdReducer,
  postPaidAdReducer,
  getFreeAdReducer,
  updateFreeAdReducer,
  getAllFreeAdReducer,
  getPaidAdReducer,
  updatePaidAdReducer,
  getAllPaidAdReducer,
  deleteFreeAdReducer,
  deletePaidAdReducer,
  getFreeAdDetailReducer,
  getSellerApiKeyReducer,
  updateSellerApiKeyReducer,
  getPaidAdDetailReducer,
  createPaidAdMessageReducer,
  editPaidAdReducer,
  deactivatePaidAdReducer,
  reactivatePaidAdReducer,
  deactivateFreeAdReducer,
  getSellerActivePaidAdsReducer,
  getSellerActiveFreeAdsReducer,
  reactivateFreeAdReducer,
  editFreeAdReducer,
  getSellerUsernameSearchReducer,
  searchAdsReducer,
  getSellerShopfrontLinkReducer,
  getSellerDetailReducer,
  listPaidAdMessageReducer,
  createFreeAdMessageReducer,
  listFreeAdMessageReducer,
  sellerReplyFreeAdMessageReducer,
  sellerReplyPaidAdMessageReducer,
  listSellerFreeAdMessagesReducer,
  listSellerPaidAdMessagesReducer,
  listBuyerFreeAdMessagesReducer,
  listBuyerPaidAdMessagesReducer,
  toggleFreeAdSaveReducer,
  togglePaidAdSaveReducer,
  toggleFollowSellerReducer,
  trackFreeAdViewReducer,
  trackPaidAdViewReducer,
  getUserViewedFreeAdsReducer,
  getUserViewedPaidAdsReducer,
  getUserSavedFreeAdsReducer,
  getUserSavedPaidAdsReducer,
  reviewFreeAdSellerReducer,
  reviewPaidAdSellerReducer,
  getFreeAdSellerReviewsReducer,
  getPaidAdSellerReviewsReducer,
  reportFreeAdReducer,
  reportPaidAdReducer,
  applyPomoCodeReducer,
  getSellerPaidAdChargesReducer,
  payAdChargesReducer,
  getAdChargesReceiptReducer,
  clearSellerFreeAdMsgCounterReducer,
  clearBuyerFreeAdMsgCounterReducer,
  clearSellerPaidAdMsgCounterReducer,
  clearBuyerPaidAdMsgCounterReducer,
  GetActiveBuyerFreeAdMessagesReducer,
  GetActiveBuyerPaidAdMessagesReducer,
  getSellerAdStatisticsReducer,
 getFollowedSellersReducer,

} from "./reducers/marketplaceSellerReducers";

import {
  orderCreateReducer,
  shipmentSaveReducer,
  userShipmentsReducer,
  allUserShipmentsReducer,
  orderListReducer,
  allOrderListReducer,
  orderDeleteReducer,
  orderItemsListReducer,
  confirmDeliveryReducer,
  // shippingAddressReducer,
  reviewListReducer,
  orderAddReviewReducer,
  orderEditReviewReducer,
} from "./reducers/orderReducers";

import {
  getPaymentApiKeysReducer,
  paymentCreateReducer,
  paysofterPaymentCreateReducer,
  debitPaysofterAccountReducer,
  debitPaysofterUsdAccountReducer,
  createPaysofterPromiseReducer,
  paymentListReducer,
  listAllPaymentsReducer,
} from "./reducers/paymentReducers";
// import { paymentListReducer } from './reducers/paymentReducers';
// import { adminPaymentListReducer } from './reducers/adminReducers';

import { favoriteReducer } from "./reducers/favoriteReducers";
import {
  createSupportTicketReducer,
  createSupportMessageReducer,
  listSupportTicketReducer,
  listSupportMessageReducer,
  replySupportTicketReducer,
  adminReplySupportTicketReducer, 
  listSupportTicketReplyReducer, 
  ticketDetailListReducer,
  allTicketListReducer,
  allTicketResponseReducer,
  clearUserSupportMsgCounterReducer,
  clearAdminSupportMsgCounterReducer,
} from "./reducers/supportReducers";
import {
  getUserProfileReducer,
  changePasswordReducer,
  updateUserProfileReducer,
  deleteUserProfileReducer,
  updateUserAvatarReducer,
  sendPasswordResetLinkReducer,
  resetPasswordReducer,
} from "./reducers/userProfileReducers";

import {
  emailOtpSendReducer,
  emailOtpVerifyReducer,
  emailOtpResendReducer,
} from "./reducers/emailOtpReducers";

import {
  otpSendReducer,
  otpVerifyReducer,
  otpVerifyUsdPromiseReducer,
} from "./reducers/accountFundOtpReducers";

import {
  buyCreditPointReducer,
  sellCreditPointReducer,
  getBuyCreditPointReducer,
  getBuyerCreditPointReducer,
  getSellCreditPointReducer,
  creditPointRequestCreateReducer,
  creditPointListReducer,
  creditPointAllListReducer,
  creditPointBalanceReducer,
  creditPointEarningsReducer,
  userCreditPointPaymentsReducer,
  allCreditPointPaymentsReducer,
  buyUsdCreditPointReducer,
  getUsdBuyCreditPointReducer,
  getAdCpsChargesReducer,
  getUserCpsBonusesReducer,
} from "./reducers/creditPointReducers";

import {
  messagingReducer,
  emailReducer,
  clearMessageCounterReducer,
  getUserMessagesReducer,
} from "./reducers/messagingReducers";
import {
  // chatReducer,
  chatRoomsReducer,
  chatMessagesReducer,
} from "./reducers/chatReducers";
import {
  referralReducer,
  referralButtonReducer,
  getUserReferralsReducer,
  createPromoCodeReducer,
  promoProductListReducer,
} from "./reducers/promoReducer";

import {
  feedbackCreateReducer,
  feedbackListReducer,
} from "./reducers/feedbackReducers";

import {
  getUserRecommendedFreeAdsReducer,
  getUserRecommendedPaidAdsReducer,
} from "./reducers/recommenderReducers";

const rootReducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  productSave: saveProductReducer,
  userFavoriteProducts: userFavoriteProductsReducer,
  userViewedProducts: userViewedProductsReducer,
  viewedProduct: viewedProductReducer,
  productRemove: removeProductReducer,
  updateProductSaveCount: updateProductSaveCountReducer,
  recommendedProducts: recommendedProductsReducer,
  productSearch: productSearchReducer,

  cart: cartReducer,
  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,

  orderCreate: orderCreateReducer,
  shipmentSave: shipmentSaveReducer,
  userShipments: userShipmentsReducer,
  allUserShipments: allUserShipmentsReducer,
  orderItemsList: orderItemsListReducer,
  confirmDelivery: confirmDeliveryReducer,
  // shippingAddress: shippingAddressReducer,

  reviewList: reviewListReducer,
  orderAddReview: orderAddReviewReducer,
  orderEditReview: orderEditReviewReducer,

  buyCreditPointState: buyCreditPointReducer,
  sellCreditPointState: sellCreditPointReducer,
  getBuyCreditPointState: getBuyCreditPointReducer,
  getBuyerCreditPointState: getBuyerCreditPointReducer, 
  buyUsdCreditPointState: buyUsdCreditPointReducer,
  getUsdBuyCreditPointState: getUsdBuyCreditPointReducer,
  getAdCpsChargesState: getAdCpsChargesReducer,
  getUserCpsBonusesState: getUserCpsBonusesReducer,

  getSellCreditPointState: getSellCreditPointReducer,
  creditPointRequestCreate: creditPointRequestCreateReducer,
  creditPointList: creditPointListReducer,
  creditPointAllList: creditPointAllListReducer,
  creditPointBal: creditPointBalanceReducer,
  userCreditPointPayments: userCreditPointPaymentsReducer,
  allCreditPointPayments: allCreditPointPaymentsReducer,
  creditPointEarningState: creditPointEarningsReducer,

  orderList: orderListReducer,
  allOrderList: allOrderListReducer,
  orderDelete: orderDeleteReducer,

  getPaymentApiKeysState: getPaymentApiKeysReducer,
  paymentCreate: paymentCreateReducer,
  paysofterPayment: paysofterPaymentCreateReducer,
  debitPaysofterAccountState: debitPaysofterAccountReducer,
  debitPaysofterUsdAccountState: debitPaysofterUsdAccountReducer,
  createPaysofterPromiseState: createPaysofterPromiseReducer,
  paymentList: paymentListReducer,
  listAllPayments: listAllPaymentsReducer,

  favorites: favoriteReducer,

  emailOtpSend: emailOtpSendReducer,
  emailOtpVerify: emailOtpVerifyReducer,
  emailOtpResend: emailOtpResendReducer,

  otpSendState: otpSendReducer,
  otpVerifyState: otpVerifyReducer,
  otpVerifyUsdState: otpVerifyUsdPromiseReducer,
  userProfile: getUserProfileReducer,
  updateProfile: updateUserProfileReducer,
  userChangePassword: changePasswordReducer,
  deleteProfile: deleteUserProfileReducer,
  updateUserAvatar: updateUserAvatarReducer,

  sendPasswordResetLink: sendPasswordResetLinkReducer,
  resetPassword: resetPasswordReducer,

  messaging: messagingReducer,
  emailMessaging: emailReducer,
  clearMessageCounterState: clearMessageCounterReducer,
  getUserMessagesState: getUserMessagesReducer,
  chatRooms: chatRoomsReducer,
  chatMessages: chatMessagesReducer,

  createSupportTicketState: createSupportTicketReducer,
  createSupportMessageState: createSupportMessageReducer,
  listSupportTicketState: listSupportTicketReducer,
  listSupportMessageState: listSupportMessageReducer,
  replySupportTicketState: replySupportTicketReducer,
  adminReplySupportTicketState: adminReplySupportTicketReducer,
  listSupportTicketReplyState: listSupportTicketReplyReducer,
  ticketDetailList: ticketDetailListReducer,
  allTicketList: allTicketListReducer,
  allTicketResponse: allTicketResponseReducer,
  clearUserSupportMsgCounterState: clearUserSupportMsgCounterReducer,
  clearAdminSupportMsgCounterState: clearAdminSupportMsgCounterReducer,

  feedbackCreate: feedbackCreateReducer,
  feedbackList: feedbackListReducer,

  referral: referralReducer,
  referralButton: referralButtonReducer,
  userReferralState: getUserReferralsReducer,
  createPromoCodeState: createPromoCodeReducer,
  promoProductList: promoProductListReducer,

  marketplaceSellerState: marketplaceSellerAccountReducer,
  marketplaceSellerPhotoState: marketplaceSellerPhotoReducer,
  getSellerAccountState: getSellerAccountReducer,
  updateSellerAccountState: updateSellerAccountReducer,
  getSellerPhotoState: getSellerPhotoReducer,
  updateSellerPhotoState: updateSellerPhotoReducer,
  postFreeAdState: postFreeAdReducer,
  postPaidAdState: postPaidAdReducer,

  getFreeAdState: getFreeAdReducer,
  updateFreeAdState: updateFreeAdReducer,
  getAllFreeAdState: getAllFreeAdReducer,
  getPaidAdState: getPaidAdReducer,
  updatePaidAdState: updatePaidAdReducer,
  getAllPaidAdState: getAllPaidAdReducer,
  deleteFreeAdState: deleteFreeAdReducer,
  deletePaidAdState: deletePaidAdReducer,

  getFreeAdDetailState: getFreeAdDetailReducer,
  getSellerApiKeyState: getSellerApiKeyReducer,
  updateSellerApiKeyState: updateSellerApiKeyReducer,
  getPaidAdDetailState: getPaidAdDetailReducer,

  editPaidAdState: editPaidAdReducer,
  deactivatePaidAdState: deactivatePaidAdReducer,
  reactivatePaidAdState: reactivatePaidAdReducer,

  deactivateFreeAdState: deactivateFreeAdReducer,
  getSellerActivePaidAdsState: getSellerActivePaidAdsReducer,
  getSellerActiveFreeAdsState: getSellerActiveFreeAdsReducer,
  reactivateFreeAdState: reactivateFreeAdReducer,
  editFreeAdState: editFreeAdReducer,

  getSellerUsernameSearchState: getSellerUsernameSearchReducer,
  searchAdsState: searchAdsReducer,
  getSellerShopfrontLinkState: getSellerShopfrontLinkReducer,
  getSellerDetailState: getSellerDetailReducer,

  createPaidAdMessageState: createPaidAdMessageReducer,
  listPaidAdMessageState: listPaidAdMessageReducer,
  createFreeAdMessageState: createFreeAdMessageReducer,
  listFreeAdMessageState: listFreeAdMessageReducer,

  sellerReplyFreeAdMessageState: sellerReplyFreeAdMessageReducer,
  sellerReplyPaidAdMessageState: sellerReplyPaidAdMessageReducer,
  listSellerFreeAdMessagesState: listSellerFreeAdMessagesReducer,
  listSellerPaidAdMessagesState: listSellerPaidAdMessagesReducer,
  listBuyerFreeAdMessagesState: listBuyerFreeAdMessagesReducer,
  listBuyerPaidAdMessagesState: listBuyerPaidAdMessagesReducer,

  toggleFreeAdSaveState: toggleFreeAdSaveReducer,
  togglePaidAdSaveState: togglePaidAdSaveReducer,
  toggleFollowSellerState: toggleFollowSellerReducer,
  trackFreeAdViewState: trackFreeAdViewReducer,
  trackPaidAdViewState: trackPaidAdViewReducer,

  getUserViewedFreeAdsState: getUserViewedFreeAdsReducer,
  getUserViewedPaidAdsState: getUserViewedPaidAdsReducer,
  getUserSavedFreeAdsState: getUserSavedFreeAdsReducer,
  getUserSavedPaidAdsState: getUserSavedPaidAdsReducer,

  getUserRecommendedFreeAdsState: getUserRecommendedFreeAdsReducer,
  getUserRecommendedPaidAdsState: getUserRecommendedPaidAdsReducer,

  reviewFreeAdSellerState: reviewFreeAdSellerReducer,
  reviewPaidAdSellerState: reviewPaidAdSellerReducer,
  getFreeAdSellerReviewsState: getFreeAdSellerReviewsReducer,
  getPaidAdSellerReviewsState: getPaidAdSellerReviewsReducer,

  reportFreeAdState: reportFreeAdReducer,
  reportPaidAdState: reportPaidAdReducer,

  getSellerPaidAdChargesState: getSellerPaidAdChargesReducer,
  payAdChargesState: payAdChargesReducer,
  getAdChargesReceiptState: getAdChargesReceiptReducer,

  clearSellerFreeAdMsgCounterState: clearSellerFreeAdMsgCounterReducer,
  clearBuyerFreeAdMsgCounterState: clearBuyerFreeAdMsgCounterReducer,
  clearSellerPaidAdMsgCounterState: clearSellerPaidAdMsgCounterReducer,
  clearBuyerPaidAdMsgCounterState: clearBuyerPaidAdMsgCounterReducer,

  GetActiveBuyerFreeAdMessageState: GetActiveBuyerFreeAdMessagesReducer,
  GetActiveBuyerPaidAdMessageState: GetActiveBuyerPaidAdMessagesReducer,

  getSellerAdStatState: getSellerAdStatisticsReducer,
  getFollowedSellersState: getFollowedSellersReducer,

  applyPromoCodeState: applyPomoCodeReducer,
});

// Function to initialize the store asynchronously
export const initializeStore = async () => {
 
  // Get userInfo from AsyncStorage
  const getUserInfo = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("userInfo");
      return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
      console.error("Error getting user info from AsyncStorage:", error);
      return null;
    }
  };

  // Get userRegister data from AsyncStorage
  const getUserRegisterData = async () => {
    try {
      const registerData = await AsyncStorage.getItem("registerData");
      return registerData ? JSON.parse(registerData) : null;
    } catch (error) {
      console.error("Error getting register data from AsyncStorage:", error);
      return null;
    }
  };

  // Initial state with data from AsyncStorage
  const initialState = {
    userLogin: { userInfo: await getUserInfo() },
    userRegister: { registerData: await getUserRegisterData() },
  };

  // Create and return the Redux store 
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
};
