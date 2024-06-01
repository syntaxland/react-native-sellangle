// PaysofterUsdAccountFund.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faInfoCircle, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { debitPaysofterUsdAccountFund } from "../../../redux/actions/paymentActions";
import VerifyUsdAccountFundOtp from "./VerifyUsdAccountFundOtp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Message from "../../../Message";
import Loader from "../../../Loader";
import { formatAmount } from "../../../FormatAmount";

const PaysofterUsdAccountFund = ({
  amount,
  paymentData,
  reference,
  userEmail,
  paysofterPublicKey,
  duration,
  paymenthMethod,
  currency,
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

  const debitPaysofterUsdAccountState = useSelector((state) => state.debitPaysofterUsdAccountState);
  const { loading, success, formattedPayerEmail, error } = debitPaysofterUsdAccountState;

  const [accountId, setAccountId] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showAccountInfoModal, setShowAccountInfoModal] = useState(false);
  const [showSecurityCodeModal, setShowSecurityCodeModal] = useState(false);
  const [showVerifyUsdAccountFundOtp, setShowVerifyUsdAccountFundOtp] = useState(false);
  const [securityCodeVisible, setSecurityCodeVisible] = useState(false);

  const handleAccountInfoModalShow = () => setShowAccountInfoModal(true);
  const handleAccountInfoModalClose = () => setShowAccountInfoModal(false);
  const handleSecurityCodeModalShow = () => setShowSecurityCodeModal(true);
  const handleSecurityCodeModalClose = () => setShowSecurityCodeModal(false);
  const toggleSecurityCodeVisibility = () => setSecurityCodeVisible(!securityCodeVisible);
  const handleInfoModalShow = () => setShowInfoModal(true);
  const handleInfoModalClose = () => setShowInfoModal(false);

  const debitUsdAccountData = {
    account_id: accountId,
    security_code: securityCode,
    amount: amount,
    public_api_key: paysofterPublicKey,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await AsyncStorage.setItem("debitUsdAccountData", JSON.stringify(debitUsdAccountData));
      dispatch(debitPaysofterUsdAccountFund(debitUsdAccountData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setShowVerifyUsdAccountFundOtp(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      console.error("Error verifying account");
    }
  }, [success]);

  console.log("PaysofterUsdAccountFund")

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {showVerifyUsdAccountFundOtp ? (
        <VerifyUsdAccountFundOtp
          amount={amount}
          paymentData={paymentData}
          reference={reference}
          currency={currency}
          userEmail={userEmail}
          paysofterPublicKey={paysofterPublicKey}
          securityCode={securityCode}
          accountId={accountId}
          formattedPayerEmail={formattedPayerEmail}
          duration={duration}
          paymenthMethod={paymenthMethod}
        />
      ) : (
        <>
          <View style={styles.header}>
            <View style={styles.labelContainer}>
              <Text style={styles.title}>Paysofter Account Fund (USD)</Text>
              <TouchableOpacity onPress={handleAccountInfoModalShow}>
                <FontAwesomeIcon icon={faInfoCircle} size={16} />
              </TouchableOpacity>
            </View>
          </View>

          <Modal
            visible={showAccountInfoModal}
            onRequestClose={handleAccountInfoModalClose}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Paysofter Account Fund</Text>
                <Text style={styles.modalText}>
                  Paysofter Account Fund option settles payments using the payer's funded Paysofter Account Fund.
                </Text>
                <Button title="Learn more" onPress={() => Linking.openURL("https://paysofter.com/")} />
                <Button title="Close" onPress={handleAccountInfoModalClose} />
              </View>
            </View>
          </Modal>

          {success && <Message variant="success">OTP sent to your email {formattedPayerEmail} successfully.</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}

          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Account ID </Text>
              <TouchableOpacity onPress={handleInfoModalShow}>
                <FontAwesomeIcon icon={faInfoCircle} size={16} />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                placeholder="Enter Paysofter Account ID"
                value={accountId}
                onChangeText={(text) => setAccountId(text)}
                maxLength={12}
              />
            </View>
          </View>

          <Modal
            visible={showInfoModal}
            onRequestClose={handleInfoModalClose}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Paysofter Account ID</Text>
                <Text style={styles.modalText}>
                  A uniquely assigned 12-digit Paysofter Account ID. Don't have a Paysofter account? You're just about 3
                  minutes away!
                </Text>
                <Button title="Create A Free Account" onPress={() => Linking.openURL("https://paysofter.com/register/")} />
                <Button title="Close" onPress={handleInfoModalClose} />
              </View>
            </View>
          </Modal>

          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Security Code </Text>
              <TouchableOpacity onPress={handleSecurityCodeModalShow}>
                <FontAwesomeIcon icon={faInfoCircle} size={16} />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                placeholder="Enter Account Security Code"
                value={securityCode}
                onChangeText={(text) => setSecurityCode(text)}
                secureTextEntry={!securityCodeVisible}
                maxLength={4}
              />
              <TouchableOpacity onPress={toggleSecurityCodeVisibility}>
                <Text>
                  {securityCodeVisible ? (
                    <FontAwesomeIcon icon={faEyeSlash} size={16} style={styles.icon} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} size={16} style={styles.icon} />
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Modal
            visible={showSecurityCodeModal}
            onRequestClose={handleSecurityCodeModalClose}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Paysofter Account Security Code</Text>
                <Text style={styles.modalText}>
                  A 4-digit randomly generated Paysofter Account Security Code that expires at a given time. Having issue
                  applying the security code? Refresh your paysofter account page, logout and login, or clear browsing data.
                </Text>
                <Button title="Learn More" onPress={() => Linking.openURL("https://paysofter.com/")} />
                <Button title="Close" onPress={handleSecurityCodeModalClose} />
              </View>
            </View>
          </Modal>

          <View style={styles.submitContainer}>
            <TouchableOpacity onPress={submitHandler}>
              <Text style={styles.roundedPrimaryBtn}>{`Pay (${formatAmount(amount)} ${currency})`}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  icon: {
    marginLeft: 10,
  },
  submitContainer: {
    marginTop: 20,
  },
  roundedPrimaryBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    textAlign: "center",
    padding: 10,
    borderRadius: 25,
    fontWeight: "bold",
  },
});

export default PaysofterUsdAccountFund;
