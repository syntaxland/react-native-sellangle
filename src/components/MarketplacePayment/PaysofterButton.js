// PaysofterButton.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import UssdPayment from "./UssdPayment";
import BankPayment from "./BankPayment";
import QrPayment from "./QrPayment";
import TransferPayment from "./TransferPayment";
import PaysofterAccountFund from "./PaysofterAccountFund";
import PaysofterPromise from "./PaysofterPromise";
import { formatAmount } from "../../FormatAmount";

const PaysofterButton = ({
  showPaymentModal,
  buyerEmail,
  amount,
  sellerApiKey,
  setShowPaymentModal,
  currency,
  usdPrice,
  reference,
  paymentDetails,
  handlePaymentDetailsChange,
  paymentData,
  paysofterPaymentData,
}) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const [selectedPaymentOption, setSelectedPaymentOption] = useState("promise");
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const handlePaymentOptionChange = (option) => {
    setSelectedPaymentOption(option);
  };

  const handleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  return (
    <View>
      <View style={styles.center}>
        <Button title="Pay Now" onPress={() => setShowPaymentModal(true)} />
      </View>

      <Modal
        visible={showPaymentModal}
        onRequestClose={() => setShowPaymentModal(false)}
      >
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setShowPaymentModal(false)}>
            <Text style={styles.closeButton}>
              <FontAwesomeIcon icon={faTimes} size={16} style={styles.icon} />{" "}
              Close
            </Text>
          </TouchableOpacity>

          {/* <Button title="Close" onPress={() => setShowPaymentModal(false)} /> */}

          <Text style={styles.modalTitle}>Mock Payment (Test)</Text>
          <Text>{buyerEmail}</Text>
          <Text>{`${formatAmount(amount)} ${currency}`}</Text>
        </View>

        <ScrollView>
          <View style={styles.options}>
            <Text>Options</Text>
            <Button
              title="Debit Card"
              onPress={() => handlePaymentOptionChange("card")}
              disabled
              color={selectedPaymentOption === "card" ? "#007bff" : "gray"}
            />
            <Button
              title="Paysofter Account Fund"
              onPress={() => handlePaymentOptionChange("account-fund")}
              disabled
              color={
                selectedPaymentOption === "account-fund" ? "#007bff" : "gray"
              }
            />
            <Button
              title="Paysofter Promise"
              onPress={() => handlePaymentOptionChange("promise")}
              color={selectedPaymentOption === "promise" ? "#007bff" : "gray"}
            />
            <Button title="More Options" onPress={handleMoreOptions} disabled />

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
                  color={selectedPaymentOption === "bank" ? "#007bff" : "gray"}
                />
                <Button
                  title="USSD"
                  onPress={() => handlePaymentOptionChange("ussd")}
                  color={selectedPaymentOption === "ussd" ? "#007bff" : "gray"}
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
                paymentDetails={paymentDetails}
                handlePaymentDetailsChange={handlePaymentDetailsChange}
                amount={amount}
                paymentData={paymentData}
                reference={reference}
                buyerEmail={buyerEmail}
                sellerApiKey={sellerApiKey}
                paysofterPaymentData={paysofterPaymentData}
              />
            )}

            {selectedPaymentOption === "account-fund" && (
              <PaysofterAccountFund
                amount={amount}
                paymentData={paymentData}
                reference={reference}
                buyerEmail={buyerEmail}
                sellerApiKey={sellerApiKey}
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
  );
};

const styles = StyleSheet.create({
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
