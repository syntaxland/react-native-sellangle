// Dashboard.js
import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Modal,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faWallet, faDashboard } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";

import { Card } from "react-native-paper";
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

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getCreditPointBalance());
    setTimeout(() => setRefreshing(false), 2000);
  }, [dispatch]);

  return (
    <ScrollView
      // contentContainerStyle={styles.scrollContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.title}>
                <Text style={styles.icon}>
                  <FontAwesomeIcon icon={faDashboard} style={styles.icon} />{" "}
                  Dashboard (User)
                </Text>
              </Text>
            </Card.Content>
          </Card>
        </View>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <View style={styles.dashboard}>
            <View style={styles.cardContainer}>
              <Card style={styles.card}>
                <Card.Content>
                  <View style={styles.formContainer}>
                    <View style={styles.walletSection}>
                      <Card style={styles.card}>
                        <Card.Content>
                          <Text style={styles.subtitle}>
                            Credit Point Wallet{" "}
                            <Text style={styles.icon}>
                              <FontAwesomeIcon
                                icon={faWallet}
                                style={styles.icon}
                              />{" "}
                            </Text>
                          </Text>
                        </Card.Content>
                      </Card>
                      <Text style={styles.balance}>
                        Balance: {formatNumber(creditPoints)} CPS
                      </Text>

                      <View style={styles.buttonGroup}>
                        <TouchableOpacity
                          onPress={handleBuyCreditPointOpen}
                          // disabled={loading}
                        >
                          <Text style={styles.roundedPrimaryBtn}>Buy CPS</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={handleSellCreditPointOpen}
                          // disabled={loading}
                        >
                          <Text style={styles.roundedPrimaryBtn}>Sell CPS</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            </View>
          </View>
        )}

        <Modal
          visible={buyCreditPointModal}
          onRequestClose={handleBuyCreditPointClose}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Buy Credit Point</Text>
            <SelectCurrency />

            <View style={styles.closeButton}>
              <Button title="Close" onPress={handleBuyCreditPointClose} />
            </View>
          </View>
        </Modal>

        <Modal
          visible={sellCreditPointModal}
          onRequestClose={handleSellCreditPointClose}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sell/Share Credit Point</Text>
            <SellCreditPoint />

            <View style={styles.closeButton}>
              <Button title="Close" onPress={handleSellCreditPointClose} />
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 2,
  },
  container: {
    flex: 1,
    padding: 2,
    alignItems: "center",
  },
  dashboard: {
    alignItems: "center",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    padding: 20,
  },
  closeButton: {
    padding: 10,
    marginTop: 40,
  },
  roundedPrimaryBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 10,
    borderRadius: 25,
  },

  cardContainer: {
    padding: 3,
  },
});

export default Dashboard;
