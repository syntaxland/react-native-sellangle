// PaystackUsd.js
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { buyCreditPoint } from "../../../redux/actions/creditPointActions";
import Loader from "../../../Loader"; 
import Message from "../../../Message";
import { formatAmount } from "../../../FormatAmount";
import { Paystack } from "react-native-paystack-webview";

const PaystackUsd = ({ currency, amount, paystackPublicKey, userEmail }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  const buyCreditPointState = useSelector((state) => state.buyCreditPointState);
  const { success, error, loading } = buyCreditPointState;

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigation.navigate("Home");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, navigation]);

  const creditPointData = {
    amount: amount,
  };

  const handlePayment = () => {
    dispatch(buyCreditPoint(creditPointData));
  };

  const onSuccess = () => {
    handlePayment();
  };

  const [paymentInitiated, setPaymentInitiated] = useState(false);

  const initiatePayment = () => {
    setPaymentInitiated(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Paystack Payment Option</Text>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      {success && (
        <Message variant="success">
          You have received {amount} credit points.
        </Message>
      )}

      <View style={styles.infoContainer}>
        <Text>
          Amount: {formatAmount(amount)} {currency}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        {!paymentInitiated && (
          <Button title="Pay Now" onPress={initiatePayment} color="#000" />
        )}

        {paymentInitiated && (
          <Paystack
            paystackKey={paystackPublicKey}
            amount={amount * 100}
            billingEmail={userEmail}
            billingMobile="1234567890" // replace with actual mobile number
            reference={`ref_${Math.floor(Math.random() * 1000000000)}`}
            activityIndicatorColor="green"
            onCancel={() => setPaymentInitiated(false)}
            onSuccess={onSuccess}
            onError={(error) => console.log(error)}
            autoStart={true}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  infoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
  },
});

export default PaystackUsd;
