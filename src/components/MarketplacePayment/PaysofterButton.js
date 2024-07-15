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
import {
  faTimes,
  faCreditCard,
  // faExchange,
  // faBank,
  // faMobile,
  // faQrcode,
  faList,
  faMoneyBills,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-native-paper";
import { useSelector } from "react-redux";
import UssdPayment from "./UssdPayment";
import BankPayment from "./BankPayment";
import QrPayment from "./QrPayment";
import TransferPayment from "./TransferPayment";
import PaysofterPromise from "./PaysofterPromise";
import { formatAmount } from "../../FormatAmount";

const PaysofterButton = ({
  amount,
  currency,
  email,
  paysofterPublicKey,
  onSuccess,
  onClose,
}) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("promise");
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const handlePaymentOptionChange = (option) => {
    setSelectedPaymentOption(option);
  };

  const handleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  const handleOnClosePayment = () => {
    console.log("onClose called!");
    setShowPaymentModal(false);
    onClose();
  };

  return (
    <View>
      <View style={styles.center}>
        <Button title="Pay Now" onPress={() => setShowPaymentModal(true)} />
      </View>

      <Modal
        visible={showPaymentModal}
        // onRequestClose={handleOnClosePayment}
      >
        <View style={styles.modalHeader}>
          <Card style={styles.card}>
            <Card.Content>
              <TouchableOpacity onPress={handleOnClosePayment}>
                <Text style={styles.closeButton}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    size={16}
                    style={styles.icon}
                    color="red"
                  />{" "}
                  Close
                </Text>
              </TouchableOpacity>

              <Text style={styles.modalTitle}>Mock Payment (Test)</Text>
              <Text>{email}</Text>
              <Text>{`${formatAmount(amount)} ${currency}`}</Text>
            </Card.Content>
          </Card>
        </View>

        <ScrollView>
          <View style={styles.options}>
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.title}>Options</Text>

                <View style={styles.optionsList}>
                  {currency === "USD" && (
                    <View style={styles.payOptionBtn}>
                      <Text style={styles.payBtnText}>
                        <TouchableOpacity
                          onPress={() => handlePaymentOptionChange("card")}
                          disabled
                          style={
                            selectedPaymentOption === "card"
                              ? styles.roundedPrimaryBtn
                              : styles.roundedDisabledBtn
                          }
                        >
                          <Text style={styles.payBtnText}>
                            <FontAwesomeIcon
                              icon={faCreditCard}
                              size={16}
                              style={styles.icon}
                              color="#fff"
                            />{" "}
                            <Text style={styles.btnText}>
                              {" "}
                              Debit Card (USD){" "}
                            </Text>
                          </Text>
                        </TouchableOpacity>
                      </Text>
                    </View>
                  )}

                  {currency === "NGN" && (
                    <View style={styles.payOptionBtn}>
                      <Text style={styles.payBtnText}>
                        <TouchableOpacity
                          onPress={() => handlePaymentOptionChange("card")}
                          disabled
                          style={
                            selectedPaymentOption === "card"
                              ? styles.roundedPrimaryBtn
                              : styles.roundedDisabledBtn
                          }
                        >
                          <Text style={styles.payBtnText}>
                            <FontAwesomeIcon
                              icon={faCreditCard}
                              size={16}
                              style={styles.icon}
                              color="#fff"
                            />{" "}
                            <Text style={styles.btnText}>
                              {" "}
                              Debit Card (NGN){" "}
                            </Text>
                          </Text>
                        </TouchableOpacity>
                      </Text>
                    </View>
                  )}

                  {currency === "NGN" && (
                    <View style={styles.payOptionBtn}>
                      <Text style={styles.payBtnText}>
                        <TouchableOpacity
                          onPress={() =>
                            handlePaymentOptionChange("account-fund")
                          }
                          style={
                            selectedPaymentOption === "account-fund"
                              ? styles.roundedPrimaryBtn
                              : styles.roundedDisabledBtn
                          }
                          disabled
                        >
                          <Text style={styles.payBtnText}>
                            <FontAwesomeIcon
                              icon={faMoneyBills}
                              size={16}
                              style={styles.icon}
                              color="#fff"
                            />{" "}
                            <Text style={styles.btnText}>
                              {" "}
                              Paysofter Account Fund
                            </Text>
                          </Text>
                        </TouchableOpacity>
                      </Text>
                    </View>
                  )}

                  {currency === "USD" && (
                    <View style={styles.payOptionBtn}>
                      <Text style={styles.payBtnText}>
                        <TouchableOpacity
                          onPress={() =>
                            handlePaymentOptionChange("account-fund")
                          }
                          style={
                            selectedPaymentOption === "account-fund"
                              ? styles.roundedPrimaryBtn
                              : styles.roundedDisabledBtn
                          }
                          disabled
                        >
                          <Text style={styles.payBtnText}>
                            <FontAwesomeIcon
                              icon={faMoneyBills}
                              size={16}
                              style={styles.icon}
                              color="#fff"
                            />{" "}
                            <Text style={styles.btnText}>
                              {" "}
                              Paysofter Account Fund (USD)
                            </Text>
                          </Text>
                        </TouchableOpacity>
                      </Text>
                    </View>
                  )}

                  {currency === "NGN" && (
                    <View style={styles.payOptionBtn}>
                      <Text style={styles.payBtnText}>
                        <TouchableOpacity
                          onPress={() => handlePaymentOptionChange("promise")}
                          style={
                            selectedPaymentOption === "promise"
                              ? styles.roundedPrimaryBtn
                              : styles.roundedDisabledBtn
                          }
                        >
                          <Text style={styles.payBtnText}>
                            <FontAwesomeIcon
                              icon={faMoneyBillWave}
                              size={16}
                              style={styles.icon}
                              color="#fff"
                            />{" "}
                            <Text style={styles.btnText}>
                              {" "}
                              Paysofter Promise (NGN)
                            </Text>
                          </Text>
                        </TouchableOpacity>
                      </Text>
                    </View>
                  )}

                  {currency === "USD" && (
                    <View style={styles.payOptionBtn}>
                      <Text style={styles.payBtnText}>
                        <TouchableOpacity
                          onPress={() => handlePaymentOptionChange("promise")}
                          style={
                            selectedPaymentOption === "promise"
                              ? styles.roundedPrimaryBtn
                              : styles.roundedDisabledBtn
                          }
                        >
                          <Text style={styles.payBtnText}>
                            <FontAwesomeIcon
                              icon={faMoneyBillWave}
                              size={16}
                              style={styles.icon}
                              color="#fff"
                            />{" "}
                            <Text style={styles.btnText}>
                              {" "}
                              Paysofter Promise (USD)
                            </Text>
                          </Text>
                        </TouchableOpacity>
                      </Text>
                    </View>
                  )}

                  <View style={styles.payOptionBtn}>
                    <Text style={styles.payBtnText}>
                      <TouchableOpacity
                        onPress={handleMoreOptions}
                        style={styles.roundedDisabledBtn}
                        disabled
                      >
                        <Text style={styles.payBtnText}>
                          <FontAwesomeIcon
                            icon={faList}
                            size={16}
                            style={styles.icon}
                            color="#fff"
                          />{" "}
                          <Text style={styles.btnText}> More Options</Text>
                        </Text>
                      </TouchableOpacity>
                    </Text>
                  </View>

                  {showMoreOptions && (
                    <>
                      <View style={styles.payOptionBtn}>
                        <Button
                          title="Transfer"
                          onPress={() => handlePaymentOptionChange("transfer")}
                          color={
                            selectedPaymentOption === "transfer"
                              ? "#007bff"
                              : "#6c757d"
                          }
                          disabled
                        />
                      </View>

                      <View style={styles.payOptionBtn}>
                        <Button
                          title="Bank"
                          onPress={() => handlePaymentOptionChange("bank")}
                          color={
                            selectedPaymentOption === "bank"
                              ? "#007bff"
                              : "#6c757d"
                          }
                          disabled
                        />
                      </View>

                      <View style={styles.payOptionBtn}>
                        <Button
                          title="USSD"
                          onPress={() => handlePaymentOptionChange("ussd")}
                          color={
                            selectedPaymentOption === "ussd"
                              ? "#007bff"
                              : "#6c757d"
                          }
                          disabled
                        />
                      </View>

                      <View style={styles.payOptionBtn}>
                        <Button
                          title="Visa QR"
                          onPress={() => handlePaymentOptionChange("qr")}
                          color={
                            selectedPaymentOption === "qr"
                              ? "#007bff"
                              : "#6c757d"
                          }
                          disabled
                        />
                      </View>
                    </>
                  )}
                </View>
              </Card.Content>
            </Card>
          </View>

          <View style={styles.paymentDetails}>
            {/* {selectedPaymentOption === "card" && (
              <CardPayment
                amount={amount}
                email={email}
                currency={currency}
                paysofterPublicKey={paysofterPublicKey}
              />
            )} */}

            {/* {selectedPaymentOption === "account-fund" && (
              <PaysofterAccountFund
                amount={amount}
                email={email}
                currency={currency}
                paysofterPublicKey={paysofterPublicKey}
              />
            )} */}

            {selectedPaymentOption === "promise" && (
              <PaysofterPromise
                amount={amount}
                email={email}
                currency={currency}
                paysofterPublicKey={paysofterPublicKey}
                onSuccess={onSuccess}
                onClose={handleOnClosePayment}
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
  container: {
    padding: 10,
    // flex: 1,
  },
  center: {
    alignItems: "center",
  },
  modalHeader: {
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
    // alignItems: "center",
  },
  closeButton: {
    // alignSelf: "flex-end",
    alignSelf: "center",
    padding: 10,
    fontSize: 18,
    color: "red",
  },
  payOptionBtn: {
    padding: 3,
  },
  payBtnText: {
    alignSelf: "center",
    fontSize: 18,
    textAlign: "center",
  },
  modalHeading: {
    // textAlign: "center",
    // justifyContent: "center",
    // alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    // textAlign: "center",
  },
  options: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  paymentDetails: {
    padding: 20,
  },
  icon: {
    marginRight: 5,
  },
  roundedPrimaryBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 7,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  roundedDisabledBtn: {
    backgroundColor: "#d3d3d3",
    color: "#fff",
    padding: 7,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default PaysofterButton;
