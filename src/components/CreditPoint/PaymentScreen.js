// PaymentScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import PaystackPayment from "./payment/PaystackPayment";
import PaystackUsd from "./payment/PaystackUsd";
// import { Paysofter } from "../react-native-paysofter/src/index";
import { Paysofter } from "react-native-paysofter";

const PaymentScreen = ({
  amount,
  currency,
  paysofterPublicKey,
  paystackPublicKey,
  email,
  onSuccess,
  onClose,
}) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigation = useNavigation();

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleInfoModalShow = () => {
    setShowInfoModal(true);
  };

  const handleInfoModalClose = () => {
    setShowInfoModal(false);
  };

  const handlePaymentGatewaySelection = (paymentGateway) => {
    setSelectedPaymentGateway(paymentGateway);
  };

  console.log("amount:", currency, amount);
  console.log("apiKeys:", paystackPublicKey, paysofterPublicKey);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Payment Page</Text>

        <View style={styles.buttonContainer}>
          <View style={styles.labelContainer}>
            <TouchableOpacity
              style={styles.paystackBtn}
              onPress={() => handlePaymentGatewaySelection("paystack")}
            >
              <Text style={styles.buttonText}>Pay with Paystack</Text>
            </TouchableOpacity>

            <TouchableOpacity></TouchableOpacity>
          </View>

          <View style={styles.buttonGroup}>
            <Modal
              visible={showInfoModal}
              transparent={true}
              animationType="slide"
              onRequestClose={handleInfoModalClose}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalHeader}>Paysofter Account</Text>

                  <Text style={styles.modalBody}>
                    Don't have a Paysofter account? You're just about 3 minutes
                    away! Sign up for a much softer payment experience.
                  </Text>
                  <TouchableOpacity
                    style={styles.createAccountButton}
                    onPress={() => Linking.openURL("https://paysofter.com/")}
                  >
                    <Text style={styles.createAccountButtonText}>
                      Create A Free Account
                    </Text>
                  </TouchableOpacity>
                  <Button title="Close" onPress={handleInfoModalClose} />
                </View>
              </View>
            </Modal>
          </View>

          <View style={styles.labelContainer}>
            <TouchableOpacity
              style={styles.pasofterBtn}
              onPress={() => handlePaymentGatewaySelection("paysofter")}
            >
              <Text style={styles.buttonText}>Pay with Paysofter</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleInfoModalShow}>
              <FontAwesomeIcon
                icon={faInfoCircle}
                size={16}
                style={styles.icon}
                // color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.paymentContainer}>
          {currency === "NGN" && selectedPaymentGateway === "paystack" && (
            <PaystackPayment
              currency={currency}
              amount={amount}
              email={email}
              paystackPublicKey={paystackPublicKey}
              onSuccess={onSuccess}
              onClose={onClose}
            />
          )}

          {currency === "USD" && selectedPaymentGateway === "paystack-usd" && (
            <PaystackUsd
              currency={currency}
              amount={amount}
              email={email}
              paystackPublicKey={paystackPublicKey}
              onSuccess={onSuccess}
              onClose={onClose}
            />
          )}

          {selectedPaymentGateway === "paysofter" && (
            <Paysofter
              email={email}
              currency={currency}
              amount={amount}
              paysofterPublicKey={paysofterPublicKey}
              onSuccess={onSuccess}
              onClose={onClose}
              paymentRef={`PID${Math.floor(Math.random() * 100000000000000)}`}
              showPromiseOption={true}
              showFundOption={true}
              showCardOption={true}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // marginVertical: 20,
    // justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  buttonContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  paystackBtn: {
    backgroundColor: "#343a40",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  pasofterBtn: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  infoButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoButton: {
    backgroundColor: "#fff",
    borderColor: "#007bff",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 5,
  },
  infoButtonText: {
    color: "#007bff",
    fontSize: 16,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalBody: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  createAccountButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  createAccountButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  paymentContainer: {
    marginVertical: 20,
  },
  icon: {
    marginLeft: 5,
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
});

export default PaymentScreen;
