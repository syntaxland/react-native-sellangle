// VerifyUsdAccountFundOtp.js
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  createPaysofterPayment,
  resetCreatePaysofterPaymentState,
  debitPaysofterUsdAccountFund,
  resetDebitPaysofterUsdState,
  verifyUsdOtp,
  resetVerifyUsdOtpState,
} from "../../../redux/actions/paymentActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../../Loader";
import Message from "../../../Message";

const VerifyUsdAccountFundOtp = ({
  amount,
  reference,
  email,
  currency,
  paysofterPublicKey,
  formattedPayerEmail,
  onSuccess,
  onClose,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const [otp, setOtp] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const createdAt = new Date().toISOString();
  const [hasHandledSuccess, setHasHandledSuccess] = useState(false);

  const otpVerifyUsdState = useSelector((state) => state.otpVerifyUsdState);
  const { loading, success, error } = otpVerifyUsdState;

  const paysofterPayment = useSelector((state) => state.paysofterPayment);
  const {
    success: paysofterPaymentSuccess,
    error: paysofterPaymentError,
    loading: paysofterPaymentLoading,
  } = paysofterPayment;

  const [sendOtpData, setSendOtpData] = useState(null);

  useEffect(() => {
    const fetchSendOtpData = async () => {
      const data = await AsyncStorage.getItem("debitUsdAccountData");
      setSendOtpData(JSON.parse(data));
    };
    fetchSendOtpData();
  }, []);

  const paysofterPaymentData = {
    payment_id: reference,
    email: email,
    amount: amount,
    currency: currency,
    public_api_key: paysofterPublicKey,
    created_at: createdAt,
  };

  const otpData = {
    otp: otp,
    account_id: sendOtpData?.account_id,
    amount: amount,
    currency: currency,
  };

  const debitUsdAccountData = {
    account_id: sendOtpData?.account_id,
    security_code: sendOtpData?.security_code,
    amount: amount,
    currency: currency,
  };

  const handleVerifyEmailOtp = () => {
    dispatch(verifyUsdOtp(otpData));
  };

  const handleResendEmailOtp = async () => {
    setResendLoading(true);
    setResendMessage("");
    try {
      await dispatch(
        debitPaysofterUsdAccountFund(JSON.stringify(debitUsdAccountData))
      );
      setResendMessage(`OTP resent to ${formattedPayerEmail} successfully.`);
      setResendDisabled(true);
    } catch (error) {
      setResendMessage("Error resending OTP. Please try again.");
    }
    setResendLoading(false);
  };

  useEffect(() => {
    let timer;
    if (countdown > 0 && resendDisabled) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    } else if (!resendDisabled) {
      setCountdown(60);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [countdown, resendDisabled]);

  const creditPointData = {
    amount: amount,
  };

  useEffect(() => {
    if (success) {
      dispatch(createPaysofterPayment(paysofterPaymentData));
    }
  }, [success, dispatch]);

  const handleOnSuccess = useCallback(() => {
    onSuccess();
  }, [onSuccess]);

  const handleOnClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (paysofterPaymentSuccess && !hasHandledSuccess) {
      setShowSuccessMessage(true);
      setHasHandledSuccess(true);
      handleOnSuccess();
      dispatch(resetCreatePaysofterPaymentState());
      dispatch(resetVerifyUsdOtpState());
      dispatch(resetDebitPaysofterUsdState());
      AsyncStorage.removeItem("debitUsdAccountData");
      setTimeout(() => {
        setShowSuccessMessage(false);
        handleOnClose();
      }, 3000);
    }
  }, [
    dispatch,
    paysofterPaymentSuccess,
    handleOnSuccess,
    hasHandledSuccess,

    handleOnClose,
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Verify OTP ({currency})</Text>
      {showSuccessMessage && (
        <Message variant="success">Payment made successfully!</Message>
      )}
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      {paysofterPaymentLoading && <Loader />}
      {paysofterPaymentError && <Message variant="danger">{error}</Message>}

      {resendMessage && (
        <Message variant={resendLoading ? "info" : "success"}>
          {resendMessage}
        </Message>
      )}

      <TextInput
        style={styles.input}
        value={otp}
        onChangeText={(text) => setOtp(text)}
        placeholder="Enter OTP"
        keyboardType="numeric"
      />
      <Button
        onPress={handleVerifyEmailOtp}
        title="Verify OTP"
        disabled={otp === "" || loading || success}
        color="#28a745"
      />
      <Text style={styles.otpInfo}>
        OTP has been sent to email: {formattedPayerEmail} for Paysofter Account
        ID: {sendOtpData?.account_id} and expires in 10 minutes. It might take a
        few seconds to deliver.
      </Text>
      <TouchableOpacity
        onPress={handleResendEmailOtp}
        disabled={resendDisabled || resendLoading}
      >
        <Text style={styles.resendText}>
          {resendLoading
            ? "Resending OTP..."
            : resendDisabled
            ? `Resend OTP (${countdown}sec)`
            : "Resend OTP"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 20,
  },
  otpInfo: {
    textAlign: "center",
    marginVertical: 20,
  },
  resendText: {
    color: "#007bff",
    textAlign: "center",
    marginTop: 20,
  },
  message: {
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
});

export default VerifyUsdAccountFundOtp;
