// VerifyAccountFundOtp.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  createPaysofterPayment,
  resetCreatePaysofterPaymentState,
  debitPaysofterAccountFund,
  resetDebitPaysofterState,
  verifyOtp,
  resetVerifyOtpState,
} from "../../../redux/actions/paymentActions";
import {
  buyCreditPoint,
  resetbuyCreditPointState,
} from "../../../redux/actions/creditPointActions";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../../Loader";
import Message from "../../../Message";

const VerifyAccountFundOtp = ({
  // paymentData,
  reference,
  userEmail,
  amount,
  currency,
  paysofterPublicKey,
  formattedPayerEmail,
}) => {
  const [otp, setOtp] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const createdAt = new Date().toISOString();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const otpVerifyState = useSelector((state) => state.otpVerifyState);
  const { loading, success, error } = otpVerifyState;

  const buyCreditPointState = useSelector((state) => state.buyCreditPointState);
  const {
    success: buyCreditPointSuccess,
    error: buyCreditPointError,
    loading: buyCreditPointLoading,
  } = buyCreditPointState;

  const paysofterPayment = useSelector((state) => state.paysofterPayment);
  const {
    success: paysofterPaymentSuccess,
    // error: paysofterPaymentError,
    // loading:paysofterPaymentLoading,
  } = paysofterPayment;

  const [sendOtpData, setSendOtpData] = useState(null);

  useEffect(() => {
    const fetchSendOtpData = async () => {
      const data = await AsyncStorage.getItem("debitAccountData");
      setSendOtpData(JSON.parse(data));
    };
    fetchSendOtpData();
  }, []);

  const paysofterPaymentData = {
    payment_id: reference,
    email: userEmail,
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

  const debitAccountData = {
    account_id: sendOtpData?.account_id,
    security_code: sendOtpData?.security_code,
    amount: amount,
    currency: currency,
  };

  const handleVerifyEmailOtp = () => {
    dispatch(verifyOtp(otpData));
  };

  const handleResendEmailOtp = async () => {
    setResendLoading(true);
    setResendMessage("");
    try {
      await dispatch(
        debitPaysofterAccountFund(JSON.stringify(debitAccountData))
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
      dispatch(buyCreditPoint(creditPointData));
    }
  }, [dispatch, success, navigation]);

  useEffect(() => {
    if (buyCreditPointSuccess && paysofterPaymentSuccess) {
      setShowSuccessMessage(true);
      dispatch(resetCreatePaysofterPaymentState());
      dispatch(resetDebitPaysofterState());
      dispatch(resetVerifyOtpState());
      dispatch(resetbuyCreditPointState());
      AsyncStorage.removeItem("debitAccountData");
      const timer = setTimeout(() => {
        navigation.navigate("Home");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, navigation, buyCreditPointSuccess, paysofterPaymentSuccess]);

  console.log(
    "VerifyAccountFundOtp paysofterPaymentData",
    paysofterPaymentData
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Verify OTP ({currency})</Text>
      <View style={styles.message}>
        
        {showSuccessMessage && (
          <Message variant="success">Payment made successfully!</Message>
        )}
      </View>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {resendMessage && (
        <Message variant={resendLoading ? "info" : "success"}>
          {resendMessage}
        </Message>
      )}
      {buyCreditPointLoading && <Loader />}
      <View style={styles.message}>
        {buyCreditPointSuccess && (
          <Message variant="success">
            Your account has been credited with the CPS purchased for {amount}{" "}
            {currency}.
          </Message>
        )}
      </View>
      {buyCreditPointError && (
        <Message variant="danger">{buyCreditPointError}</Message>
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
        disabled={loading}
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

export default VerifyAccountFundOtp;
