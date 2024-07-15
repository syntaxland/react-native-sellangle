// Paysofter.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import PaysofterButton from "./PaysofterButton";
import { formatAmount } from "../../../FormatAmount";

const Paysofter = ({
  currency,
  amount,
  paysofterPublicKey,
  email,
  onSuccess,
  onClose,
}) => {
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  console.log("Paysofter", amount, "apiKeys:", paysofterPublicKey);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Paysofter Payment Option</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.amount}>
          Amount: {formatAmount(amount)} {currency}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <PaysofterButton
          email={email}
          currency={currency}
          amount={amount}
          paysofterPublicKey={paysofterPublicKey}
          onSuccess={onSuccess}
          onClose={onClose}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    // justifyContent: "center",
    // alignItems: "center",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  details: {
    marginBottom: 20,
  },
  amount: {
    fontSize: 18,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default Paysofter;
