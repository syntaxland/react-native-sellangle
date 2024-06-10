// AdChargeCalculator.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { formatAmount } from "../../FormatAmount";

const formatUserInput = (input) => {
  const formattedInput = input.replace(/[^0-9]/g, "");
  return formattedInput;
};

const AdChargeCalculator = () => {
  const [numberOfAds, setNumberOfAds] = useState("1");
  const [numberOfHours, setNumberOfHours] = useState("1");

  const totalCPS = (
    parseInt(numberOfAds) *
    parseInt(numberOfHours) *
    1.2
  ).toFixed(2);

  const handleNumberOfAdsChange = (value) => {
    setNumberOfAds(formatUserInput(value));
  };

  const handleNumberOfHoursChange = (value) => {
    setNumberOfHours(formatUserInput(value));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ad Charge Calculator</Text>
      <Text style={styles.info}>1.2 cps per hour (promoted ad)</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter number of ads"
          value={numberOfAds}
          onChangeText={handleNumberOfAdsChange}
        />

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter number of hours"
          value={numberOfHours}
          onChangeText={handleNumberOfHoursChange}
        />
      </View>

      <View style={styles.totalCPSContainer}>
        <Button title={`Total CPS: ${formatAmount(totalCPS)}`} disabled />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    marginBottom: 10,
  },
  form: {
    width: "80%",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  totalCPSContainer: {
    width: "80%",
  },
});

export default AdChargeCalculator;
