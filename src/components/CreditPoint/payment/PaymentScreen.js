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
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import PaystackPayment from "./PaystackPayment";
import PaystackUsd from "./PaystackUsd";
import Paysofter from "./Paysofter";

const PaymentScreen = ({
  amount,
  currency,
  paysofterPublicKey,
  paystackPublicKey,
  userEmail,
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

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Payment Page</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.payButton}
            onPress={() => handlePaymentGatewaySelection("paystack")}
          >
            <Text style={styles.buttonText}>Pay with Paystack</Text>
          </TouchableOpacity>

          <View style={styles.infoButtonContainer}>
            <TouchableOpacity
              style={styles.infoButton}
              onPress={handleInfoModalShow}
            >
              <Text style={styles.infoButtonText}>ℹ️</Text>
            </TouchableOpacity>
            <Modal
              visible={showInfoModal}
              animationType="slide"
              onRequestClose={handleInfoModalClose}
            >
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
            </Modal>
          </View>

          <TouchableOpacity
            style={styles.payButton}
            onPress={() => handlePaymentGatewaySelection("paysofter")}
          >
            <Text style={styles.buttonText}>Pay with Paysofter</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.paymentContainer}>
          {currency === "NGN" && selectedPaymentGateway === "paystack" && (
            <PaystackPayment
              currency={currency}
              amount={amount}
              userEmail={userEmail}
              paystackPublicKey={paystackPublicKey}
            />
          )}

          {currency === "USD" && selectedPaymentGateway === "paystack-usd" && (
            <PaystackUsd
              currency={currency}
              amount={amount}
              userEmail={userEmail}
              paystackPublicKey={paystackPublicKey}
            />
          )}

          {selectedPaymentGateway === "paysofter" && (
            <Paysofter
              userEmail={userEmail}
              currency={currency}
              amount={amount}
              paysofterPublicKey={paysofterPublicKey}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    marginVertical: 20,
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
  payButton: {
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
  modalContent: {
    padding: 20,
    alignItems: "center",
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
});

export default PaymentScreen;
