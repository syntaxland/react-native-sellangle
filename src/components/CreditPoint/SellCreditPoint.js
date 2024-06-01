// SellCreditPoint.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { sellCreditPoint } from "../../redux/actions/creditPointActions";
import Message from "../../Message";
import Loader from "../../Loader";

const SellCreditPoint = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  const sellCreditPointState = useSelector((state) => state.sellCreditPointState);
  const { success, error, loading } = sellCreditPointState;

  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (success) {
      Alert.alert(
        "Success",
        `You have transferred ${amount} credit points to ${username} successfully.`,
        [{ text: "OK", onPress: () => navigation.navigate("Dashboard") }]
      );
    }
  }, [success, amount, username, navigation]);

  const lowerCaseUsername = username.toLowerCase().trim();
  const creditPointData = {
    username: lowerCaseUsername,
    amount: amount,
    password: password,
  };

  const handleSellCreditPoint = () => {
    if (amount < 100) {
      setMessage("The minimum credit point transfer amount is 100.");
    } else {
      dispatch(sellCreditPoint(creditPointData));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading && <Loader />}
      {success && (
        <Message variant="success">
          You have transferred {amount} credit points to {username} successfully.
        </Message>
      )}
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}

      <Text style={styles.warning}>
        <Text style={styles.warningIcon}>⚠️</Text> Warning! This action will
        transfer the credit point amount from your account to the receiver's
        credit point wallet.
      </Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Receiver's Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder="Enter cps receiver's username"
          maxLength={12}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={(text) => setAmount(text)}
          placeholder="Enter cps amount"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Enter your password"
          secureTextEntry
          maxLength={100}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Sell/Share CPS"
          onPress={handleSellCreditPoint}
          disabled={!password || !username || !amount}
        />
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    flexGrow: 1,
  },
  warning: {
    textAlign: "center",
    backgroundColor: "#ffcc00",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  warningIcon: {
    fontSize: 18,
    color: "yellow",
  },
  formGroup: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default SellCreditPoint;
