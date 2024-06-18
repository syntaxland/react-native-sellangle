// paymentActions.js
import axios from "axios";
import {
  PAYMENT_CREATE_REQUEST,
  PAYMENT_CREATE_SUCCESS,
  PAYMENT_CREATE_FAIL,
  PAYMENT_LIST_REQUEST,
  PAYMENT_LIST_SUCCESS,
  PAYMENT_LIST_FAIL,
  LIST_ALL_PAYMENTS_REQUEST,
  LIST_ALL_PAYMENTS_SUCCESS,
  LIST_ALL_PAYMENTS_FAIL,
  PAYSOFTER_PAYMENT_CREATE_REQUEST,
  PAYSOFTER_PAYMENT_CREATE_SUCCESS,
  PAYSOFTER_PAYMENT_CREATE_FAIL,
  RESET_PAYSOFTER_PAYMENT_STATE,
  DEBIT_PAYSOFTER_ACCOUNT_REQUEST,
  DEBIT_PAYSOFTER_ACCOUNT_SUCCESS,
  DEBIT_PAYSOFTER_ACCOUNT_FAIL,
  RESET_DEBIT_PAYSOFTER_NGN_STATE,
  CREATE_PAYSOFTER_PROMISE_REQUEST,
  CREATE_PAYSOFTER_PROMISE_SUCCESS,
  CREATE_PAYSOFTER_PROMISE_FAIL,
  RESET_CREATE_PAYSOFTER_PROMISE_STATE,
  GET_PAYMENT_API_KEYS_REQUEST,
  GET_PAYMENT_API_KEYS_SUCCESS,
  GET_PAYMENT_API_KEYS_FAIL,
  DEBIT_PAYSOFTER_USD_ACCOUNT_REQUEST,
  DEBIT_PAYSOFTER_USD_ACCOUNT_SUCCESS,
  DEBIT_PAYSOFTER_USD_ACCOUNT_FAIL,
  RESET_DEBIT_PAYSOFTER_USD_STATE,
} from "../constants/paymentConstants";

import {
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL,
  RESET_VERIFY_OTP_STATE,
  VERIFY_USD_OTP_REQUEST,
  VERIFY_USD_OTP_SUCCESS,
  VERIFY_USD_OTP_FAIL,
  RESET_VERIFY_USD_OTP_STATE,
} from "../constants/accountFundOtpConstants";

// const API_URL = process.env.REACT_APP_API_URL;
import { API_URL, PAYSOFTER_API_URL } from "../../config/apiConfig";

export const debitPaysofterAccountFund =
  (debitAccountData) =>
  async (
    dispatch
    // getState
  ) => {
    try {
      dispatch({
        type: DEBIT_PAYSOFTER_ACCOUNT_REQUEST,
      });

      // const {
      //   userLogin: { userInfo },
      // } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${PAYSOFTER_API_URL}/api/debit-user-account-balance/`,
        debitAccountData,
        config
      );

      dispatch({
        type: DEBIT_PAYSOFTER_ACCOUNT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DEBIT_PAYSOFTER_ACCOUNT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const resetDebitPaysofterNgnState = () => (dispatch) => {
  dispatch({ type: RESET_DEBIT_PAYSOFTER_NGN_STATE });
};

export const debitPaysofterUsdAccountFund =
  (debitUsdAccountData) =>
  async (
    dispatch
    // getState
  ) => {
    try {
      dispatch({
        type: DEBIT_PAYSOFTER_USD_ACCOUNT_REQUEST,
      });

      // const {
      //   userLogin: { userInfo },
      // } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${PAYSOFTER_API_URL}/api/debit-user-usd-account-fund/`,
        debitUsdAccountData,
        config
      );

      dispatch({
        type: DEBIT_PAYSOFTER_USD_ACCOUNT_SUCCESS,
        payload: data,
      });
      // window.location.reload();
      // window.location.href = "/verify-account-fund-otp";
    } catch (error) {
      dispatch({
        type: DEBIT_PAYSOFTER_USD_ACCOUNT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const resetDebitPaysofterUsdState = () => (dispatch) => {
  dispatch({ type: RESET_DEBIT_PAYSOFTER_USD_STATE });
};

export const verifyOtp = (otpData) => async (dispatch) => {
  try {
    dispatch({
      type: VERIFY_OTP_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${PAYSOFTER_API_URL}/api/verify-otp/`,
      { otpData },
      config
    );

    dispatch({
      type: VERIFY_OTP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VERIFY_OTP_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const resetVerifyOtpState = () => (dispatch) => {
  dispatch({ type: RESET_VERIFY_OTP_STATE });
};

export const verifyUsdOtp = (otpData) => async (dispatch) => {
  try {
    dispatch({
      type: VERIFY_USD_OTP_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${PAYSOFTER_API_URL}/api/verify-usd-account-debit-email-otp/`,
      { otpData },
      config
    );

    dispatch({
      type: VERIFY_USD_OTP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VERIFY_USD_OTP_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const resetVerifyUsdOtpState = () => (dispatch) => {
  dispatch({ type: RESET_VERIFY_USD_OTP_STATE });
};

export const getPaymentApiKeys = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_PAYMENT_API_KEYS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-payment-details/`,
      config
    );

    dispatch({
      type: GET_PAYMENT_API_KEYS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PAYMENT_API_KEYS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createPayment = (paymentData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYMENT_CREATE_REQUEST,
    });

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
      `${API_URL}/api/create-payment/`,
      paymentData,
      config
    );

    dispatch({
      type: PAYMENT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// export const resetCreatePaymentState = () => (dispatch) => {
//   dispatch({ type: RESET_PAYMENT_CREATE_STATE });
// };

export const createPaysofterPayment =
  (paysofterPaymentData) => async (dispatch) => {
    try {
      dispatch({
        type: PAYSOFTER_PAYMENT_CREATE_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${PAYSOFTER_API_URL}/api/initiate-transaction/`,
        paysofterPaymentData,
        config
      );

      dispatch({
        type: PAYSOFTER_PAYMENT_CREATE_SUCCESS,
        payload: data,
      });
      // window.location.reload();
      // window.location.href = "/dashboard/users";
    } catch (error) {
      dispatch({
        type: PAYSOFTER_PAYMENT_CREATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const resetCreatePaysofterPaymentState = () => (dispatch) => {
  dispatch({ type: RESET_PAYSOFTER_PAYMENT_STATE });
};

export const createPaysofterPromise =
  (paysofterPromiseData) => async (dispatch) => {
    try {
      dispatch({
        type: CREATE_PAYSOFTER_PROMISE_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${PAYSOFTER_API_URL}/api/create-promise/`,
        paysofterPromiseData,
        config
      );

      dispatch({
        type: CREATE_PAYSOFTER_PROMISE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_PAYSOFTER_PROMISE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const resetCreatePaysofterPromiseState = () => (dispatch) => {
  dispatch({ type: RESET_CREATE_PAYSOFTER_PROMISE_STATE });
};

export const listPayments = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYMENT_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-user-payments/`,
      config
    );

    dispatch({
      type: PAYMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getAllPaymentsList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LIST_ALL_PAYMENTS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-all-payments/`,
      config
    );

    dispatch({
      type: LIST_ALL_PAYMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_ALL_PAYMENTS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
