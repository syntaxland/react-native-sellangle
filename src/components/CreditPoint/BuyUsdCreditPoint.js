// BuyUsdCreditPoint.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { getPaymentApiKeys } from "../../redux/actions/paymentActions";
import PaymentScreen from "./payment/PaymentScreen";
import { useNavigation } from "@react-navigation/native";

const BuyUsdCreditPoint = ({ currency }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const getPaymentApiKeysState = useSelector(
    (state) => state.getPaymentApiKeysState
  );
  const { paystackPublicKey, paysofterPublicKey } = getPaymentApiKeysState;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userEmail = userInfo?.email;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    } else {
      dispatch(getPaymentApiKeys());
    }
  }, [userInfo, dispatch]);

  const [amount, setAmount] = useState("");
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);

  const handleShowPaymentScreen = () => {
    setShowPaymentScreen(true);
  };

  const USD_CPS_CHOICES = [
    { label: "1,000 cps for 1 USD", value: "1" },
    { label: "5,200 cps for 5 USD", value: "5" },
    { label: "10,800 cps for 10 USD", value: "10" },
    { label: "16,500 cps for 15 USD", value: "15" },
    { label: "24,000 cps for 20 USD", value: "20" },
    { label: "60,000 cps for 50 USD", value: "50" },
    { label: "125,000 cps for 100 USD", value: "100" },
    { label: "255,000 cps for 200 USD", value: "200" },
    { label: "700,000 cps for 500 USD", value: "500" },
    { label: "1,500,000 cps for 1,000 USD", value: "1000" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {showPaymentScreen ? (
        <View style={styles.paymentContainer}>
          <PaymentScreen
            currency={currency}
            amount={amount}
            paysofterPublicKey={paysofterPublicKey}
            paystackPublicKey={paystackPublicKey}
            userEmail={userEmail}
          />
        </View>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Select CPS Amount</Text>
          <RNPickerSelect
            onValueChange={(value) => setAmount(value)}
            items={USD_CPS_CHOICES}
            placeholder={{ label: "Select CPS Amount", value: null }}
            style={pickerSelectStyles}
            value={amount}
          />
          <Button
            title="Buy Credit Point (USD)"
            onPress={handleShowPaymentScreen}
            disabled={amount === ""}
            color="#007bff"
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 2,
    justifyContent: "center",
  },
  paymentContainer: {
    padding: 20,
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
  label: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginBottom: 20,
  },
});

export default BuyUsdCreditPoint;
