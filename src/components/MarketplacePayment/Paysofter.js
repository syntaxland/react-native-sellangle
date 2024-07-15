// Paysofter.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import PaysofterButton from "./PaysofterButton";
import { formatAmount } from "../../FormatAmount";

const Paysofter = ({
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

  const createdAt = new Date().toISOString();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Paysofter Promise Option</Text>

      <View style={styles.card}>
        <Text>
          Total Amount: {formatAmount(amount)} {currency}
        </Text>

        <Text>Timestamp: {createdAt}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <PaysofterButton
          amount={amount}
          email={email}
          currency={currency}
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
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  card: {
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
  },
  adName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  promoSection: {
    marginTop: 20,
  },
  buttonContainer: {
    alignItems: "center",
  },
});

export default Paysofter;
