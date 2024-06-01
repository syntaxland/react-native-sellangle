// PaysofterButton.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import CardPayment from "./CardPayment";
import UssdPayment from "./UssdPayment";
import BankPayment from "./BankPayment";
import TransferPayment from "./TransferPayment";
import PaysofterAccountFund from "./PaysofterAccountFund";
import PaysofterUsdAccountFund from "./PaysofterUsdAccountFund";
import QrPayment from "./QrPayment";
import { formatAmount } from "../../../FormatAmount";

const PaysofterButton = ({
  showPaymentModal,
  setShowPaymentModal,
  reference,
  userEmail,
  amount,
  currency,
  paysofterPublicKey,
}) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const [selectedPaymentOption, setSelectedPaymentOption] = useState("card");
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const handlePaymentOptionChange = (option) => {
    setSelectedPaymentOption(option);
  };

  const handleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  console.log("PaysofterButton")

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.center}>
          <Button title="Pay Now" onPress={() => setShowPaymentModal(true)} />
        </View>

        <Modal
          visible={showPaymentModal}
          onRequestClose={() => setShowPaymentModal(false)}
        >
          <View style={styles.modalHeader}>
            {/* <Button onPress={() => setShowPaymentModal(false)} title="Close" /> */}
            {/* <TouchableOpacity onPress={() => setShowPaymentModal(false)}>
            <Text style={styles.closeButton}>
              <FontAwesomeIcon icon={faTimes} size={16} style={styles.icon} />{" "}
              Close
            </Text>
          </TouchableOpacity> */}

            <Text style={styles.modalTitle}>Mock Payment (Test)</Text>
            <Text>{userEmail}</Text>
            <Text>{`${formatAmount(amount)} ${currency}`}</Text>
          </View>

          <ScrollView>
            <View style={styles.options}>
              <Text>Options</Text>
              <Button
                title="Debit Card"
                onPress={() => handlePaymentOptionChange("card")}
                color={selectedPaymentOption === "card" ? "#007bff" : "gray"}
              />
              <Button
                title="Paysofter Account Fund"
                onPress={() => handlePaymentOptionChange("account-fund")}
                // disabled
                color={
                  selectedPaymentOption === "account-fund" ? "#007bff" : "gray"
                }
              />
              <Button
                title="Paysofter Promise"
                onPress={() => handlePaymentOptionChange("promise")}
                color={selectedPaymentOption === "promise" ? "#007bff" : "gray"}
                disabled
              />
              <Button
                title="More Options"
                onPress={handleMoreOptions}
                disabled
              />

              {showMoreOptions && (
                <>
                  <Button
                    title="Transfer"
                    onPress={() => handlePaymentOptionChange("transfer")}
                    color={
                      selectedPaymentOption === "transfer" ? "#007bff" : "gray"
                    }
                  />
                  <Button
                    title="Bank"
                    onPress={() => handlePaymentOptionChange("bank")}
                    color={
                      selectedPaymentOption === "bank" ? "#007bff" : "gray"
                    }
                  />
                  <Button
                    title="USSD"
                    onPress={() => handlePaymentOptionChange("ussd")}
                    color={
                      selectedPaymentOption === "ussd" ? "#007bff" : "gray"
                    }
                  />
                  <Button
                    title="Visa QR"
                    onPress={() => handlePaymentOptionChange("qr")}
                    color={selectedPaymentOption === "qr" ? "#007bff" : "gray"}
                  />
                </>
              )}
            </View>

            <View style={styles.paymentDetails}>
              {selectedPaymentOption === "card" && (
                <CardPayment
                  amount={amount}
                  currency={currency}
                  reference={reference}
                  userEmail={userEmail}
                  paysofterPublicKey={paysofterPublicKey}
                />
              )}

              {selectedPaymentOption === "account-fund" && (
                <PaysofterAccountFund
                  currency={currency}
                  amount={amount}
                  reference={reference}
                  userEmail={userEmail}
                  paysofterPublicKey={paysofterPublicKey}
                />
              )}

              {selectedPaymentOption === "usd-account-fund" && (
                <PaysofterUsdAccountFund
                  currency={currency}
                  amount={amount}
                  reference={reference}
                  userEmail={userEmail}
                  paysofterPublicKey={paysofterPublicKey}
                />
              )}

              {selectedPaymentOption === "promise" && (
                <PaysofterPromise
                  buyerEmail={buyerEmail}
                  amount={amount}
                  sellerApiKey={sellerApiKey}
                  currency={currency}
                  usdPrice={usdPrice}
                />
              )}

              {selectedPaymentOption === "bank" && <BankPayment />}
              {selectedPaymentOption === "transfer" && <TransferPayment />}
              {selectedPaymentOption === "ussd" && <UssdPayment />}
              {selectedPaymentOption === "qr" && <QrPayment />}
            </View>
          </ScrollView>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  center: {
    alignItems: "center",
  },
  modalHeader: {
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
    fontSize: 18,
    color: "blue",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  options: {
    padding: 20,
    alignItems: "center",
  },
  paymentDetails: {
    padding: 20,
  },
});

export default PaysofterButton;
