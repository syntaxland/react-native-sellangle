// Dashboard.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faWallet, faDashboard } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { getCreditPointBalance } from "../../redux/actions/creditPointActions";
import SellCreditPoint from "../CreditPoint/SellCreditPoint";
import SelectCurrency from "../CreditPoint/SelectCurrency";
import Message from "../../Message";
import Loader from "../../Loader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const [buyCreditPointModal, setBuyCreditPointModal] = useState(false);
  const handleBuyCreditPointOpen = () => setBuyCreditPointModal(true);
  const handleBuyCreditPointClose = () => setBuyCreditPointModal(false);

  const [sellCreditPointModal, setSellCreditPointModal] = useState(false);
  const handleSellCreditPointOpen = () => setSellCreditPointModal(true);
  const handleSellCreditPointClose = () => setSellCreditPointModal(false);

  const creditPointBal = useSelector((state) => state.creditPointBal);
  const { loading, error, creditPointBalance } = creditPointBal;

  function formatNumber(number, decimalPlaces = 2) {
    const formattedNumber = parseFloat(number).toFixed(decimalPlaces);
    const parts = formattedNumber.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  useEffect(() => {
    dispatch(getCreditPointBalance());
  }, [dispatch]);

  const creditPoints = creditPointBalance?.balance || 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <View style={styles.dashboard}>
          <Text style={styles.title}>
            <Text style={styles.icon}>
              <FontAwesomeIcon
                icon={faDashboard}
                style={styles.icon}
                // color="#fff"
              />{" "}
              Dashboard (User)
            </Text>
          </Text>
          <View style={styles.walletSection}>
            <Text style={styles.subtitle}>
              Credit Point Wallet{" "}
              <Text style={styles.icon}>
                <FontAwesomeIcon
                  icon={faWallet}
                  style={styles.icon}
                  // color="#fff"
                />{" "}
              </Text>
            </Text>
            <Text style={styles.balance}>
              Balance: {formatNumber(creditPoints)} CPS
            </Text>
            <View style={styles.buttonGroup}>
              {/* <Button title="Buy CPS" onPress={handleBuyCreditPointOpen} />
              <Button
                title="Sell/Share CPS"
                onPress={handleSellCreditPointOpen}
              /> */}

              <TouchableOpacity
                onPress={handleBuyCreditPointOpen}
                disabled={loading}
              >
                <Text style={styles.roundedPrimaryBtn}>Buy CPS</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSellCreditPointOpen}
                disabled={loading}
              >
                <Text style={styles.roundedPrimaryBtn}>Sell CPS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <Modal
        visible={buyCreditPointModal}
        onRequestClose={handleBuyCreditPointClose}
      >
        {/* <View style={styles.paymentContainer}> */}
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Buy Credit Point</Text>
          <SelectCurrency />
          <Button title="Close" onPress={handleBuyCreditPointClose} />
        </View>
        {/* </View> */}
      </Modal>

      <Modal
        visible={sellCreditPointModal}
        onRequestClose={handleSellCreditPointClose}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Sell/Share Credit Point</Text>
          <SellCreditPoint />
          <Button title="Close" onPress={handleSellCreditPointClose} />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentContainer: {
    padding: 5,
  },
  dashboard: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  icon: {
    fontSize: 24,
  },
  walletSection: {
    width: "100%",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  balance: {
    fontSize: 18,
    marginVertical: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 20,
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    // marginBottom: 20,
    padding: 20,
  },
  roundedPrimaryBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 10,
    borderRadius: 25,
    // justifyContent: "center",
    // alignItems: "center",
    // textAlign: "center",
  },
});

export default Dashboard;
