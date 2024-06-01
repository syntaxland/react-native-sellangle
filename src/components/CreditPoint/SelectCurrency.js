// SelectCurrency.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet, ScrollView, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BuyCreditPoint from "./BuyCreditPoint";
import BuyUsdCreditPoint from "./BuyUsdCreditPoint";
import RNPickerSelect from "react-native-picker-select";

const SelectCurrency = () => {
  const navigation = useNavigation();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const handleCurrencyChange = (value) => {
    setSelectedCurrency(value);
  };

  const CURRENCY_CHOICES = [
    { label: "Nigerian Naira", value: "NGN" },
    { label: "United States Dollar", value: "USD" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Currency</Text>
        <RNPickerSelect
          onValueChange={handleCurrencyChange}
          items={CURRENCY_CHOICES}
          placeholder={{ label: "Select Currency", value: null }}
          value={selectedCurrency}
          style={pickerSelectStyles}
        />
      </View>

      <View style={styles.content}>
        {selectedCurrency === "NGN" && (
          <BuyCreditPoint currency={selectedCurrency} />
        )}
        {selectedCurrency === "USD" && (
          <BuyUsdCreditPoint currency={selectedCurrency} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 2,
  },
  pickerContainer: {
    width: "100%",
    marginBottom: 20,
  },
  content: {
    width: "100%",
    alignItems: "center",
  },
  label: {
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

const pickerSelectStyles = StyleSheet.create({
  // inputIOS: {
  //   fontSize: 16,
  //   paddingVertical: 12,
  //   paddingHorizontal: 10,
  //   borderWidth: 1,
  //   borderColor: "gray",
  //   borderRadius: 4,
  //   color: "black",
  //   paddingRight: 30, // to ensure the text is never behind the icon
  //   backgroundColor: "white",
  // },
  // inputAndroid: {
  //   fontSize: 16,
  //   paddingHorizontal: 10,
  //   paddingVertical: 8,
  //   borderWidth: 0.5,
  //   borderColor: "purple",
  //   borderRadius: 8,
  //   color: "black",
  //   paddingRight: 30, // to ensure the text is never behind the icon
  //   backgroundColor: "white",
  // },
});

export default SelectCurrency;
